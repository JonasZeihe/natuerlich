from __future__ import annotations

import difflib
import os
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class ChangedFile:
    status: str
    path: str
    old_path: str | None = None


def log(message: str) -> None:
    print(f"[gitreport] {message}")


def normalize_text(text: str) -> str:
    return text.replace("\r\n", "\n").replace("\r", "\n")


def run_git(
    args: list[str],
    cwd: Path,
    check: bool = True,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=str(cwd),
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=check,
    )


def find_repo_root(start_dir: Path) -> Path:
    result = run_git(["rev-parse", "--show-toplevel"], cwd=start_dir)
    return Path(result.stdout.strip()).resolve()


def get_tracked_unstaged_files(repo_root: Path) -> list[ChangedFile]:
    result = run_git(["diff", "HEAD", "--name-status", "--find-renames"], cwd=repo_root)
    items: list[ChangedFile] = []
    for raw_line in result.stdout.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        parts = raw_line.split("\t")
        status_token = parts[0]
        status = status_token[:1]
        if status == "R" and len(parts) >= 3:
            items.append(ChangedFile(status="R", old_path=parts[1], path=parts[2]))
            continue
        if len(parts) >= 2:
            items.append(ChangedFile(status=status, path=parts[1]))
    return items


def get_untracked_files(repo_root: Path) -> list[ChangedFile]:
    result = run_git(["ls-files", "--others", "--exclude-standard"], cwd=repo_root)
    items: list[ChangedFile] = []
    for raw_line in result.stdout.splitlines():
        path = raw_line.strip()
        if not path:
            continue
        items.append(ChangedFile(status="U", path=path))
    return items


def get_changed_files(repo_root: Path) -> list[ChangedFile]:
    tracked = get_tracked_unstaged_files(repo_root)
    untracked = get_untracked_files(repo_root)

    def sort_key(item: ChangedFile) -> tuple[str, str]:
        group = "2" if item.status == "U" else "1"
        return (group, item.path)

    merged = tracked + untracked
    merged.sort(key=sort_key)
    return merged


def read_head_file(repo_root: Path, repo_path: str) -> str | None:
    probe = subprocess.run(
        ["git", "cat-file", "-e", f"HEAD:{repo_path}"],
        cwd=str(repo_root),
        text=True,
        encoding="utf-8",
        errors="replace",
        capture_output=True,
        check=False,
    )
    if probe.returncode != 0:
        return None
    result = run_git(["show", f"HEAD:{repo_path}"], cwd=repo_root)
    return normalize_text(result.stdout)


def read_worktree_file(repo_root: Path, repo_path: str) -> str | None:
    path = repo_root / repo_path
    if not path.exists() or not path.is_file():
        return None
    return normalize_text(path.read_text(encoding="utf-8", errors="replace"))


def make_unified_diff(
    old_text: str | None,
    new_text: str | None,
    repo_path: str,
) -> str:
    old_lines = [] if old_text is None else old_text.splitlines(keepends=True)
    new_lines = [] if new_text is None else new_text.splitlines(keepends=True)
    diff_lines = difflib.unified_diff(
        old_lines,
        new_lines,
        fromfile=f"a/{repo_path}",
        tofile=f"b/{repo_path}",
        lineterm="",
        n=3,
    )
    return "\n".join(diff_lines)


def status_label(item: ChangedFile) -> str:
    mapping = {
        "A": "ADDED",
        "C": "COPIED",
        "D": "DELETED",
        "M": "MODIFIED",
        "R": "RENAMED",
        "U": "UNTRACKED",
    }
    return mapping.get(item.status, item.status)


def format_section(item: ChangedFile, repo_root: Path) -> str:
    head_path = item.old_path if item.status == "R" and item.old_path else item.path
    before_text = read_head_file(repo_root, head_path) if item.status != "U" else None
    after_text = (
        read_worktree_file(repo_root, item.path) if item.status != "D" else None
    )
    diff_text = make_unified_diff(before_text, after_text, item.path)

    lines: list[str] = []
    lines.append("=" * 70)
    lines.append(f"DATEI: {item.path}")
    lines.append(f"STATUS: {status_label(item)}")
    if item.old_path:
        lines.append(f"VORHERIGER PFAD: {item.old_path}")
    lines.append("=" * 70)
    lines.append("")
    lines.append("----- VORHER -----")
    if before_text is None:
        lines.append("[keine Vorversion in HEAD vorhanden]")
    else:
        lines.append(before_text.rstrip("\n"))
    lines.append("")
    lines.append("----- DIFF -----")
    if diff_text.strip():
        lines.append(diff_text)
    else:
        lines.append(
            "[kein inhaltlicher Unterschied nach Normalisierung der Zeilenenden]"
        )
    lines.append("")
    lines.append("----- NACHHER -----")
    if after_text is None:
        if item.status == "D":
            lines.append("[Datei gelöscht]")
        else:
            lines.append("[Datei nicht vorhanden]")
    else:
        lines.append(after_text.rstrip("\n"))
    lines.append("")
    return "\n".join(lines)


def render_report(
    repo_root: Path,
    changes: Iterable[ChangedFile],
    generated_at: str,
) -> str:
    lines = [
        f"Report: {generated_at}",
        f"Repository: {repo_root.as_posix()}",
        "",
    ]
    any_changes = False
    for item in changes:
        any_changes = True
        lines.append(format_section(item, repo_root))
    if not any_changes:
        lines.append("[keine Änderungen gegen HEAD gefunden]")
        lines.append("")
    return "\n".join(lines)


def enable_windows_vt() -> None:
    if os.name != "nt":
        return
    try:
        import ctypes  # type: ignore

        kernel32 = ctypes.windll.kernel32  # type: ignore[attr-defined]
        handle = kernel32.GetStdHandle(-11)
        if handle in (0, -1):
            return
        mode = ctypes.c_uint32()
        if kernel32.GetConsoleMode(handle, ctypes.byref(mode)) == 0:
            return
        new_mode = mode.value | 0x0004
        kernel32.SetConsoleMode(handle, new_mode)
    except ImportError:
        return
    except OSError:
        return
    except AttributeError:
        return


def supports_ansi() -> bool:
    if os.environ.get("NO_COLOR"):
        return False
    if not sys.stdout.isatty():
        return False
    enable_windows_vt()
    if os.name == "nt":
        return True
    term = os.environ.get("TERM", "").strip()
    return bool(term)


def is_noise_path(path: str) -> bool:
    p = path.replace("\\", "/").lower().strip()
    name = p.rsplit("/", 1)[-1]

    scoped = f"/{p}/"
    if "/logs/" in scoped or "/exports/" in scoped or "/tmp/" in scoped:
        return True
    if "/out/" in scoped or "/dist/" in scoped or "/build/" in scoped:
        return True
    if "/.next/" in scoped:
        return True

    if name.startswith("gitreport_") and name.endswith(".txt"):
        return True
    if "shizen_export_" in name:
        return True
    if "_dump" in name or name.endswith("_dump.txt"):
        return True

    ext = Path(name).suffix.lower()
    noise_exts = {
        ".log",
        ".txt",
        ".md",
        ".csv",
        ".tsv",
        ".jsonl",
        ".ndjson",
        ".dump",
        ".bak",
        ".tmp",
        ".zip",
        ".7z",
        ".tar",
        ".gz",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".pdf",
    }
    return ext in noise_exts


def ansi_wrap(text: str, code: str) -> str:
    if not supports_ansi():
        return text
    return f"\x1b[{code}m{text}\x1b[0m"


def style_item_line(text: str, noise: bool, selected: bool) -> str:
    if not supports_ansi():
        return text
    if selected:
        return ansi_wrap(text, "92")
    if noise:
        return ansi_wrap(text, "90")
    return ansi_wrap(text, "97")


def print_menu() -> None:
    print("")
    log("Modus wählen:")
    print("  1) Report generieren (alle unstaged)")
    print("  2) Pick Files (selektiv)")
    print("  (Enter) Abbrechen")


def print_changes_list(
    items: list[ChangedFile], title: str, selected_set: set[str]
) -> None:
    print("")
    log(title)
    if not items:
        print("  (leer)")
        return
    for idx, item in enumerate(items, start=1):
        noise = is_noise_path(item.path)
        selected = item.path in selected_set
        tag = " [NOISE]" if noise else ""
        line = f"  {idx}) {status_label(item)} {item.path}{tag}"
        print(style_item_line(line, noise=noise, selected=selected))


def _expand_token(tok: str, max_index: int) -> tuple[list[int], str | None]:
    t = tok.strip()
    if not t:
        return ([], None)
    if "-" not in t:
        try:
            n = int(t)
        except ValueError:
            return ([], f"Ungültig: {tok}")
        if n < 1 or n > max_index:
            return ([], f"Außerhalb: {n}")
        return ([n], None)

    parts = [p.strip() for p in t.split("-", 1)]
    if len(parts) != 2 or not parts[0] or not parts[1]:
        return ([], f"Ungültig: {tok}")
    try:
        a = int(parts[0])
        b = int(parts[1])
    except ValueError:
        return ([], f"Ungültig: {tok}")
    if a < 1 or b < 1 or a > max_index or b > max_index:
        return ([], f"Außerhalb: {tok}")
    start = a if a <= b else b
    end = b if a <= b else a
    return (list(range(start, end + 1)), None)


def parse_indices(raw: str, max_index: int) -> tuple[list[int], list[str]]:
    s = (raw or "").strip()
    if not s:
        return ([], [])

    normalized = s.replace(" ", ",")
    tokens = [t.strip() for t in normalized.split(",") if t.strip()]

    picked: list[int] = []
    errors: list[str] = []

    for tok in tokens:
        nums, err = _expand_token(tok, max_index)
        if err:
            errors.append(err)
            continue
        picked.extend(nums)

    seen: set[int] = set()
    deduped: list[int] = []
    for n in picked:
        if n in seen:
            continue
        seen.add(n)
        deduped.append(n)

    return (deduped, errors)


def pick_files(all_changes: list[ChangedFile]) -> list[ChangedFile]:
    remaining = list(all_changes)
    selected: list[ChangedFile] = []
    selected_paths: set[str] = set()

    print_changes_list(remaining, "Unstaged Dateien:", selected_paths)

    while remaining:
        raw = input("[gitreport] Auswahl (z.B. 1,3,5-12,20 | Enter=Fertig): ").strip()
        if raw == "":
            break

        indices, errs = parse_indices(raw, len(remaining))
        for msg in errs:
            log(msg)
        if not indices:
            continue

        for idx in sorted(indices, reverse=True):
            picked = remaining.pop(idx - 1)
            if picked.path not in selected_paths:
                selected.append(picked)
                selected_paths.add(picked.path)

        print_changes_list(selected, "Tasche:", selected_paths)
        if not remaining:
            break
        print_changes_list(remaining, "Noch offen:", selected_paths)

    return selected


def main() -> int:
    script_dir = Path(__file__).resolve().parent
    log(f"Arbeitsverzeichnis der Logik: {script_dir}")

    try:
        repo_root = find_repo_root(script_dir)
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(exc.stderr)
        log("Kein Git-Repository gefunden.")
        return 1

    log(f"Repository erkannt: {repo_root}")
    changes = get_changed_files(repo_root)
    log(f"Gefundene Änderungen: {len(changes)}")

    if not changes:
        log("Keine Änderungen gefunden.")
        return 0

    print_menu()
    choice = input("[gitreport] Auswahl: ").strip()

    if choice == "":
        log("Abgebrochen.")
        return 0

    if choice not in {"1", "2"}:
        log("Ungültige Auswahl.")
        return 1

    picked = changes
    if choice == "2":
        picked = pick_files(changes)
        if not picked:
            log("Keine Dateien ausgewählt. Abgebrochen.")
            return 0

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    output_path = Path.cwd().resolve() / f"gitreport_{timestamp}.txt"
    log(f"Schreibe Report nach: {output_path}")

    report_text = render_report(repo_root, picked, timestamp)
    output_path.write_text(report_text, encoding="utf-8", newline="\n")

    log("Fertig.")
    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
