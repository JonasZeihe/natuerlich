from pathlib import Path
from urllib.parse import urlparse
from datetime import datetime
import re
import sys
import os


SKIP_DIRS = {
    "node_modules",
    ".next",
    ".git",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".vercel",
    ".vscode",
    ".idea",
    ".husky",
    "out",
}
EXTS = {".js", ".jsx", ".ts", ".tsx"}

FETCH_PATTERN = re.compile(r"\bfetch\s*\(\s*(['\"`])(.+?)\1", re.DOTALL)
AXIOS_PATTERN = re.compile(
    r"\baxios\.(get|post|put|delete|patch|head|options)\s*(<[^>]*>)?\s*\(\s*(['\"`])(.+?)\3",
    re.DOTALL,
)
IMPORT_PATTERN = re.compile(
    r"import\s*{\s*([^}]+)\s*}\s*from\s*['\"]([^'\"]+)['\"]",
    re.MULTILINE,
)
HTTP_FUNC_CANDIDATES = {"get", "post", "put", "delete", "patch", "del", "request"}


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="latin-1", errors="ignore")
    except OSError as exc:
        eprint(f"[WARN] Cannot read {path}: {exc}")
        return ""


def normalize_url(url: str) -> str:
    value = url.strip()
    if not value:
        return ""
    value = re.sub(r"\$\{[^}]*\}", "{var}", value)
    if value.startswith("http://") or value.startswith("https://"):
        parsed = urlparse(value)
        return parsed.path or "/"
    return value


def find_helpers(text: str):
    helpers = set()
    for match in IMPORT_PATTERN.finditer(text):
        names = match.group(1)
        module = match.group(2).lower()
        if "api" not in module and "http" not in module:
            continue
        for entry in names.split(","):
            cleaned = entry.strip()
            if not cleaned:
                continue
            parts = cleaned.split()
            if not parts:
                continue
            name = parts[0]
            if name in HTTP_FUNC_CANDIDATES:
                helpers.add(name)
    return helpers


def get_lines_and_index(text: str):
    lines = text.splitlines()
    index = []
    pos = 0
    for line in lines:
        index.append(pos)
        pos += len(line) + 1
    return lines, index


def offset_to_line(offset: int, index) -> int:
    low = 0
    high = len(index) - 1
    line = 0
    while low <= high:
        mid = (low + high) // 2
        if index[mid] <= offset:
            line = mid
            low = mid + 1
        else:
            high = mid - 1
    return line + 1


def extract_context(lines, line_no: int, radius: int = 6) -> str:
    start = max(1, line_no - radius)
    end = min(len(lines), line_no + radius)
    segment = lines[start - 1 : end]
    return "\n".join(segment)


def scan_frontend(base_root: Path, frontend_root: Path, detailed: bool):
    calls = []
    for root, dirs, files in os.walk(base_root):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for name in files:
            path = Path(root) / name
            if path.suffix not in EXTS:
                continue
            text = read_text(path)
            if not text:
                continue
            rel = str(path.relative_to(frontend_root))
            helpers = find_helpers(text)
            lines, index = get_lines_and_index(text)

            for match in FETCH_PATTERN.finditer(text):
                url = match.group(2)
                norm = normalize_url(url)
                line_no = offset_to_line(match.start(), index)
                context = extract_context(lines, line_no) if detailed else ""
                calls.append(
                    (
                        "FETCH",
                        url,
                        norm,
                        rel,
                        line_no,
                        "fetch",
                        context,
                    )
                )

            for match in AXIOS_PATTERN.finditer(text):
                http_method = match.group(1).upper()
                url = match.group(4)
                norm = normalize_url(url)
                line_no = offset_to_line(match.start(), index)
                context = extract_context(lines, line_no) if detailed else ""
                calls.append(
                    (
                        http_method,
                        url,
                        norm,
                        rel,
                        line_no,
                        "axios",
                        context,
                    )
                )

            if helpers:
                helper_pattern = re.compile(
                    r"\b("
                    + "|".join(re.escape(h) for h in helpers)
                    + r")\s*(<[^>]*>)?\s*\(\s*(['\"`])(.+?)\3",
                    re.DOTALL,
                )
                for match in helper_pattern.finditer(text):
                    helper_name = match.group(1)
                    http_method = helper_name.upper()
                    url = match.group(4)
                    norm = normalize_url(url)
                    line_no = offset_to_line(match.start(), index)
                    context = extract_context(lines, line_no) if detailed else ""
                    calls.append(
                        (
                            http_method,
                            url,
                            norm,
                            rel,
                            line_no,
                            helper_name,
                            context,
                        )
                    )
    return calls


def choose_mode():
    while True:
        eprint("1) endpoint extraction")
        eprint("2) detailed endpoints (with context)")
        eprint("mode (1/2): ", end="", flush=True)
        mode = input().strip()
        if mode in ("1", "2"):
            return mode
        eprint("[WARN] invalid selection")


def write_frontend_chunks(logic_dir: Path, calls, detailed: bool):
    if not calls:
        return []

    timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
    mode_label = "details" if detailed else "endpoints"
    base_name = f"{timestamp}_extract_endpoints_frontend_{mode_label}_"
    max_bytes = 65 * 1024

    by_file = {}
    for (
        http_method,
        url,
        norm,
        rel,
        line_no,
        kind,
        context,
    ) in calls:
        by_file.setdefault(rel, []).append(
            (http_method, url, norm, rel, line_no, kind, context)
        )

    groups = []
    for rel in sorted(by_file):
        entries = sorted(
            by_file[rel],
            key=lambda x: (x[2], x[0], x[4]),
        )
        lines = []
        for http_method, url, norm, _, line_no, kind, context in entries:
            if norm:
                lines.append(
                    f"{http_method:6} {url} -> {norm} [{rel}:{line_no}] ({kind})"
                )
            else:
                lines.append(f"{http_method:6} {url} [{rel}:{line_no}] ({kind})")
            if detailed and context:
                for ctx_line in context.splitlines():
                    lines.append("    " + ctx_line)
                lines.append("")
        if lines:
            group_text = "\n".join(lines) + "\n\n"
            groups.append(group_text)

    if not groups:
        return []

    title = (
        "=== FRONTEND DETAILED API CALLS ==="
        if detailed
        else "=== FRONTEND API CALLS ==="
    )
    header_text = title + "\n\n"
    header_bytes = len(header_text.encode("utf-8"))

    files = []
    current_text = ""
    current_size = 0
    part = 1
    first_in_chunk = True

    for group_text in groups:
        if not current_text:
            current_text = header_text
            current_size = header_bytes
            first_in_chunk = True

        group_bytes = len(group_text.encode("utf-8"))

        if first_in_chunk:
            current_text += group_text
            current_size += group_bytes
            first_in_chunk = False
        else:
            if current_size + group_bytes <= max_bytes:
                current_text += group_text
                current_size += group_bytes
            else:
                out_path = logic_dir / f"{base_name}{part:03d}.txt"
                out_path.write_text(current_text, encoding="utf-8")
                files.append(out_path)
                part += 1
                current_text = header_text + group_text
                current_size = header_bytes + group_bytes
                first_in_chunk = False

    if current_text:
        out_path = logic_dir / f"{base_name}{part:03d}.txt"
        out_path.write_text(current_text, encoding="utf-8")
        files.append(out_path)

    return files


def main():
    script_path = Path(__file__).resolve()
    logic_dir = script_path.parent
    scripts_dir = logic_dir.parent
    frontend_root = scripts_dir.parent
    eprint(f"[INFO] Frontend root: {frontend_root}")
    if not frontend_root.exists():
        eprint("[ERROR] Frontend directory not found")
        return 1
    src_root = frontend_root / "src"
    base_root = src_root if src_root.exists() else frontend_root
    eprint(f"[INFO] Scanning base: {base_root}")
    mode = choose_mode()
    detailed = mode == "2"
    calls = scan_frontend(base_root, frontend_root, detailed)
    print(f"[INFO] API calls found: {len(calls)}")
    if not calls:
        return 0
    files = write_frontend_chunks(logic_dir, calls, detailed)
    print(f"[INFO] Files written: {len(files)}")
    for fpath in files:
        print(f"  {fpath.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
