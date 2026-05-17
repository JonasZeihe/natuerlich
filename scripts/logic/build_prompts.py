#!/usr/bin/env python3
import datetime
import pathlib
import shlex
import sys
from dataclasses import dataclass
from typing import List, Optional


@dataclass(frozen=True)
class PromptBlock:
    title: str
    content: str


@dataclass(frozen=True)
class PromptSystem:
    title: str
    intro: str
    prompts: List[PromptBlock]
    outro: str


def supports_color() -> bool:
    return sys.stdout.isatty()


B = "\033[1m" if supports_color() else ""
OK = "\033[32m" if supports_color() else ""
ERR = "\033[31m" if supports_color() else ""
CY = "\033[36m" if supports_color() else ""
RST = "\033[0m" if supports_color() else ""


def hr() -> str:
    return "-" * 62


def banner(out_dir: pathlib.Path) -> None:
    print()
    print(f"{B}Prompt Builder - Markdown tool{RST}")
    print(hr())
    print("Drag & drop a markdown prompt file into this window, then press Enter.")
    print(f"Outputs will be written to: {CY}{out_dir}{RST}")
    print(hr())
    print("Expected sections:")
    print("## Intro Prompt")
    print("## Prompts")
    print("### Prompt name")
    print("## Outro Prompt")
    print()


def parse_dropped_paths(line: str) -> List[pathlib.Path]:
    return [
        pathlib.Path(part).expanduser()
        for part in shlex.split(line, posix=False)
        if part
    ]


def collect_markdown_files(paths: List[pathlib.Path]) -> List[pathlib.Path]:
    files: List[pathlib.Path] = []

    for path in paths:
        if path.is_dir():
            files.extend(sorted(path.glob("*.md")))
            files.extend(sorted(path.glob("*.MD")))
        elif path.is_file() and path.suffix.lower() == ".md":
            files.append(path)

    seen = set()
    unique_files: List[pathlib.Path] = []

    for file in files:
        resolved = file.resolve()

        if resolved in seen:
            continue

        seen.add(resolved)
        unique_files.append(file)

    return unique_files


def section_content(text: str, heading: str) -> Optional[str]:
    lines = text.splitlines()
    start = None
    end = None
    target = heading.strip().lower()

    for index, line in enumerate(lines):
        if line.strip().lower() == target:
            start = index + 1
            break

    if start is None:
        return None

    for index in range(start, len(lines)):
        line = lines[index].strip()

        if line.startswith("## "):
            end = index
            break

    if end is None:
        end = len(lines)

    return "\n".join(lines[start:end]).strip()


def first_h1(text: str, fallback: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()

        if stripped.startswith("# "):
            return stripped[2:].strip()

    return fallback


def parse_prompt_blocks(prompts_text: str) -> List[PromptBlock]:
    lines = prompts_text.splitlines()
    blocks: List[PromptBlock] = []
    current_title: Optional[str] = None
    current_lines: List[str] = []

    def flush() -> None:
        nonlocal current_title, current_lines

        if current_title is None:
            return

        content = "\n".join(current_lines).strip()

        if content:
            blocks.append(PromptBlock(title=current_title, content=content))

        current_title = None
        current_lines = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("### "):
            flush()
            current_title = stripped[4:].strip()
            continue

        if current_title is not None:
            current_lines.append(line)

    flush()

    return blocks


def parse_prompt_system(path: pathlib.Path) -> PromptSystem:
    text = path.read_text(encoding="utf-8-sig")
    title = first_h1(text, path.stem)

    intro = section_content(text, "## Intro Prompt")
    prompts_text = section_content(text, "## Prompts")
    outro = section_content(text, "## Outro Prompt")

    missing = []

    if intro is None:
        missing.append("## Intro Prompt")

    if prompts_text is None:
        missing.append("## Prompts")

    if outro is None:
        missing.append("## Outro Prompt")

    if missing:
        joined = ", ".join(missing)
        raise ValueError(f"Missing required section(s): {joined}")

    prompts = parse_prompt_blocks(prompts_text or "")

    if not prompts:
        raise ValueError("No prompt blocks found below ## Prompts")

    return PromptSystem(
        title=title,
        intro=intro or "",
        prompts=prompts,
        outro=outro or "",
    )


def strip_code_fence(value: str) -> str:
    lines = value.strip().splitlines()

    if lines and lines[0].strip().startswith("```"):
        lines = lines[1:]

    if lines and lines[-1].strip() == "```":
        lines = lines[:-1]

    return "\n".join(lines).strip()


def safe_filename(value: str) -> str:
    cleaned = []

    for char in value.lower().strip():
        if char.isalnum():
            cleaned.append(char)
        elif char in {" ", "-", "_"}:
            cleaned.append("_")

    name = "".join(cleaned)

    while "__" in name:
        name = name.replace("__", "_")

    return name.strip("_") or "prompts"


def next_available_path(base: pathlib.Path) -> pathlib.Path:
    if not base.exists():
        return base

    stem = base.stem
    suffix = base.suffix
    parent = base.parent
    index = 1

    while True:
        candidate = parent / f"{stem}({index}){suffix}"

        if not candidate.exists():
            return candidate

        index += 1


def build_output(system: PromptSystem) -> str:
    lines = [
        f"# Fertige Prompts · {system.title}",
        "",
    ]

    intro = strip_code_fence(system.intro)
    outro = strip_code_fence(system.outro)

    for block in system.prompts:
        prompt = strip_code_fence(block.content)

        merged_prompt = "\n\n".join(
            part for part in [intro, prompt, outro] if part.strip()
        )

        lines.extend(
            [
                f"## {block.title}",
                "",
                "```text",
                merged_prompt,
                "```",
                "",
                "---",
                "",
            ]
        )

    return "\n".join(lines).rstrip() + "\n"


def process_file(path: pathlib.Path, out_dir: pathlib.Path) -> pathlib.Path:
    system = parse_prompt_system(path)
    out_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
    filename = f"{safe_filename(system.title)}_fertige_prompts_{timestamp}.md"
    out_path = next_available_path(out_dir / filename)

    out_path.write_text(build_output(system), encoding="utf-8")

    return out_path


def ask_yes_no(prompt: str, default_no: bool = True) -> bool:
    suffix = " [y/N]: " if default_no else " [Y/n]: "

    while True:
        answer = input(prompt + suffix).strip().lower()

        if not answer:
            return not default_no

        if answer in {"y", "yes"}:
            return True

        if answer in {"n", "no"}:
            return False


def run_once(files: List[pathlib.Path], out_dir: pathlib.Path) -> None:
    for file in files:
        try:
            out_path = process_file(file, out_dir)
            print(f"{OK}OK{RST} {file.name} -> {out_path.name}")
        except Exception as error:
            print(f"{ERR}ERROR{RST} {file} - {error}")

    print()
    print(f"Output directory: {CY}{out_dir.resolve()}{RST}")
    print()


def main() -> None:
    cwd = pathlib.Path.cwd()
    out_dir = cwd / "output"

    banner(out_dir)

    initial_args = [pathlib.Path(arg) for arg in sys.argv[1:] if arg.strip()]

    if initial_args:
        files = collect_markdown_files(initial_args)
        run_once(files, out_dir)
        return

    while True:
        line = input(
            f"{B}> Drop markdown file or folder here, then press Enter "
            f"(or just Enter to quit):{RST}\n"
        ).strip()

        if not line:
            print("Bye.")
            return

        paths = parse_dropped_paths(line)
        files = collect_markdown_files(paths)

        if not files:
            print("No markdown files detected. Try again.\n")
            continue

        run_once(files, out_dir)

        if ask_yes_no("Process more files?", default_no=True):
            continue

        break


if __name__ == "__main__":
    main()
