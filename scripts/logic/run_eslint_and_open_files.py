#!/usr/bin/env python

import json
import os
import platform
import re
import subprocess
import sys
from pathlib import Path

MAX_FILES_TO_OPEN = 50


def find_frontend_root() -> Path:
    script_path = Path(__file__).resolve()
    frontend_root = script_path.parents[2]
    print(f"[run-eslint] Script path: {script_path}")
    print(f"[run-eslint] Detected frontend root: {frontend_root}")
    return frontend_root


def get_code_command() -> str:
    system = platform.system().lower()

    if system.startswith("win"):
        local = os.environ.get("LOCALAPPDATA")
        if local:
            candidate = (
                Path(local) / "Programs" / "Microsoft VS Code" / "bin" / "code.cmd"
            )
            if candidate.is_file():
                print(f"[run-eslint] Using VS Code CLI: {candidate}")
                return str(candidate)

        print(
            "[run-eslint] VS Code CLI not found via LOCALAPPDATA, falling back to 'code'."
        )
        return "code"

    print("[run-eslint] Using 'code' CLI for non-Windows system.")
    return "code"


def run_eslint(frontend_root: Path) -> list | None:
    print(f"[run-eslint] Running ESLint in: {frontend_root}")
    cmd = "npx eslint . -f json"
    print(f"[run-eslint] Command: {cmd}")

    try:
        result = subprocess.run(
            cmd,
            cwd=str(frontend_root),
            shell=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
    except FileNotFoundError:
        print(
            "[run-eslint] Error: 'npx' not found. Make sure Node.js is installed "
            "and 'npx' is in your PATH."
        )
        return None

    print(f"[run-eslint] ESLint exit code: {result.returncode}")

    if result.stderr.strip():
        print("---- ESLint stderr ----")
        print(result.stderr)

    if result.returncode not in (0, 1):
        print("[run-eslint] ESLint returned a non-lint error. Aborting ESLint part.")
        return None

    if not result.stdout.strip():
        print("[run-eslint] ESLint produced no JSON output on stdout.")
        return []

    try:
        eslint_json = json.loads(result.stdout)
    except json.JSONDecodeError:
        print("[run-eslint] Failed to parse ESLint JSON output.")
        print("---- ESLint raw stdout ----")
        print(result.stdout)
        return None

    print(f"[run-eslint] Parsed ESLint JSON entries: {len(eslint_json)}")
    return eslint_json


def collect_eslint_files(eslint_json: list, frontend_root: Path):
    if eslint_json is None:
        return []

    files = []

    for entry in eslint_json:
        messages = entry.get("messages", [])
        if not messages:
            continue

        file_path_str = entry.get("filePath")
        if not file_path_str:
            continue

        raw_path = Path(file_path_str)
        abs_path = (
            raw_path if raw_path.is_absolute() else (frontend_root / raw_path).resolve()
        )

        try:
            rel_path = abs_path.relative_to(frontend_root)
        except ValueError:
            continue

        if not rel_path.parts or rel_path.parts[0] != "src":
            continue

        first_msg = messages[0]
        line = first_msg.get("line", 1) or 1
        column = first_msg.get("column", 1) or 1
        severity = first_msg.get("severity", 1)

        files.append(
            {
                "abs_path": abs_path,
                "rel_path": rel_path,
                "line": int(line),
                "column": int(column),
                "severity": int(severity),
                "source": "eslint",
            }
        )

    print(f"[run-eslint] ESLint: files with at least one problem in src/: {len(files)}")

    if not files:
        return []

    files.sort(key=lambda f: (-f["severity"], str(f["rel_path"])))
    return files


def run_tsc(frontend_root: Path):
    print(f"[run-eslint] Running TypeScript compiler in: {frontend_root}")
    cmd = "npx tsc --noEmit --pretty false"
    print(f"[run-eslint] Command: {cmd}")

    try:
        result = subprocess.run(
            cmd,
            cwd=str(frontend_root),
            shell=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
    except FileNotFoundError:
        print(
            "[run-eslint] Error: 'npx' not found while running tsc. "
            "Make sure Node.js is installed and 'npx' is in your PATH."
        )
        return []

    print(f"[run-eslint] tsc exit code: {result.returncode}")

    text = (result.stdout or "") + "\n" + (result.stderr or "")
    if not text.strip():
        print("[run-eslint] tsc produced no output.")
        return []

    pattern = re.compile(
        r"^(.+?\.(?:ts|tsx|mts|cts|js|jsx|mjs))\((\d+),(\d+)\): error TS\d+:",
        re.MULTILINE,
    )

    errors = []
    for match in pattern.finditer(text):
        file_str = match.group(1)
        raw_path = Path(file_str)
        abs_path = (
            raw_path if raw_path.is_absolute() else (frontend_root / raw_path).resolve()
        )

        try:
            rel_path = abs_path.relative_to(frontend_root)
        except ValueError:
            continue

        if not rel_path.parts or rel_path.parts[0] != "src":
            continue

        line = int(match.group(2))
        column = int(match.group(3))

        errors.append(
            {
                "abs_path": abs_path,
                "rel_path": rel_path,
                "line": line,
                "column": column,
                "severity": 2,
                "source": "tsc",
            }
        )

    print(f"[run-eslint] tsc: raw src/ errors (may contain duplicates): {len(errors)}")

    if not errors:
        return []

    dedup = {}
    for e in errors:
        key = str(Path(e["abs_path"]).resolve())
        if key not in dedup:
            dedup[key] = e

    unique_errors = list(dedup.values())
    print(f"[run-eslint] tsc: unique src/ files with errors: {len(unique_errors)}")
    unique_errors.sort(key=lambda f: (str(f["rel_path"]), f["line"], f["column"]))
    return unique_errors


def merge_problem_files(eslint_files, tsc_files, frontend_root: Path):
    all_map = {}

    for f in eslint_files:
        key = str(Path(f["abs_path"]).resolve())
        all_map[key] = f

    for f in tsc_files:
        key = str(Path(f["abs_path"]).resolve())
        existing = all_map.get(key)
        if existing is None:
            all_map[key] = f
        else:
            if f["severity"] > existing.get("severity", 1):
                all_map[key] = f

    merged = list(all_map.values())
    print(
        f"[run-eslint] Total unique src/ files with problems (ESLint + tsc): {len(merged)}"
    )

    merged.sort(
        key=lambda f: (-f["severity"], str(f["rel_path"]), f["line"], f["column"])
    )
    return merged


def open_files_in_vscode(files, frontend_root: Path):
    if not files:
        print("[run-eslint] No problems found, nothing to open.")
        return

    limited_files = files[:MAX_FILES_TO_OPEN]

    if len(files) > MAX_FILES_TO_OPEN:
        print(
            f"[run-eslint] {len(files)} files with problems found. "
            f"Opening only the first {MAX_FILES_TO_OPEN}."
        )
    else:
        print(
            f"[run-eslint] Opening {len(limited_files)} files with problems in VS Code."
        )

    code_cmd = get_code_command()
    args = [code_cmd, "--reuse-window"]

    for f in limited_files:
        abs_path = Path(f["abs_path"])
        rel = f["rel_path"]
        line = f["line"]
        column = f["column"]
        source = f.get("source", "unknown")

        print(f"[run-eslint] Scheduling open ({source}): {rel}:{line}:{column}")
        args.extend(["-g", f"{abs_path}:{line}:{column}"])

    try:
        result = subprocess.run(
            args,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        print("[run-eslint] Error: VS Code CLI not found when trying to run:")
        print(f"  {code_cmd}")
        print(
            "Make sure the VS Code CLI is installed and available "
            "in your PATH or in the default install location."
        )
        return

    if result.returncode != 0:
        print(f"[run-eslint] VS Code CLI returned exit code {result.returncode}")
        if result.stderr.strip():
            print("---- code stderr ----")
            print(result.stderr)


def main() -> int:
    print("[run-eslint] Starting ESLint + tsc run-and-open script.")
    frontend_root = find_frontend_root()

    eslint_json = run_eslint(frontend_root)
    eslint_files = collect_eslint_files(eslint_json or [], frontend_root)

    tsc_files = run_tsc(frontend_root)

    problem_files = merge_problem_files(eslint_files, tsc_files, frontend_root)
    if not problem_files:
        print("[run-eslint] No src/ files with problems found (ESLint + tsc).")
        return 0

    open_files_in_vscode(problem_files, frontend_root)
    print("[run-eslint] Finished opening files.")
    return 0


if __name__ == "__main__":
    exit_code = main()
    print(f"[run-eslint] Done. Exit code: {exit_code}")
    try:
        input("Press Enter to exit...")
    except EOFError:
        pass
    sys.exit(exit_code)
