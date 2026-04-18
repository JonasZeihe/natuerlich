import os
import re
import shutil
import logging
import pathlib
import datetime as dt
import subprocess
import statistics
from collections import defaultdict, Counter
from dataclasses import dataclass
from typing import Dict, List, Tuple, Optional, Union, Any, TypedDict


LOG = logging.getLogger("over9000_metrics")

CODE_EXTS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".html",
    ".xml",
    ".yml",
    ".yaml",
    ".json",
    ".mdx",
}

COMMENT_LANGS = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"}

DEFAULT_SCAN_ROOTS = ["src"]
DEFAULT_EXCLUDE_PREFIXES = [
    "scripts/",
    "docs/",
    "legacy_archive/",
    ".next/",
    "node_modules/",
    "dist/",
    "build/",
    "out/",
    "coverage/",
]

CompletedAny = subprocess.CompletedProcess[Union[str, bytes]]


class MonthStat(TypedDict):
    period: str
    commits: int
    ins: int
    del_: int
    net: int
    churn: int
    be_churn: int
    fe_churn: int
    dominant: str


@dataclass(frozen=True)
class LineStats:
    total: int
    blank: int
    comment: int
    code: int


@dataclass(frozen=True)
class FileStats:
    path: str
    ext: str
    bytes_size: int
    is_binary: bool
    lines: LineStats


@dataclass(frozen=True)
class GitCommitStat:
    sha: str
    author: str
    date_iso: str
    subject: str
    files_changed: int
    ins_total: int
    del_total: int
    ins_backend: int
    del_backend: int
    ins_frontend: int
    del_frontend: int


def run(
    cmd: List[str],
    cwd: str,
    check: bool = True,
    text: bool = True,
    stdin_data: Optional[str] = None,
) -> CompletedAny:
    LOG.debug("RUN: %s", " ".join(cmd))
    return subprocess.run(
        cmd,
        cwd=cwd,
        check=check,
        text=text,
        input=stdin_data,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def find_repo_root(start: str) -> str:
    p = pathlib.Path(start).resolve()
    for parent in [p] + list(p.parents):
        if (parent / ".git").exists():
            return str(parent)
    raise RuntimeError("Could not find repo root (missing .git)")


def is_git_available() -> bool:
    return shutil.which("git") is not None


def iso_utc_now() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def safe_timestamp_for_filename(iso: str) -> str:
    s = iso.replace(":", "-")
    return s.replace("+00:00", "Z")


def human_bytes(n: int) -> str:
    if n < 1024:
        return f"{n} B"
    units = ["KB", "MB", "GB", "TB"]
    v = float(n)
    for u in units:
        v /= 1024.0
        if v < 1024.0:
            return f"{v:.2f} {u}"
    return f"{v:.2f} PB"


def path_norm(p: str) -> str:
    return p.replace("\\", "/")


def starts_with_any(path: str, prefixes: List[str]) -> bool:
    p = path_norm(path)
    return any(p.startswith(pref) for pref in prefixes)


def within_any_root(path: str, roots: List[str]) -> bool:
    p = path_norm(path)
    for r in roots:
        rr = path_norm(r).rstrip("/") + "/"
        if p == path_norm(r).rstrip("/") or p.startswith(rr):
            return True
    return False


def detect_binary(b: bytes) -> bool:
    if not b:
        return False
    return b"\x00" in b[:4096]


def count_lines_text(text: str, ext: str) -> LineStats:
    lines = text.splitlines()
    total = len(lines)
    blank = 0
    comment = 0
    code = 0

    if ext not in COMMENT_LANGS:
        for ln in lines:
            if not ln.strip():
                blank += 1
            else:
                code += 1
        return LineStats(total=total, blank=blank, comment=0, code=code)

    in_block = False
    for ln in lines:
        s = ln.strip()
        if not s:
            blank += 1
            continue

        i = 0
        has_code = False
        has_comment = False

        while i < len(s):
            if in_block:
                end = s.find("*/", i)
                has_comment = True
                if end == -1:
                    i = len(s)
                else:
                    in_block = False
                    i = end + 2
                continue

            if s.startswith("//", i):
                has_comment = True
                i = len(s)
                continue

            if s.startswith("/*", i):
                has_comment = True
                in_block = True
                i += 2
                continue

            if s[i].isspace():
                i += 1
                continue

            has_code = True
            i += 1

        if has_comment and not has_code:
            comment += 1
        elif has_code and not has_comment:
            code += 1
        else:
            code += 1
            comment += 1

    return LineStats(total=total, blank=blank, comment=comment, code=code)


def read_file_bytes(abs_path: str, max_bytes: int = 25_000_000) -> Tuple[bytes, bool]:
    st = os.stat(abs_path)
    size = int(st.st_size)
    with open(abs_path, "rb") as f:
        if size > max_bytes:
            return f.read(4096), True
        return f.read(), False


def compute_file_stats(repo_root: str, rel_path: str) -> FileStats:
    abs_path = os.path.join(repo_root, rel_path)
    ext = pathlib.Path(rel_path).suffix.lower()
    try:
        b, _ = read_file_bytes(abs_path)
        size = os.path.getsize(abs_path)
    except (FileNotFoundError, PermissionError, OSError):
        return FileStats(
            path=rel_path,
            ext=ext,
            bytes_size=0,
            is_binary=False,
            lines=LineStats(0, 0, 0, 0),
        )

    is_bin = detect_binary(b)
    if is_bin:
        return FileStats(
            path=rel_path,
            ext=ext,
            bytes_size=size,
            is_binary=True,
            lines=LineStats(0, 0, 0, 0),
        )

    text = b.decode("utf-8", errors="replace")
    ls = count_lines_text(text, ext)
    return FileStats(path=rel_path, ext=ext, bytes_size=size, is_binary=False, lines=ls)


def git_list_files(repo_root: str, roots: List[str]) -> List[str]:
    if not is_git_available():
        raise RuntimeError("git not available in PATH")
    args_tracked = ["git", "ls-files", "-z", "--"] + roots
    args_untracked = [
        "git",
        "ls-files",
        "-z",
        "--others",
        "--exclude-standard",
        "--",
    ] + roots
    cp1 = run(args_tracked, cwd=repo_root, check=True, text=False)
    cp2 = run(args_untracked, cwd=repo_root, check=True, text=False)

    out1 = cp1.stdout if isinstance(cp1.stdout, (bytes, bytearray)) else b""
    out2 = cp2.stdout if isinstance(cp2.stdout, (bytes, bytearray)) else b""
    out = out1 + out2

    items = [x.decode("utf-8", errors="replace") for x in out.split(b"\x00") if x]
    items = [path_norm(x) for x in items]
    return sorted(set(items))


def git_branch_head(repo_root: str) -> Tuple[str, str]:
    branch = "unknown"
    head = "unknown"
    try:
        cp = run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=repo_root, check=True
        )
        out = cp.stdout if isinstance(cp.stdout, str) else ""
        branch = out.strip() or branch
    except (subprocess.CalledProcessError, OSError):
        pass
    try:
        cp = run(["git", "rev-parse", "HEAD"], cwd=repo_root, check=True)
        out = cp.stdout if isinstance(cp.stdout, str) else ""
        head = out.strip() or head
    except (subprocess.CalledProcessError, OSError):
        pass
    return branch, head


def git_remote(repo_root: str) -> str:
    try:
        cp = run(["git", "remote", "get-url", "origin"], cwd=repo_root, check=True)
        out = cp.stdout if isinstance(cp.stdout, str) else ""
        return out.strip()
    except (subprocess.CalledProcessError, OSError):
        return ""


def git_status_porcelain(repo_root: str) -> Dict[str, int]:
    try:
        cp = run(["git", "status", "--porcelain=v1"], cwd=repo_root, check=True)
        out = cp.stdout if isinstance(cp.stdout, str) else ""
        lines = [l for l in out.splitlines() if l.strip()]
        modified = added = deleted = renamed = untracked = 0
        for l in lines:
            if l.startswith("??"):
                untracked += 1
                continue
            x = l[0:2]
            if "R" in x:
                renamed += 1
            if "D" in x:
                deleted += 1
            if "A" in x:
                added += 1
            if "M" in x:
                modified += 1
        return {
            "modified": modified,
            "added": added,
            "deleted": deleted,
            "renamed": renamed,
            "untracked": untracked,
            "total": len(lines),
        }
    except (subprocess.CalledProcessError, OSError):
        return {
            "modified": 0,
            "added": 0,
            "deleted": 0,
            "renamed": 0,
            "untracked": 0,
            "total": 0,
        }


def parse_git_log_numstat(repo_root: str, roots: List[str]) -> List[GitCommitStat]:
    args = [
        "git",
        "log",
        "--date=iso-strict",
        "--pretty=format:%H\t%aI\t%an\t%s",
        "--numstat",
        "--",
    ] + roots
    cp = run(args, cwd=repo_root, check=True)
    out = cp.stdout if isinstance(cp.stdout, str) else ""
    lines = out.splitlines()

    commits: List[GitCommitStat] = []
    cur_sha: Optional[str] = None
    cur_date: Optional[str] = None
    cur_author: Optional[str] = None
    cur_subject: Optional[str] = None
    ins_total = del_total = 0
    ins_backend = del_backend = 0
    ins_frontend = del_frontend = 0
    files_changed = 0

    def flush() -> None:
        nonlocal cur_sha, cur_date, cur_author, cur_subject
        nonlocal ins_total, del_total, ins_backend, del_backend
        nonlocal ins_frontend, del_frontend, files_changed
        if cur_sha is None:
            return
        commits.append(
            GitCommitStat(
                sha=cur_sha,
                author=cur_author or "",
                date_iso=cur_date or "",
                subject=cur_subject or "",
                files_changed=files_changed,
                ins_total=ins_total,
                del_total=del_total,
                ins_backend=ins_backend,
                del_backend=del_backend,
                ins_frontend=ins_frontend,
                del_frontend=del_frontend,
            )
        )
        cur_sha = cur_date = cur_author = cur_subject = None
        ins_total = del_total = 0
        ins_backend = del_backend = 0
        ins_frontend = del_frontend = 0
        files_changed = 0

    header_re = re.compile(r"^[0-9a-f]{7,40}\t")

    for l in lines:
        if header_re.match(l):
            flush()
            parts = l.split("\t", 3)
            cur_sha = parts[0].strip()
            cur_date = parts[1].strip() if len(parts) > 1 else ""
            cur_author = parts[2].strip() if len(parts) > 2 else ""
            cur_subject = parts[3].strip() if len(parts) > 3 else ""
            continue

        if not l.strip():
            continue

        parts = l.split("\t")
        if len(parts) < 3:
            continue

        a, d, _p = parts[0], parts[1], path_norm(parts[2])

        files_changed += 1
        if a == "-" or d == "-":
            continue

        try:
            ai = int(a)
            di = int(d)
        except ValueError:
            continue

        ins_total += ai
        del_total += di

    flush()
    return commits


def month_key_from_iso(iso: str) -> str:
    try:
        d = dt.datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return f"{d.year:04d}-{d.month:02d}"
    except ValueError:
        return "unknown"


def day_key_from_iso(iso: str) -> str:
    try:
        d = dt.datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return d.date().isoformat()
    except ValueError:
        return "unknown"


def parse_iso_to_utc(iso: str) -> Optional[dt.datetime]:
    if not iso:
        return None
    try:
        return dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(
            dt.timezone.utc
        )
    except ValueError:
        return None


def compute_period_keys(
    first_iso: str, last_iso: str, max_points: int = 36
) -> List[Tuple[str, dt.datetime]]:
    d1 = parse_iso_to_utc(first_iso)
    d2 = parse_iso_to_utc(last_iso)
    if d1 is None or d2 is None:
        return []
    if d2 < d1:
        d1, d2 = d2, d1

    months = (d2.year - d1.year) * 12 + (d2.month - d1.month) + 1
    if months <= max_points:
        keys: List[Tuple[str, dt.datetime]] = []
        y, m = d1.year, d1.month
        for _ in range(months):
            nm_y, nm_m = (y + 1, 1) if m == 12 else (y, m + 1)
            end = dt.datetime(nm_y, nm_m, 1, tzinfo=dt.timezone.utc) - dt.timedelta(
                seconds=1
            )
            keys.append((f"{y:04d}-{m:02d}", end))
            y, m = nm_y, nm_m
        return keys

    keys: List[Tuple[str, dt.datetime]] = []
    for y in range(d1.year, d2.year + 1):
        end = dt.datetime(y + 1, 1, 1, tzinfo=dt.timezone.utc) - dt.timedelta(seconds=1)
        keys.append((f"{y:04d}", end))
    return keys[:max_points]


def git_ls_tree_code_summary(
    repo_root: str, sha: str, roots: List[str]
) -> Dict[str, Dict[str, int]]:
    args = ["git", "ls-tree", "-r", "-l", "-z", sha, "--"] + roots
    cp = run(args, cwd=repo_root, check=True, text=False)
    out = cp.stdout if isinstance(cp.stdout, (bytes, bytearray)) else b""
    entries = [x.decode("utf-8", errors="replace") for x in out.split(b"\x00") if x]

    total = {"files": 0, "bytes": 0}

    for e in entries:
        parts = e.split("\t", 1)
        if len(parts) != 2:
            continue
        meta, path = parts[0], path_norm(parts[1])
        ext = pathlib.Path(path).suffix.lower()
        if ext not in CODE_EXTS:
            continue

        meta_parts = meta.split()
        if len(meta_parts) < 4:
            continue

        size_s = meta_parts[3]
        if size_s == "-":
            continue
        try:
            size = int(size_s)
        except ValueError:
            continue

        total["files"] += 1
        total["bytes"] += size

    return {"total": total}


def aggregate_file_stats(files: List[FileStats]) -> Dict[str, int]:
    agg = {
        "files": 0,
        "bytes": 0,
        "binary": 0,
        "loc_total": 0,
        "loc_blank": 0,
        "loc_comment": 0,
        "loc_code": 0,
    }
    for fs in files:
        agg["files"] += 1
        agg["bytes"] += fs.bytes_size
        if fs.is_binary:
            agg["binary"] += 1
        agg["loc_total"] += fs.lines.total
        agg["loc_blank"] += fs.lines.blank
        agg["loc_comment"] += fs.lines.comment
        agg["loc_code"] += fs.lines.code
    return agg


def md_table(rows: List[List[str]], headers: List[str]) -> str:
    h = "| " + " | ".join(headers) + " |\n"
    s = "| " + " | ".join(["---"] * len(headers)) + " |\n"
    b = ""
    for r in rows:
        b += "| " + " | ".join(r) + " |\n"
    return h + s + b


def spark(values: List[int], width: int = 24) -> str:
    if not values:
        return ""
    blocks = "▁▂▃▄▅▆▇█"
    mn = min(values)
    mx = max(values)
    if mx == mn:
        return blocks[0] * min(width, len(values))
    out = ""
    for v in values[-width:]:
        idx = int((v - mn) / (mx - mn) * (len(blocks) - 1))
        out += blocks[idx]
    return out


def ratio_str(num: int, den: int) -> str:
    if den <= 0:
        return "n/a"
    return f"{(num / den) * 100.0:.1f}%"


def safe_median_int(values: List[int]) -> str:
    if not values:
        return "n/a"
    return str(int(statistics.median(values)))


def compute_continuity(commits: List[GitCommitStat]) -> Dict[str, Any]:
    days = sorted(
        {
            day_key_from_iso(c.date_iso)
            for c in commits
            if c.date_iso and day_key_from_iso(c.date_iso) != "unknown"
        }
    )
    if not days:
        return {
            "active_days": 0,
            "longest_streak_days": 0,
            "longest_gap_days": 0,
            "median_gap_days": "n/a",
        }

    day_dates: List[dt.date] = []
    for d in days:
        try:
            day_dates.append(dt.date.fromisoformat(d))
        except ValueError:
            continue
    day_dates.sort()
    if not day_dates:
        return {
            "active_days": 0,
            "longest_streak_days": 0,
            "longest_gap_days": 0,
            "median_gap_days": "n/a",
        }

    longest_streak = 1
    cur_streak = 1
    gaps: List[int] = []
    longest_gap = 0

    for i in range(1, len(day_dates)):
        diff = (day_dates[i] - day_dates[i - 1]).days
        if diff == 1:
            cur_streak += 1
            longest_streak = max(longest_streak, cur_streak)
        else:
            cur_streak = 1
        gap_days = max(0, diff - 1)
        if gap_days > 0:
            gaps.append(gap_days)
            longest_gap = max(longest_gap, gap_days)

    return {
        "active_days": len(day_dates),
        "longest_streak_days": longest_streak,
        "longest_gap_days": longest_gap,
        "median_gap_days": safe_median_int(gaps),
    }


def monthly_rollup(commits: List[GitCommitStat]) -> List[MonthStat]:
    by_month: Dict[str, List[GitCommitStat]] = defaultdict(list)
    for c in commits:
        mk = month_key_from_iso(c.date_iso)
        if mk != "unknown":
            by_month[mk].append(c)

    items = sorted(by_month.items(), key=lambda x: x[0])
    out: List[MonthStat] = []
    for mk, cs in items:
        commits_n = len(cs)
        ins = sum(c.ins_total for c in cs)
        dele = sum(c.del_total for c in cs)
        net = ins - dele
        churn = ins + dele
        out.append(
            {
                "period": mk,
                "commits": commits_n,
                "ins": ins,
                "del_": dele,
                "net": net,
                "churn": churn,
                "be_churn": 0,
                "fe_churn": 0,
                "dominant": "APP",
            }
        )
    return out


def classify_month(m: MonthStat, churn_hi: int, churn_lo: int, is_first: bool) -> str:
    commits_n = int(m["commits"])
    churn = int(m["churn"])
    net = int(m["net"])

    if commits_n <= 0:
        return "Inactive"
    if is_first and churn > 0:
        return "Bootstrap"

    if churn >= churn_hi and net >= 0:
        return "Expansion"
    if churn >= churn_hi and net < 0:
        return "Restructure"
    if churn >= churn_hi:
        thresh = max(50, int(churn * 0.1))
        if abs(net) <= thresh:
            return "Refactor"

    if churn <= churn_lo:
        return "Stabilization"
    if net < 0:
        return "Refactor"
    return "Iteration"


def build_phases(
    months: List[MonthStat], commits_chrono: List[GitCommitStat]
) -> List[Dict[str, Any]]:
    if not months:
        return []

    churns = [int(m["churn"]) for m in months if int(m["commits"]) > 0]
    if not churns:
        return []

    churns_sorted = sorted(churns)
    churn_hi = churns_sorted[max(0, int(len(churns_sorted) * 0.85) - 1)]
    churn_lo = churns_sorted[max(0, int(len(churns_sorted) * 0.25) - 1)]

    labeled: List[Dict[str, Any]] = []
    for i, m in enumerate(months):
        label = classify_month(m, churn_hi=churn_hi, churn_lo=churn_lo, is_first=i == 0)
        labeled.append({**m, "label": label})

    month_commits: Dict[str, List[GitCommitStat]] = defaultdict(list)
    for c in commits_chrono:
        mk = month_key_from_iso(c.date_iso)
        if mk != "unknown":
            month_commits[mk].append(c)

    phases: List[Dict[str, Any]] = []
    cur: Optional[Dict[str, Any]] = None

    def flush_cur() -> None:
        nonlocal cur
        if not cur:
            return
        phases.append(cur)
        cur = None

    def month_dt(period: str) -> Optional[dt.date]:
        try:
            return dt.date(int(period[0:4]), int(period[5:7]), 1)
        except ValueError:
            return None

    prev_period_date: Optional[dt.date] = None
    for m in labeled:
        period = str(m["period"])
        label = str(m["label"])
        period_date = month_dt(period)

        if prev_period_date and period_date:
            gap_months = (
                (period_date.year - prev_period_date.year) * 12
                + (period_date.month - prev_period_date.month)
                - 1
            )
            if gap_months >= 3:
                flush_cur()
                phases.append(
                    {
                        "label": "Dormant",
                        "from": prev_period_date.strftime("%Y-%m"),
                        "to": period,
                        "months": gap_months,
                        "commits": 0,
                        "churn": 0,
                        "net": 0,
                        "dominant": "n/a",
                        "milestone": None,
                    }
                )

        if cur is None:
            cur = {
                "label": label,
                "from": period,
                "to": period,
                "months": 1,
                "commits": int(m["commits"]),
                "churn": int(m["churn"]),
                "net": int(m["net"]),
                "dominant": "APP",
                "milestone": None,
            }
        else:
            if label == cur["label"]:
                cur["to"] = period
                cur["months"] = int(cur["months"]) + 1
                cur["commits"] = int(cur["commits"]) + int(m["commits"])
                cur["churn"] = int(cur["churn"]) + int(m["churn"])
                cur["net"] = int(cur["net"]) + int(m["net"])
            else:
                flush_cur()
                cur = {
                    "label": label,
                    "from": period,
                    "to": period,
                    "months": 1,
                    "commits": int(m["commits"]),
                    "churn": int(m["churn"]),
                    "net": int(m["net"]),
                    "dominant": "APP",
                    "milestone": None,
                }

        prev_period_date = period_date or prev_period_date

    flush_cur()

    def in_range(mk: str, frm: str, to: str) -> bool:
        return frm <= mk <= to

    for ph in phases:
        if ph["label"] in ("Dormant", "Inactive"):
            continue
        frm = str(ph["from"])
        to = str(ph["to"])
        cand: List[GitCommitStat] = []
        for mk, cs in month_commits.items():
            if in_range(mk, frm, to):
                cand.extend(cs)
        if not cand:
            continue
        best = max(cand, key=lambda c: (c.ins_total + c.del_total))
        ph["milestone"] = {
            "date": best.date_iso,
            "sha": best.sha,
            "subject": best.subject,
            "churn": best.ins_total + best.del_total,
        }

    return phases


def detect_milestones(
    commits: List[GitCommitStat], limit: int = 10
) -> List[Dict[str, str]]:
    if not commits:
        return []
    keywords = [
        "init",
        "bootstrap",
        "migrate",
        "migration",
        "deploy",
        "release",
        "refactor",
        "cleanup",
        "test",
        "tests",
        "green",
        "ci",
        "workflow",
        "docker",
        "security",
        "login",
        "flow",
    ]
    scored = []
    for c in commits:
        subj = (c.subject or "").strip()
        subj_l = subj.lower()
        kw = any(k in subj_l for k in keywords)
        churn = c.ins_total + c.del_total
        score = (1_000_000 if kw else 0) + churn
        scored.append((score, churn, c))
    scored.sort(key=lambda x: (x[0], x[1]), reverse=True)

    out: List[Dict[str, str]] = []
    seen = set()
    for _, _, c in scored:
        if c.sha in seen:
            continue
        seen.add(c.sha)
        subject = (c.subject[:80] + "…") if len(c.subject) > 80 else c.subject
        out.append(
            {
                "date": c.date_iso,
                "sha": c.sha[:10],
                "churn": str(c.ins_total + c.del_total),
                "subject": subject,
            }
        )
        if len(out) >= limit:
            break
    return out


def build_growth_snapshots(
    commits_chrono: List[GitCommitStat],
    first_date: str,
    last_date: str,
    repo_root: str,
    roots: List[str],
) -> List[Dict[str, Union[str, int]]]:
    if not commits_chrono:
        return []

    cum_total = 0
    cum_map: Dict[str, int] = {}

    for c in commits_chrono:
        cum_total += c.ins_total - c.del_total
        cum_map[c.sha] = cum_total

    commit_times: List[Tuple[dt.datetime, str]] = []
    for c in commits_chrono:
        t = parse_iso_to_utc(c.date_iso)
        if t is not None:
            commit_times.append((t, c.sha))
    commit_times.sort(key=lambda x: x[0])
    if not commit_times:
        return []

    period_keys = compute_period_keys(first_date, last_date, max_points=36)
    out: List[Dict[str, Union[str, int]]] = []

    idx = 0
    last_sha: Optional[str] = None
    for key, end_dt in period_keys:
        while idx < len(commit_times) and commit_times[idx][0] <= end_dt:
            last_sha = commit_times[idx][1]
            idx += 1
        if not last_sha:
            continue

        tree = git_ls_tree_code_summary(repo_root, last_sha, roots)
        loc_total = cum_map.get(last_sha, 0)

        out.append(
            {
                "period": key,
                "sha": last_sha,
                "files_total": int(tree["total"]["files"]),
                "bytes_total": int(tree["total"]["bytes"]),
                "loc_approx_total": int(loc_total),
            }
        )

    return out


def ext_breakdown_compact(
    files: List[FileStats], top_n: int = 6
) -> List[Tuple[str, Dict[str, int]]]:
    groups: Dict[str, List[FileStats]] = defaultdict(list)
    for f in files:
        ext = f.ext if f.ext else "(none)"
        groups[ext].append(f)

    items: List[Tuple[str, Dict[str, int]]] = []
    for ext, fl in groups.items():
        agg = aggregate_file_stats(fl)
        items.append((ext, agg))
    items.sort(key=lambda x: (x[1]["loc_code"], x[1]["files"]), reverse=True)

    top = items[:top_n]
    rest = items[top_n:]
    if not rest:
        return top

    rest_agg = {
        "files": 0,
        "bytes": 0,
        "loc_total": 0,
        "loc_code": 0,
        "loc_comment": 0,
        "loc_blank": 0,
        "binary": 0,
    }
    for _, agg in rest:
        for k in rest_agg:
            rest_agg[k] += int(agg[k])

    top.append(("OTHER", rest_agg))
    return top


def folder_bucket(path: str) -> str:
    p = path_norm(path)
    if p.startswith("src/"):
        rest = p[len("src/") :]
        top = rest.split("/", 1)[0] if rest else ""
        if top:
            return f"src/{top}"
        return "src"
    return "(other)"


def scope_map(files: List[FileStats]) -> List[Tuple[str, Dict[str, int]]]:
    groups: Dict[str, List[FileStats]] = defaultdict(list)
    for f in files:
        groups[folder_bucket(f.path)].append(f)
    out = [(k, aggregate_file_stats(v)) for k, v in groups.items()]
    out.sort(key=lambda x: (x[1]["loc_code"], x[1]["files"]), reverse=True)
    return out


def test_maturity(_files: List[FileStats]) -> Dict[str, Any]:
    return {
        "main_files": 0,
        "test_files": 0,
        "main_loc": 0,
        "test_loc": 0,
        "file_ratio": "n/a",
        "loc_ratio": "n/a",
    }


def build_report(repo_root: str, project_name: str) -> str:
    now = iso_utc_now()
    branch, head = git_branch_head(repo_root)
    remote = git_remote(repo_root)
    status = git_status_porcelain(repo_root)

    roots = DEFAULT_SCAN_ROOTS

    LOG.info(
        "Collecting file list via git (tracked + untracked, respecting nested .gitignore)..."
    )
    rel_files = git_list_files(repo_root, roots)
    rel_files = [
        f for f in rel_files if not starts_with_any(f, DEFAULT_EXCLUDE_PREFIXES)
    ]
    rel_files = [f for f in rel_files if within_any_root(f, roots)]

    LOG.info("Computing current working tree stats for scope...")
    file_stats: List[FileStats] = []
    total_files = len(rel_files)
    for i, f in enumerate(rel_files, start=1):
        if i % 250 == 0:
            LOG.info("Processed %d/%d files...", i, total_files)
        file_stats.append(compute_file_stats(repo_root, f))

    total_agg = aggregate_file_stats(file_stats)

    LOG.info("Parsing git history (path-limited to scope)...")
    commits = parse_git_log_numstat(repo_root, roots)
    commits_chrono = sorted(commits, key=lambda c: c.date_iso)

    first_date = commits_chrono[0].date_iso if commits_chrono else ""
    last_date = commits_chrono[-1].date_iso if commits_chrono else ""

    authors = Counter([c.author for c in commits if c.author])
    continuity = compute_continuity(commits)

    months = monthly_rollup(commits)
    commits_per_month_spark = spark([int(m["commits"]) for m in months], width=30)
    churn_spark = spark([int(m["churn"]) for m in months], width=30)
    net_spark = spark([int(m["net"]) for m in months], width=30)

    phases = build_phases(months, commits_chrono)

    LOG.info(
        "Computing growth snapshots (stable mode: ls-tree + numstat cumulative)..."
    )
    growth: List[Dict[str, Union[str, int]]] = []
    if first_date and last_date:
        growth = build_growth_snapshots(
            commits_chrono, first_date, last_date, repo_root, roots
        )

    milestones = detect_milestones(commits, limit=10)

    peak_by_churn: Optional[MonthStat] = (
        max(months, key=lambda m: int(m["churn"])) if months else None
    )
    peak_by_commits: Optional[MonthStat] = (
        max(months, key=lambda m: int(m["commits"])) if months else None
    )

    ext_compact = ext_breakdown_compact(file_stats, top_n=6)
    scope_compact = scope_map(file_stats)[:10]

    lines: List[str] = []
    lines.append(f"# {project_name} Over9000 Metrics Report\n\n")
    lines.append(f"- Generated (UTC): `{now}`\n")
    lines.append(f"- Repo root: `{repo_root}`\n")
    lines.append(f"- Branch: `{branch}`\n")
    lines.append(f"- HEAD: `{head}`\n")
    if remote:
        lines.append(f"- Remote: `{remote}`\n")
    lines.append("\n")

    lines.append("## One-Minute Summary\n")
    started = first_date or "n/a"
    latest = last_date or "n/a"
    lines.append(f"- Started (first scope-touch): `{started}`\n")
    lines.append(f"- Latest (last scope-touch): `{latest}`\n")

    scale = (
        f"- Scope scale now: `{total_agg['files']}` files, `{total_agg['loc_code']}` "
        f"code lines, `{human_bytes(int(total_agg['bytes']))}`\n"
    )
    lines.append(scale)

    activity = (
        f"- Git activity (scope): `{len(commits)}` commits, `{continuity['active_days']}` "
        f"active days, `{len(authors)}` authors\n"
    )
    lines.append(activity)

    rhythm = (
        f"- Rhythm: longest streak `{continuity['longest_streak_days']}`d, "
        f"longest gap `{continuity['longest_gap_days']}`d, "
        f"median gap `{continuity['median_gap_days']}`d\n"
    )
    lines.append(rhythm)

    if peak_by_commits is not None:
        lines.append(
            f"- Peak activity month: `{peak_by_commits['period']}` with "
            f"`{peak_by_commits['commits']}` commits\n"
        )
    if peak_by_churn is not None:
        lines.append(
            f"- Peak intensity month: `{peak_by_churn['period']}` with churn "
            f"`{peak_by_churn['churn']}` (net `{peak_by_churn['net']}`)\n"
        )
    lines.append("\n")

    lines.append("## Scope\n")
    lines.append("- Included: `src/**`\n")
    lines.append(
        "- Excluded (hard): `scripts/**`, `docs/**`, `legacy_archive/**`, `.next/**`, "
        "`node_modules/**`, `dist/**`, `build/**`, `out/**`, `coverage/**`\n"
    )
    lines.append(
        "- File discovery: `git ls-files` (tracked + untracked, `--exclude-standard`, "
        "nested `.gitignore`)\n\n"
    )

    lines.append("## Momentum (scope)\n")
    lines.append(f"- Commits/month: `{commits_per_month_spark}`\n")
    lines.append(f"- Churn/month (ins+del): `{churn_spark}`\n")
    lines.append(f"- Net/month (ins-del): `{net_spark}`\n\n")

    if months:
        lines.append("### Monthly Highlights (compact)\n")
        rows = []
        for m in months[-12:]:
            rows.append(
                [
                    str(m["period"]),
                    str(m["commits"]),
                    str(m["churn"]),
                    str(m["net"]),
                    str(m["dominant"]),
                ]
            )
        lines.append(md_table(rows, ["Period", "Commits", "Churn", "Net", "Dominant"]))
        lines.append("\n")

    if phases:
        lines.append("## Timeline Phases (auto-detected)\n")
        rows = []
        for ph in phases:
            label = str(ph["label"])
            frm = str(ph["from"])
            to = str(ph["to"])
            span = f"{frm} → {to}" if frm != to else frm
            milestone = ph.get("milestone")
            if milestone:
                ms = (
                    f"{str(milestone['date'])} {str(milestone['sha'])[:10]} "
                    f"({milestone['churn']}): {milestone['subject']}"
                )
                ms = (ms[:90] + "…") if len(ms) > 90 else ms
            else:
                ms = ""
            rows.append(
                [
                    label,
                    span,
                    str(ph["months"]),
                    str(ph["commits"]),
                    str(ph["churn"]),
                    str(ph["net"]),
                    str(ph["dominant"]),
                    ms,
                ]
            )
        lines.append(
            md_table(
                rows,
                [
                    "Phase",
                    "Range",
                    "Months",
                    "Commits",
                    "Churn",
                    "Net",
                    "Dominant",
                    "Milestone",
                ],
            )
        )
        lines.append("\n")

    lines.append("## Executive Summary (scope now)\n")
    summary_rows = [
        [
            "TOTAL",
            f"{total_agg['files']}",
            human_bytes(int(total_agg["bytes"])),
            f"{total_agg['loc_total']}",
            f"{total_agg['loc_code']}",
            f"{total_agg['loc_comment']}",
            f"{total_agg['loc_blank']}",
        ]
    ]
    lines.append(
        md_table(
            summary_rows,
            [
                "Scope",
                "Files",
                "Size",
                "Lines(total)",
                "Lines(code)",
                "Lines(comment)",
                "Lines(blank)",
            ],
        )
    )
    lines.append("\n")

    lines.append("## Scope Map (where the code lives)\n")
    rows = []
    for k, agg in scope_compact:
        rows.append(
            [k, str(agg["files"]), str(agg["loc_code"]), human_bytes(int(agg["bytes"]))]
        )
    lines.append(md_table(rows, ["Bucket", "Files", "Code lines", "Size"]))
    lines.append("\n")

    lines.append("## Language / Filetype Mix (compact)\n")
    rows = []
    for ext, agg in ext_compact:
        rows.append(
            [
                ext,
                str(agg["files"]),
                str(agg["loc_code"]),
                human_bytes(int(agg["bytes"])),
            ]
        )
    lines.append(md_table(rows, ["Ext", "Files", "Code lines", "Size"]))
    lines.append("\n")

    if growth:
        lines.append("## Growth Snapshots (git)\n")
        lines.append("- Files/Size: `git ls-tree -r -l` (code-like extensions only)\n")
        lines.append(
            "- LOC~: cumulative `(insertions - deletions)` from `git log --numstat` (path-limited)\n\n"
        )
        rows = []
        for g in growth:
            rows.append(
                [
                    str(g["period"]),
                    str(g["sha"])[:10],
                    str(g["files_total"]),
                    human_bytes(int(g["bytes_total"])),
                    str(g["loc_approx_total"]),
                ]
            )
        lines.append(md_table(rows, ["Period", "Commit", "Files", "Size", "LOC~(T)"]))
        lines.append("\n")
        series_loc = [int(g["loc_approx_total"]) for g in growth]
        series_files = [int(g["files_total"]) for g in growth]
        lines.append(f"- LOC~ trend: `{spark(series_loc, width=40)}`\n")
        lines.append(f"- File trend: `{spark(series_files, width=40)}`\n\n")

    if milestones:
        lines.append("## Milestones (auto-picked)\n")
        rows = []
        for m in milestones:
            rows.append([m["date"], m["sha"], m["churn"], m["subject"]])
        lines.append(md_table(rows, ["Date", "SHA", "Churn", "Subject"]))
        lines.append("\n")

    lines.append("## Local State (working tree)\n")
    st_rows = [[k, str(v)] for k, v in status.items()]
    lines.append(md_table(st_rows, ["Metric", "Value"]))
    lines.append("\n")

    lines.append("## Appendix: Biggest Commits (by churn, scope only)\n")
    big_commits = sorted(
        commits, key=lambda c: (c.ins_total + c.del_total), reverse=True
    )[:12]
    rows = []
    for c in big_commits:
        churn = c.ins_total + c.del_total
        subject = (c.subject[:80] + "…") if len(c.subject) > 80 else c.subject
        rows.append(
            [
                c.date_iso,
                c.sha[:10],
                c.author if c.author else "(unknown)",
                str(churn),
                f"+{c.ins_total}/-{c.del_total}",
                subject,
            ]
        )
    lines.append(md_table(rows, ["Date", "SHA", "Author", "Churn", "Total", "Subject"]))
    lines.append("\n")

    lines.append(
        "## Appendix: Maintainability Candidates (largest files by code lines)\n"
    )
    lines.append("\n")
    rows = []
    all_big = sorted(
        [f for f in file_stats if not f.is_binary],
        key=lambda x: (x.lines.code, x.lines.total, x.bytes_size),
        reverse=True,
    )[:15]
    for f in all_big:
        rows.append(
            [
                f.path,
                f.ext if f.ext else "(none)",
                str(f.lines.code),
                str(f.lines.total),
                human_bytes(int(f.bytes_size)),
            ]
        )
    lines.append(md_table(rows, ["Path", "Ext", "Code lines", "Total lines", "Size"]))
    lines.append("\n")

    return "".join(lines)


def write_report(repo_root: str, content: str) -> str:
    logic_dir = os.path.join(repo_root, "scripts", "logic")
    os.makedirs(logic_dir, exist_ok=True)
    ts = safe_timestamp_for_filename(iso_utc_now())
    out_path = os.path.join(logic_dir, f"over9000_metrics_{ts}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    return out_path


def main() -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    try:
        project_name = os.environ.get("OVER9000_PROJECT_NAME", "").strip()
        if not project_name:
            project_name = input("Project name: ").strip()
        if not project_name:
            project_name = "Over9000"

        here = os.path.dirname(os.path.abspath(__file__))
        repo_root = find_repo_root(here)
        if not is_git_available():
            raise RuntimeError("git not found in PATH")
        LOG.info("Repo root: %s", repo_root)
        report = build_report(repo_root, project_name=project_name)
        out = write_report(repo_root, report)
        LOG.info("Report written: %s", out)
        return 0
    except subprocess.CalledProcessError as e:
        cmd_s = " ".join(e.cmd) if isinstance(e.cmd, list) else str(e.cmd)
        LOG.error("Command failed: %s", cmd_s)
        LOG.error("stdout:\n%s", e.stdout)
        LOG.error("stderr:\n%s", e.stderr)
        return 2
    except Exception as e:
        LOG.exception("Fatal error: %s", str(e))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
