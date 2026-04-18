#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import argparse
import fnmatch
import os
import re
import tempfile
from pathlib import Path

CODE_HEADER_RE = re.compile(r"^\s*//\s*(.+\.(?:ts|tsx|js|jsx|mjs))\s*$", re.ASCII)
MD_HEADER_RE = re.compile(r"^\s*<!--\s*(.+\.md)\s*-->\s*$", re.ASCII)

CODE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".mjs")
SCAN_EXTS = CODE_EXTS + (".md",)


def detect_project_root(script_path: Path) -> Path:
    p = script_path.resolve()
    candidates = [p.parent.parent.parent, p.parent.parent]
    for parent in candidates:
        if (
            parent.is_dir()
            and (parent / "scripts").is_dir()
            and (parent / "src").is_dir()
        ):
            return parent
    raise SystemExit(f"Project root with 'scripts' and 'src' not found from {p}")


def normalize_slashes(s: str) -> str:
    return s.replace("\\", "/")


def should_exclude_rel(rel: Path | str, excludes: list[str]) -> bool:
    rel_s = normalize_slashes(str(rel))
    rel_s = "" if rel_s == "." else rel_s
    return any(fnmatch.fnmatch(rel_s, pat) for pat in excludes)


def list_dirs_and_sources(
    root: Path, excludes: list[str]
) -> list[tuple[Path, list[str], list[str]]]:
    result: list[tuple[Path, list[str], list[str]]] = []
    for dirpath, dirnames, filenames in os.walk(root, topdown=True, followlinks=False):
        rel_dir = Path(dirpath).relative_to(root)
        if should_exclude_rel(rel_dir, excludes):
            dirnames[:] = []
            continue

        dirnames[:] = sorted(
            [d for d in dirnames if not should_exclude_rel(Path(rel_dir, d), excludes)]
        )

        picked = []
        for f in filenames:
            if f.endswith(".d.ts"):
                continue
            if f.endswith(SCAN_EXTS):
                picked.append(f)
        picked.sort()
        result.append((Path(dirpath), dirnames, picked))
    return result


def tree_lines(root: Path, items: list[tuple[Path, list[str], list[str]]]) -> list[str]:
    children: dict[Path, tuple[list[str], list[str]]] = {}
    for d, dirnames, filenames in items:
        children[d] = (dirnames, filenames)

    lines: list[str] = []

    def walk(d: Path, prefix: str = "") -> None:
        dirnames, filenames = children.get(d, ([], []))
        entries = [("dir", Path(d, name)) for name in dirnames] + [
            ("file", Path(d, name)) for name in filenames
        ]
        for i, (kind, p) in enumerate(entries):
            last = i == len(entries) - 1
            connector = "└── " if last else "├── "
            if kind == "dir":
                lines.append(prefix + connector + p.name + "/")
                walk(p, prefix + ("    " if last else "│   "))
            else:
                lines.append(prefix + connector + p.name)

    lines.append(root.name + "/")
    walk(root)
    return lines


def desired_header_for(file_path: Path, project_root: Path) -> str:
    rel = normalize_slashes(str(file_path.resolve().relative_to(project_root)))
    if file_path.name.endswith(".md"):
        return f"<!-- {rel} -->"
    return f"// {rel}"


def read_bytes(p: Path) -> bytes:
    return p.read_bytes()


def write_bytes_atomic(p: Path, data: bytes) -> None:
    with tempfile.NamedTemporaryFile("wb", delete=False, dir=str(p.parent)) as tmp:
        tmp.write(data)
        temp_name = tmp.name
    os.replace(temp_name, p)


def split_first_line(raw: bytes):
    bom = b"\xef\xbb\xbf"
    has_bom = raw.startswith(bom)
    start = len(bom) if has_bom else 0
    npos = raw.find(b"\n", start)
    if npos == -1:
        return has_bom, start, None, raw[start:], b""
    if npos > start and raw[npos - 1 : npos] == b"\r":
        line_sep = b"\r\n"
        line_content = raw[start : npos - 1]
        first_line_end_index = npos + 1
    else:
        line_sep = b"\n"
        line_content = raw[start:npos]
        first_line_end_index = npos + 1
    return has_bom, start, first_line_end_index, line_content, line_sep


def decode_utf8(b: bytes) -> str:
    return b.decode("utf-8")


def encode_utf8(s: str) -> bytes:
    return s.encode("utf-8")


def classify_kind(file_path: Path, first_line_text: str, desired_header: str) -> str:
    first = first_line_text.strip()
    if file_path.name.endswith(".md"):
        if MD_HEADER_RE.match(first_line_text) or CODE_HEADER_RE.match(first_line_text):
            return "ok" if first == desired_header else "update"
        return "insert"
    if CODE_HEADER_RE.match(first_line_text):
        return "ok" if first == desired_header else "update"
    return "insert"


def apply_bytes(
    raw: bytes,
    desired_header: str,
    has_bom: bool,
    bom_len: int,
    first_end,
    line_sep: bytes,
    kind: str,
) -> bytes:
    bom = b"\xef\xbb\xbf" if has_bom else b""
    desired_b = encode_utf8(desired_header)
    if kind == "insert":
        if first_end is None:
            return bom + desired_b
        return bom + desired_b + line_sep + raw[bom_len:]
    if kind == "update":
        if first_end is None:
            return bom + desired_b
        rest = raw[first_end:]
        return bom + desired_b + line_sep + rest
    return raw


def collect_scan_files_in_src(scan_root: Path, excludes: list[str]) -> list[Path]:
    files: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(
        scan_root, topdown=True, followlinks=False
    ):
        rel_dir = Path(dirpath).relative_to(scan_root)
        if should_exclude_rel(rel_dir, excludes):
            dirnames[:] = []
            continue

        dirnames[:] = [
            d for d in dirnames if not should_exclude_rel(Path(rel_dir, d), excludes)
        ]

        for f in filenames:
            if f.endswith(".d.ts"):
                continue
            if not f.endswith(SCAN_EXTS):
                continue
            p = Path(dirpath, f)
            if not should_exclude_rel(Path(rel_dir, f), excludes):
                files.append(p)

    files.sort()
    return files


def collect_md_files_outside_src(
    project_root: Path, src_root: Path, excludes: list[str]
) -> list[Path]:
    files: list[Path] = []
    src_root_resolved = src_root.resolve()
    for dirpath, dirnames, filenames in os.walk(
        project_root, topdown=True, followlinks=False
    ):
        dp = Path(dirpath).resolve()
        if dp == src_root_resolved or str(dp).startswith(
            str(src_root_resolved) + os.sep
        ):
            dirnames[:] = []
            continue

        rel_dir = Path(dirpath).resolve().relative_to(project_root.resolve())
        if should_exclude_rel(rel_dir, excludes):
            dirnames[:] = []
            continue

        dirnames[:] = [
            d
            for d in dirnames
            if not should_exclude_rel(Path(rel_dir, d), excludes)
            and not (
                (Path(dirpath, d).resolve() == src_root_resolved)
                or str(Path(dirpath, d).resolve()).startswith(
                    str(src_root_resolved) + os.sep
                )
            )
        ]

        for f in filenames:
            if not f.endswith(".md"):
                continue
            p = Path(dirpath, f)
            if not should_exclude_rel(Path(rel_dir, f), excludes):
                files.append(p)

    files.sort()
    return files


def main() -> None:
    parser = argparse.ArgumentParser(prog="fix-path-headers", add_help=True)
    parser.add_argument("--start-subdir", dest="start_subdir", default="src")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--ignore", action="append", default=[])
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    script_path = Path(__file__)
    project_root = detect_project_root(script_path)
    src_root = project_root / args.start_subdir
    if not src_root.exists():
        raise SystemExit(
            f"Start folder not found: {normalize_slashes(str(src_root.relative_to(project_root)))}"
        )

    default_ignores = [
        ".git*",
        "target*",
        "build*",
        ".idea*",
        ".vscode*",
        "out*",
        "node_modules*",
        ".metadata*",
        ".next*",
        "coverage*",
        "scripts*",
    ]
    excludes = default_ignores + args.ignore

    structure = list_dirs_and_sources(src_root, excludes)
    if not args.quiet:
        for line in tree_lines(src_root, structure):
            print(line)

    src_files = collect_scan_files_in_src(src_root, excludes)
    md_outside = collect_md_files_outside_src(project_root, src_root, excludes)
    files = sorted(set(src_files + md_outside), key=lambda p: str(p).lower())

    will_update: list[Path] = []
    will_insert: list[Path] = []
    ok: list[Path] = []
    previews = []

    for f in files:
        desired = desired_header_for(f, project_root)
        raw = read_bytes(f)
        has_bom, bom_len, first_end, first_line_bytes, line_sep = split_first_line(raw)
        first_line_text = (
            decode_utf8(first_line_bytes) if first_line_bytes is not None else ""
        )
        kind = classify_kind(f, first_line_text, desired)

        previews.append((f, kind, desired, has_bom, bom_len, first_end, line_sep))

        if kind == "update":
            will_update.append(f)
        elif kind == "insert":
            will_insert.append(f)
        else:
            ok.append(f)

    print("")
    print("Plan:")
    print(f"  will update: {len(will_update)}")
    print(f"  will insert: {len(will_insert)}")
    print(f"  ok:          {len(ok)}")

    if not args.force:
        ans = input("Apply fixes? (y/N): ").strip().lower()
        if ans != "y":
            print("Aborted.")
            return

    changed = []
    for f, kind, desired, has_bom, bom_len, first_end, line_sep in previews:
        if kind == "ok":
            continue
        raw = read_bytes(f)
        new_raw = apply_bytes(raw, desired, has_bom, bom_len, first_end, line_sep, kind)
        if new_raw != raw:
            write_bytes_atomic(f, new_raw)
            changed.append((f, kind))

    print("")
    print("Summary:")
    print(f"  changed: {len(changed)}")
    for p, kind in changed:
        print(
            f"    {kind}: {normalize_slashes(str(p.resolve().relative_to(project_root)))}"
        )
    print(f"  unchanged: {len(files) - len(changed)}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
