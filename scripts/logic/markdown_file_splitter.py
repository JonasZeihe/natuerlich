import os
import sys
import re
import pathlib
import subprocess
from datetime import datetime

SEPARATOR = "\n---\n\n"


def script_root():
    return pathlib.Path(__file__).resolve().parent


def out_root():
    p = script_root() / "markdown_split_output"
    p.mkdir(parents=True, exist_ok=True)
    return p


def iso_ts():
    return datetime.now().strftime("%Y-%m-%dT%H-%M-%S")


def read_text_best(p):
    for e in [
        "utf-8-sig",
        "utf-8",
        "utf-16",
        "utf-16le",
        "utf-16be",
        "cp1252",
        "latin-1",
    ]:
        try:
            return p.read_text(encoding=e, errors="strict")
        except (OSError, UnicodeError):
            continue
    return p.read_text(encoding="utf-8", errors="replace")


def run_ps(cmd):
    for exe in ("powershell", "powershell.exe", "pwsh"):
        try:
            return subprocess.check_output(
                [exe, "-NoProfile", "-STA", "-Command", cmd],
                encoding="utf-8",
                errors="replace",
                stderr=subprocess.DEVNULL,
            )
        except (FileNotFoundError, subprocess.CalledProcessError):
            continue
    return ""


def win_file_dialog():
    o = run_ps(
        "[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new();"
        "Add-Type -AssemblyName System.Windows.Forms|Out-Null;"
        "$d=New-Object System.Windows.Forms.OpenFileDialog;"
        "$d.Filter='Text/Markdown|*.txt;*.md|All files|*.*';"
        "$d.Multiselect=$false;"
        "if($d.ShowDialog() -eq 'OK'){ $d.FileName }"
    )
    lines = [l.strip() for l in o.splitlines() if l.strip()]
    return lines[0] if lines else ""


def mac_file_dialog():
    try:
        out = subprocess.check_output(
            [
                "osascript",
                "-e",
                "set _f to choose file",
                "-e",
                "POSIX path of _f",
            ],
            encoding="utf-8",
            errors="replace",
            stderr=subprocess.DEVNULL,
        )
        lines = [l.strip() for l in out.splitlines() if l.strip()]
        return lines[0] if lines else ""
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def choose_file():
    if os.name == "nt":
        return win_file_dialog()
    if sys.platform == "darwin":
        return mac_file_dialog()
    return ""


def header_matches_comment(text):
    # // docs/flows/01 irgendwas.md
    return list(re.finditer(r"^//\s+(.+?\.md)\s*$", text, flags=re.MULTILINE))


def parse_blocks_with_comment_headers(text):
    matches = header_matches_comment(text)
    if not matches:
        return []

    blocks = []
    for i, m in enumerate(matches):
        header_path = m.group(1).strip()
        header_end = m.end()
        nl = text.find("\n", header_end)
        if nl == -1:
            body_start = len(text)
        else:
            body_start = nl + 1
        if i + 1 < len(matches):
            next_start = matches[i + 1].start()
            sep_start = next_start - len(SEPARATOR)
            if sep_start >= body_start and text[sep_start:next_start] == SEPARATOR:
                body_end = sep_start
            else:
                body_end = next_start
        else:
            body_end = len(text)
        body = text[body_start:body_end]
        blocks.append((header_path, body))
    return blocks


def parse_blocks_by_h1(text):
    # Erst versuchen: H1 mit Nummern (# 00. ..., # 01. ...)
    h1_numeric = list(re.finditer(r"^#\s+(\d{1,3}\.\s+.*)$", text, flags=re.MULTILINE))
    if len(h1_numeric) > 0:
        matches = h1_numeric
    else:
        # Fallback: alle H1-Überschriften (# ...)
        h1_any = list(re.finditer(r"^#\s+(.+)$", text, flags=re.MULTILINE))
        if len(h1_any) == 0:
            return []
        matches = h1_any

    blocks = []
    for i, m in enumerate(matches):
        heading_text = m.group(1).strip()
        start = m.start()
        if i + 1 < len(matches):
            end = matches[i + 1].start()
        else:
            end = len(text)
        body = text[start:end]
        blocks.append((heading_text, body))
    return blocks


def header_to_relpath(header):
    h = header.strip()
    # Wenn es schon aussieht wie ein Pfad mit .md dran, direkt nutzen
    if h.lower().endswith(".md"):
        p = pathlib.PurePosixPath(h)
    else:
        # Überschrift → Dateiname: einfach als ein Segment behandeln
        # Slashes würden Unterordner bedeuten, aber bei dir kommen die hier nicht vor.
        # Extension hängen wir später an, falls keine da ist.
        p = pathlib.PurePosixPath(h)

    parts = [x for x in p.parts if x not in ("", ".")]
    if parts and parts[0].endswith(":"):
        parts = parts[1:]
    if not parts:
        return pathlib.Path("part.md")
    rel = pathlib.Path(*parts)
    if rel.is_absolute():
        rel = pathlib.Path(rel.name)
    return rel


def split_merged_file(path_str):
    p = pathlib.Path(path_str).expanduser().resolve()
    if not p.is_file():
        print(f"[error] Not a file: {p}")
        return []
    try:
        text = read_text_best(p)
    except Exception as x:
        print(f"[error] Failed to read {p} :: {x}")
        return []

    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # 1) Modus: // pfad/zur/datei.md-Header
    blocks = parse_blocks_with_comment_headers(text)

    # 2) Fallback: H1-Überschriften (# 00..., # 01..., …)
    if not blocks:
        blocks = parse_blocks_by_h1(text)

    if not blocks:
        print(
            "[error] No recognizable blocks found (no // path headers, no H1 sections)."
        )
        return []

    root = out_root()
    sub = root / f"{p.stem}_{iso_ts()}"
    sub.mkdir(parents=True, exist_ok=True)
    print(f"[info] Output directory: {sub}")

    out_files = []
    for header, body in blocks:
        rel = header_to_relpath(header)
        dest = sub / rel
        dest_parent = dest.parent
        dest_parent.mkdir(parents=True, exist_ok=True)
        if not dest.suffix:
            dest = dest.with_suffix(".md")
        stem = dest.stem
        ext = dest.suffix
        cand = dest
        i = 1
        while cand.exists():
            cand = dest_parent / f"{stem}_{i:03d}{ext}"
            i += 1
        content = body.rstrip("\n") + "\n" if body else ""
        data = content.encode("utf-8")
        try:
            cand.write_bytes(data)
        except Exception as x:
            print(f"[error] Failed to write {cand} :: {x}")
            continue
        out_files.append(cand)
        print(f"[split] {header} -> {cand} ({len(data)} bytes)")

    print(f"[done] Created {len(out_files)} file(s).")
    print(f"[hint] All files in: {sub}")
    return out_files


def run_once(show_intro):
    if show_intro:
        print()
        print("MARKDOWN FILE SPLITTER — Jonas Zeihe")
        print("Splits a big markdown file")
        print("  • entweder mit '// path/to/file.md'-Headern")
        print("  • oder anhand mehrerer H1-Überschriften (# 00…, # 01…, …)")
        print("Output → scripts/logic/markdown_split_output/<merged-name>_<ISO8601>/…")
        print()
        ans = (
            input("Press ENTER to choose merged file, or 'q' to quit: ").strip().lower()
        )
        if ans == "q":
            print("[exit] Bye.")
            return None, 0
    path = choose_file()
    if not path:
        print("[info] No file selected. Nothing done.")
        return [], 2
    outs = split_merged_file(path)
    if outs:
        return outs, 0
    return outs, 1


def main():
    show_intro = True
    while True:
        outs, code = run_once(show_intro)
        if outs is None:
            input("Press ENTER to close.")
            sys.exit(0)
        if code != 0:
            act = input("Again? [s=split / ENTER=exit]: ").strip().lower()
            if act == "s":
                show_intro = False
                continue
            input("Press ENTER to close.")
            sys.exit(code)
        act = input("Split another file? [s=split / ENTER=exit]: ").strip().lower()
        if act == "s":
            show_intro = False
            continue
        input("Press ENTER to close.")
        sys.exit(0)


if __name__ == "__main__":
    main()
