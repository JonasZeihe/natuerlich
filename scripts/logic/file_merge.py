import os
import sys
import pathlib
import subprocess
from datetime import datetime

OUTPUT_MAX = 65 * 1024
TOTAL_MAX = 2 * 1024 * 1024
PLAIN_CHUNK_MAX = 2 * 1024 * 1024
SEPARATOR = "\n---\n\n"


def script_root():
    return pathlib.Path(__file__).resolve().parent


def out_dir():
    p = script_root() / "file_merge_output"
    p.mkdir(parents=True, exist_ok=True)
    return p


def iso_ts():
    return datetime.now().strftime("%Y-%m-%dT%H-%M-%S")


def read_text_best(p: pathlib.Path) -> str:
    for e in (
        "utf-8-sig",
        "utf-8",
        "utf-16",
        "utf-16le",
        "utf-16be",
        "cp1252",
        "latin-1",
    ):
        try:
            return p.read_text(encoding=e, errors="strict")
        except (OSError, UnicodeError):
            continue
    return p.read_text(encoding="utf-8", errors="replace")


def run_ps(cmd: str) -> str:
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


def win_file_dialog() -> list[str]:
    o = run_ps(
        "[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new();"
        "Add-Type -AssemblyName System.Windows.Forms|Out-Null;"
        "$d=New-Object System.Windows.Forms.OpenFileDialog;"
        "$d.Filter='All files|*.*';"
        "$d.Multiselect=$true;"
        "if($d.ShowDialog() -eq 'OK'){ $d.FileNames -join \"`n\" }"
    )
    return [l.strip() for l in o.splitlines() if l.strip()]


def win_folder_dialog() -> str:
    o = run_ps(
        "[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new();"
        "Add-Type -AssemblyName System.Windows.Forms|Out-Null;"
        "$d=New-Object System.Windows.Forms.FolderBrowserDialog;"
        "if($d.ShowDialog() -eq 'OK'){ $d.SelectedPath }"
    )
    return o.strip()


def mac_file_dialog() -> list[str]:
    try:
        out = subprocess.check_output(
            [
                "osascript",
                "-e",
                "set _f to choose file with multiple selections allowed",
                "-e",
                "repeat with x in _f",
                "-e",
                "POSIX path of x",
                "-e",
                "end repeat",
            ],
            encoding="utf-8",
            errors="replace",
            stderr=subprocess.DEVNULL,
        )
        return [l.strip() for l in out.splitlines() if l.strip()]
    except (subprocess.CalledProcessError, FileNotFoundError):
        return []


def mac_folder_dialog() -> str:
    try:
        out = subprocess.check_output(
            [
                "osascript",
                "-e",
                "POSIX path of (choose folder)",
            ],
            encoding="utf-8",
            errors="replace",
            stderr=subprocess.DEVNULL,
        )
        return out.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def choose_files() -> list[str]:
    if os.name == "nt":
        return win_file_dialog()
    if sys.platform == "darwin":
        return mac_file_dialog()
    return []


def choose_folder() -> str:
    if os.name == "nt":
        return win_folder_dialog()
    if sys.platform == "darwin":
        return mac_folder_dialog()
    return ""


def normalize_files(paths: list[str]) -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    seen = set()
    for r in paths:
        p = pathlib.Path(r).expanduser().resolve()
        if p.is_file():
            s = str(p)
            if s not in seen:
                seen.add(s)
                files.append(p)
    files.sort(key=lambda x: (x.name.lower(), str(x).lower()))
    return files


def collect_md_files(root: str) -> tuple[pathlib.Path | None, list[pathlib.Path]]:
    base = pathlib.Path(root).expanduser().resolve()
    if not base.is_dir():
        return None, []

    files = [p for p in base.rglob("*") if p.is_file() and p.suffix.lower() == ".md"]
    files.sort(key=lambda x: tuple(part.lower() for part in x.relative_to(base).parts))
    return base, files


def write_chunk(outdir: pathlib.Path, base: str, idx: int, data: bytes) -> pathlib.Path:
    op = outdir / f"{base}{idx:03d}.txt"
    op.write_bytes(data)
    print(f"[write] {op} ({len(data)} bytes)")
    return op


def write_single_output(outdir: pathlib.Path, name: str, data: bytes) -> pathlib.Path:
    op = outdir / name
    op.write_bytes(data)
    print(f"[write] {op} ({len(data)} bytes)")
    return op


def merge_structured(paths: list[str]) -> list[pathlib.Path]:
    files = normalize_files(paths)
    if not files:
        print("[error] No files selected.")
        return []

    ts = iso_ts()
    outdir = out_dir()
    outbase = f"{ts}_file_merge_"

    idx = 1
    current = bytearray()
    out_files: list[pathlib.Path] = []
    total = 0

    def flush():
        nonlocal current, idx
        if not current:
            return
        out_files.append(write_chunk(outdir, outbase, idx, bytes(current)))
        idx += 1
        current = bytearray()

    print(
        f"[info] Mode 1: structured merge (max {OUTPUT_MAX} bytes per output, total cap {TOTAL_MAX} bytes)"
    )
    print(f"[info] Selected: {len(files)} file(s)")

    for fp in files:
        try:
            t = read_text_best(fp)
        except Exception as x:
            print(f"[skip] {fp} :: {x}")
            continue

        block = f"{fp.name}\n{t.rstrip()}{SEPARATOR}"
        b = block.encode("utf-8")

        if len(b) > OUTPUT_MAX:
            print(
                f"[too-big] {fp.name} ({len(b)} bytes) > {OUTPUT_MAX} bytes. Skipped."
            )
            continue

        if total + len(b) > TOTAL_MAX:
            print(f"[stop] Total limit {TOTAL_MAX} bytes reached. Stopping.")
            break

        if len(current) + len(b) > OUTPUT_MAX:
            flush()

        current.extend(b)
        total += len(b)
        print(f"[queue] {fp} (+{len(b)} bytes) total={total}")

    flush()
    return out_files


def merge_plain(paths: list[str]) -> list[pathlib.Path]:
    files = normalize_files(paths)
    if not files:
        print("[error] No files selected.")
        return []

    ts = iso_ts()
    outdir = out_dir()
    outbase = f"{ts}_plain_merge_"

    idx = 1
    current = bytearray()
    out_files: list[pathlib.Path] = []
    total_in = 0

    def flush():
        nonlocal current, idx
        if not current:
            return
        out_files.append(write_chunk(outdir, outbase, idx, bytes(current)))
        idx += 1
        current = bytearray()

    print(
        f"[info] Mode 2: plain merge (max {PLAIN_CHUNK_MAX} bytes per output, continues into _002/_003/...)"
    )
    print(f"[info] Selected: {len(files)} file(s)")

    for fp in files:
        try:
            t = read_text_best(fp)
        except Exception as x:
            print(f"[skip] {fp} :: {x}")
            continue

        b = (t + "\n").encode("utf-8")
        if len(b) > PLAIN_CHUNK_MAX:
            print(
                f"[too-big] {fp.name} ({len(b)} bytes) > {PLAIN_CHUNK_MAX} bytes. Skipped."
            )
            continue

        if len(current) + len(b) > PLAIN_CHUNK_MAX:
            flush()

        current.extend(b)
        total_in += len(b)
        print(f"[queue] {fp} (+{len(b)} bytes) total_in={total_in}")

    flush()
    return out_files


def merge_structured_md_folder(root: str) -> list[pathlib.Path]:
    base, files = collect_md_files(root)
    if base is None:
        print("[error] No folder selected.")
        return []
    if not files:
        print("[error] No .md files found.")
        return []

    ts = iso_ts()
    outdir = out_dir()
    outname = f"{ts}_md_tree_merge.txt"

    merged = bytearray()

    print("[info] Mode 3: recursive .md structured merge to single output file")
    print(f"[info] Root: {base}")
    print(f"[info] Found: {len(files)} .md file(s)")

    for fp in files:
        rel = fp.relative_to(base).as_posix()
        try:
            t = read_text_best(fp)
        except Exception as x:
            print(f"[skip] {fp} :: {x}")
            continue

        block = f"{rel}\n{t.rstrip()}{SEPARATOR}"
        b = block.encode("utf-8")
        merged.extend(b)
        print(f"[queue] {rel} (+{len(b)} bytes) total={len(merged)}")

    if not merged:
        print("[error] Nothing written.")
        return []

    return [write_single_output(outdir, outname, bytes(merged))]


def select_mode() -> str:
    print()
    print("FILE MERGE — Jonas Zeihe")
    print(
        "[ENTER] Mode 1 (default)  structured merge (65KB chunks, never split a file, total cap 2MB)"
    )
    print("[2]     Mode 2            plain merge (2MB chunks, just concatenate text)")
    print(
        "[3]     Mode 3            recursive .md structured merge from folder to one .txt"
    )
    print("[Q]     Quit")
    s = input("> ").strip().lower()
    if s == "":
        return "1"
    if s in ("1", "2", "3", "q"):
        return s
    return "1"


def run_once(show_intro: bool):
    if show_intro:
        print()
        print("Press ENTER for default (Mode 1).")
    mode = select_mode()
    if mode == "q":
        print("[exit] Bye.")
        return None, 0

    if mode == "3":
        print("[select] Opening folder picker…")
        chosen_root = choose_folder()
        if not chosen_root:
            print("[info] No selection. Nothing done.")
            return [], 2
        outs = merge_structured_md_folder(chosen_root)
    else:
        print("[select] Opening file picker…")
        chosen = choose_files()
        if not chosen:
            print("[info] No selection. Nothing done.")
            return [], 2
        outs = merge_structured(chosen) if mode == "1" else merge_plain(chosen)

    if outs:
        print(f"[done] {len(outs)} output file(s):")
        for p in outs:
            print(f"  → {p}")
        return outs, 0

    print("[error] Nothing written.")
    return [], 1


def main():
    show_intro = True
    while True:
        outs, code = run_once(show_intro)
        if outs is None:
            input("Press ENTER to close.")
            sys.exit(0)

        if code != 0:
            act = input("Again? [m=merge / ENTER=exit]: ").strip().lower()
            if act == "m":
                show_intro = False
                continue
            input("Press ENTER to close.")
            sys.exit(code)

        act = input("Merge another set? [m=merge / ENTER=exit]: ").strip().lower()
        if act == "m":
            show_intro = False
            continue
        input("Press ENTER to close.")
        sys.exit(0)


if __name__ == "__main__":
    main()
