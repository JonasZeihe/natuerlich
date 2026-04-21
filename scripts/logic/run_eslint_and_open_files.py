#!/usr/bin/env python3

import json
import os
import platform
import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

MAX_FILES_TO_OPEN = 100

IGNORED_TOP_LEVEL_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "out",
    "coverage",
}

LOG_FILE_PATH: Path | None = None


def make_timestamp() -> str:
    return datetime.now().strftime("%Y-%m-%d_%H-%M-%S")


def init_log_file(script_path: Path) -> Path:
    log_path = script_path.parent / f"{make_timestamp()}-diagnostics.txt"
    return log_path


def write_log_line(message: str) -> None:
    global LOG_FILE_PATH

    print(message)
    if LOG_FILE_PATH is None:
        return

    with LOG_FILE_PATH.open("a", encoding="utf-8") as f:
        f.write(message + "\n")


def log(message: str) -> None:
    write_log_line(f"[diagnostics] {message}")


def print_block(title: str, content: str) -> None:
    write_log_line(title)
    if content:
        for line in content.splitlines():
            write_log_line(line)
    else:
        write_log_line("(empty)")


def find_project_root() -> Path:
    script_path = Path(__file__).resolve()
    project_root = script_path.parents[2]
    log(f"Script path: {script_path}")
    log(f"Detected project root: {project_root}")
    return project_root


def get_script_path() -> Path:
    return Path(__file__).resolve()


def get_node_command() -> str:
    return "node.exe" if platform.system().lower().startswith("win") else "node"


def get_npx_command() -> str:
    return "npx.cmd" if platform.system().lower().startswith("win") else "npx"


def get_code_command() -> str:
    system = platform.system().lower()

    if system.startswith("win"):
        local = os.environ.get("LOCALAPPDATA")
        if local:
            candidate = (
                Path(local) / "Programs" / "Microsoft VS Code" / "bin" / "code.cmd"
            )
            if candidate.is_file():
                log(f"Using VS Code CLI: {candidate}")
                return str(candidate)

        log("VS Code CLI not found via LOCALAPPDATA, falling back to 'code'.")
        return "code"

    log("Using 'code' CLI for non-Windows system.")
    return "code"


def is_relevant_file(abs_path: Path, project_root: Path) -> bool:
    try:
        rel_path = abs_path.resolve().relative_to(project_root.resolve())
    except ValueError:
        return False

    if not rel_path.parts:
        return False

    if rel_path.parts[0] in IGNORED_TOP_LEVEL_DIRS:
        return False

    return True


def normalize_path(file_path_str: str, project_root: Path) -> Path:
    raw_path = Path(file_path_str.strip().strip('"').strip("'"))
    if raw_path.is_absolute():
        return raw_path.resolve()
    return (project_root / raw_path).resolve()


def run_command(args: list[str], cwd: Path) -> subprocess.CompletedProcess[str] | None:
    log(f"Running: {' '.join(args)}")
    try:
        result = subprocess.run(
            args,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        log(f"Exit code: {result.returncode}")
        return result
    except FileNotFoundError:
        log(f"Command not found: {args[0]}")
        return None


def run_eslint(project_root: Path) -> list[dict]:
    npx = get_npx_command()
    args = [npx, "eslint", ".", "--format", "json"]

    result = run_command(args, project_root)
    if result is None:
        return []

    if result.stderr.strip():
        print_block("---- ESLint stderr ----", result.stderr)

    if result.returncode not in (0, 1):
        log("ESLint failed in a way that is not a normal lint result.")
        return []

    stdout = (result.stdout or "").strip()
    if not stdout:
        log("ESLint produced no JSON output.")
        return []

    try:
        payload = json.loads(stdout)
    except json.JSONDecodeError:
        log("Could not parse ESLint JSON output.")
        print_block("---- ESLint raw stdout ----", result.stdout)
        return []

    diagnostics: list[dict] = []

    for entry in payload:
        file_path_str = entry.get("filePath")
        if not file_path_str:
            continue

        abs_path = normalize_path(file_path_str, project_root)
        if not is_relevant_file(abs_path, project_root):
            continue

        messages = entry.get("messages", [])
        for msg in messages:
            severity = int(msg.get("severity", 0) or 0)
            fatal = bool(msg.get("fatal", False))

            if severity < 2 and not fatal:
                continue

            diagnostics.append(
                {
                    "tool": "eslint",
                    "abs_path": abs_path,
                    "line": int(msg.get("line", 1) or 1),
                    "column": int(msg.get("column", 1) or 1),
                    "severity": 2 if fatal else severity,
                    "code": msg.get("ruleId") or "fatal",
                    "message": (msg.get("message") or "").strip(),
                }
            )

    log(f"ESLint diagnostics collected: {len(diagnostics)}")
    return diagnostics


def build_typescript_diagnostics_script() -> str:
    return r"""
const path = require("path");
const ts = require("typescript");

const projectRoot = process.argv[2];
const tsconfigPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, "tsconfig.json");

if (!tsconfigPath) {
  console.log(JSON.stringify({
    ok: false,
    error: "tsconfig.json not found",
    diagnostics: []
  }));
  process.exit(0);
}

const readResult = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

if (readResult.error) {
  const message = ts.flattenDiagnosticMessageText(readResult.error.messageText, "\n");
  console.log(JSON.stringify({
    ok: false,
    error: message,
    diagnostics: []
  }));
  process.exit(0);
}

const parsed = ts.parseJsonConfigFileContent(
  readResult.config,
  ts.sys,
  path.dirname(tsconfigPath),
  undefined,
  tsconfigPath
);

const program = ts.createProgram({
  rootNames: parsed.fileNames,
  options: parsed.options,
  projectReferences: parsed.projectReferences
});

const allDiagnostics = ts.getPreEmitDiagnostics(program);

const diagnostics = allDiagnostics.map((diag) => {
  const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
  let fileName = null;
  let line = 1;
  let column = 1;

  if (diag.file && typeof diag.start === "number") {
    const pos = diag.file.getLineAndCharacterOfPosition(diag.start);
    fileName = path.resolve(diag.file.fileName);
    line = pos.line + 1;
    column = pos.character + 1;
  }

  return {
    code: diag.code != null ? `TS${diag.code}` : "TS",
    message,
    category: typeof diag.category === "number" ? diag.category : null,
    filePath: fileName,
    line,
    column
  };
});

console.log(JSON.stringify({
  ok: true,
  tsconfigPath: path.resolve(tsconfigPath),
  diagnostics
}));
""".strip()


def create_typescript_helper_file(script_dir: Path) -> Path:
    helper_path = script_dir / "_typescript_diagnostics_helper.cjs"
    helper_path.write_text(build_typescript_diagnostics_script(), encoding="utf-8")
    return helper_path


def run_typescript_diagnostics(project_root: Path, script_dir: Path) -> list[dict]:
    node_cmd = get_node_command()
    helper_path = create_typescript_helper_file(script_dir)

    try:
        args = [node_cmd, str(helper_path), str(project_root)]
        result = run_command(args, project_root)
        if result is None:
            return []

        if result.stderr.strip():
            print_block("---- TypeScript helper stderr ----", result.stderr)

        stdout = (result.stdout or "").strip()
        if not stdout:
            log("TypeScript helper produced no output.")
            return []

        try:
            payload = json.loads(stdout)
        except json.JSONDecodeError:
            log("Could not parse TypeScript helper JSON output.")
            print_block("---- TypeScript helper raw stdout ----", result.stdout)
            return []

        if not payload.get("ok"):
            log("TypeScript helper reported configuration failure.")
            if payload.get("error"):
                print_block(
                    "---- TypeScript configuration error ----", payload["error"]
                )
            return []

        raw_diagnostics = payload.get("diagnostics", [])
        diagnostics: list[dict] = []

        for diag in raw_diagnostics:
            file_path_str = diag.get("filePath")
            if not file_path_str:
                continue

            abs_path = normalize_path(file_path_str, project_root)
            if not is_relevant_file(abs_path, project_root):
                continue

            diagnostics.append(
                {
                    "tool": "tsc",
                    "abs_path": abs_path,
                    "line": int(diag.get("line", 1) or 1),
                    "column": int(diag.get("column", 1) or 1),
                    "severity": 2,
                    "code": diag.get("code") or "TS",
                    "message": (diag.get("message") or "").strip(),
                }
            )

        log(f"TypeScript diagnostics collected: {len(diagnostics)}")
        return diagnostics
    finally:
        try:
            helper_path.unlink(missing_ok=True)
        except Exception as exc:
            log(f"Could not delete temporary TypeScript helper: {exc}")


def merge_diagnostics(*groups: list[dict]) -> list[dict]:
    merged: list[dict] = []
    seen: set[tuple] = set()

    for group in groups:
        for diag in group:
            key = (
                str(Path(diag["abs_path"]).resolve()).lower(),
                int(diag["line"]),
                int(diag["column"]),
                str(diag["tool"]),
                str(diag["code"]),
                str(diag["message"]),
            )
            if key in seen:
                continue
            seen.add(key)
            merged.append(diag)

    merged.sort(
        key=lambda d: (
            str(d["abs_path"]).lower(),
            d["line"],
            d["column"],
            d["tool"],
            d["code"],
        )
    )
    log(f"Total diagnostics collected: {len(merged)}")
    return merged


def print_diagnostics(diagnostics: list[dict], project_root: Path) -> None:
    if not diagnostics:
        log("No diagnostics found.")
        return

    grouped: dict[str, list[dict]] = defaultdict(list)

    for diag in diagnostics:
        try:
            rel = Path(diag["abs_path"]).resolve().relative_to(project_root.resolve())
            rel_str = str(rel)
        except ValueError:
            rel_str = str(diag["abs_path"])
        grouped[rel_str].append(diag)

    write_log_line("==== Diagnostics ====")
    for rel_path in sorted(grouped.keys(), key=lambda p: p.lower()):
        write_log_line(rel_path)
        for diag in grouped[rel_path]:
            write_log_line(
                f"  [{diag['tool']}] {diag['line']}:{diag['column']} "
                f"{diag['code']} - {diag['message']}"
            )


def files_to_open(diagnostics: list[dict], project_root: Path) -> list[dict]:
    by_file: dict[str, dict] = {}

    for diag in diagnostics:
        abs_path = Path(diag["abs_path"]).resolve()
        if not is_relevant_file(abs_path, project_root):
            continue

        key = str(abs_path).lower()
        current = by_file.get(key)

        if current is None:
            by_file[key] = diag
            continue

        current_rank = (
            current["severity"],
            -current["line"],
            -current["column"],
        )
        new_rank = (
            diag["severity"],
            -diag["line"],
            -diag["column"],
        )

        if new_rank > current_rank:
            by_file[key] = diag

    selected = list(by_file.values())
    selected.sort(
        key=lambda d: (
            -d["severity"],
            str(d["abs_path"]).lower(),
            d["line"],
            d["column"],
        )
    )

    log(f"Unique files to open: {len(selected)}")
    return selected


def open_files_in_vscode(file_entries: list[dict]) -> None:
    if not file_entries:
        log("Nothing to open in VS Code.")
        return

    limited = file_entries[:MAX_FILES_TO_OPEN]

    if len(file_entries) > MAX_FILES_TO_OPEN:
        log(
            f"{len(file_entries)} files have diagnostics. "
            f"Opening first {MAX_FILES_TO_OPEN}."
        )
    else:
        log(f"Opening {len(limited)} files in VS Code.")

    code_cmd = get_code_command()
    args = [code_cmd, "--reuse-window"]

    for entry in limited:
        abs_path = Path(entry["abs_path"]).resolve()
        line = int(entry["line"])
        column = int(entry["column"])

        log(f"Open: {abs_path} @ {line}:{column} ({entry['tool']} {entry['code']})")
        args.extend(["-g", f"{abs_path}:{line}:{column}"])

    try:
        result = subprocess.run(
            args,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
    except FileNotFoundError:
        log("VS Code CLI not found.")
        write_log_line(f"Tried command: {code_cmd}")
        return

    if result.returncode != 0:
        log(f"VS Code CLI returned exit code {result.returncode}")
        if result.stderr.strip():
            print_block("---- VS Code stderr ----", result.stderr)


def main() -> int:
    global LOG_FILE_PATH

    script_path = get_script_path()
    LOG_FILE_PATH = init_log_file(script_path)

    log("Starting diagnostics run.")
    log(f"Log file: {LOG_FILE_PATH}")

    project_root = find_project_root()
    script_dir = script_path.parent

    eslint_diagnostics = run_eslint(project_root)
    tsc_diagnostics = run_typescript_diagnostics(project_root, script_dir)

    diagnostics = merge_diagnostics(eslint_diagnostics, tsc_diagnostics)

    if not diagnostics:
        log("No relevant diagnostics found.")
        return 0

    print_diagnostics(diagnostics, project_root)

    open_targets = files_to_open(diagnostics, project_root)
    open_files_in_vscode(open_targets)

    log("Finished.")
    return 1


if __name__ == "__main__":
    exit_code = main()
    log(f"Done. Exit code: {exit_code}")
    try:
        input("Press Enter to exit...")
    except EOFError:
        pass
    sys.exit(exit_code)
