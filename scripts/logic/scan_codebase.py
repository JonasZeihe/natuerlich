import datetime
import fnmatch
import os
import platform
import re
import subprocess
import sys

PROJECT_ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "out",
    "coverage",
    ".turbo",
    ".cache",
}

LOCKFILES = {"package-lock.json", "yarn.lock", "pnpm-lock.yaml"}
CONFIG_NAME_PATTERNS = [
    "package.json",
    "tsconfig*.json",
    "jsconfig*.json",
    "next.config.*",
    "vite.config.*",
    "webpack.config.*",
    "rollup.config.*",
    "babel.config.*",
    "postcss.config.*",
    "tailwind.config.*",
    "tsup.config.*",
    "esbuild.*",
    ".eslintrc*",
    "eslint.config.*",
    ".prettierrc*",
    "prettier.config.*",
    ".stylelintrc*",
    "stylelint.config.*",
    ".editorconfig",
    ".npmrc",
    ".nvmrc",
    ".node-version",
    ".browserslistrc",
    ".commitlintrc*",
    "commitlint.config.*",
    ".lintstagedrc*",
    "lint-staged.config.*",
    "renovate.*",
    ".renovaterc*",
    "dependabot.yml",
    "turbo.json",
    "nx.json",
    "pnpm-workspace.yaml",
    "Dockerfile*",
    "docker-compose.*",
    "Makefile",
]
CONFIG_PATH_PATTERNS = [
    ".github/workflows/*.yml",
    ".github/workflows/*.yaml",
    ".husky/*",
    ".gitlab-ci.yml",
    "azure-pipelines.yml",
]

SOFT_LIMIT = 70 * 1024
HARD_LIMIT = 80 * 1024
BLOCK_SEP = "\n\n"

MAX_FILES_TO_OPEN = 50

BINARY_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".ico",
    ".svgz",
    ".pdf",
    ".zip",
    ".gz",
    ".bz2",
    ".xz",
    ".7z",
    ".rar",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".wasm",
    ".webp",
}

EXT_CANDIDATES = [
    ".ts",
    ".tsx",
    ".mts",
    ".cts",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
]


def utf8_len(s):
    return len(s.encode("utf-8"))


def block_bytes(text):
    return utf8_len(text + BLOCK_SEP)


def normalize_rel(rel_path):
    return rel_path.replace("\\", "/")


def is_binary_path(path):
    lower = path.lower()
    for ext in BINARY_EXTS:
        if lower.endswith(ext):
            return True
    return False


def build_tree(path, prefix=""):
    entries = sorted([e for e in os.listdir(path) if e not in IGNORE_DIRS])
    tree_lines = []
    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        tree_lines.append(f"{prefix}{connector}{entry}")
        if os.path.isdir(full_path):
            extension = "    " if index == len(entries) - 1 else "│   "
            tree_lines.extend(build_tree(full_path, prefix + extension))
    return tree_lines


def resolve_path_query(base_path, q):
    norm = q.strip().replace("\\", "/").strip("/")
    if not norm:
        return None
    parts = [p for p in norm.split("/") if p and p != "."]
    if not parts:
        return None
    if parts and parts[0].lower() == "src":
        parts = parts[1:]
    candidate = os.path.join(base_path, *parts)
    if os.path.isdir(candidate):
        return candidate
    return None


def find_directory_by_name(base_path, target_name):
    if target_name == "src":
        return base_path
    for root, dirs, _ in os.walk(base_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for d in dirs:
            if d == target_name:
                return os.path.join(root, d)
    return None


def read_text_lines(abs_path):
    try:
        with open(abs_path, "r", encoding="utf-8") as f:
            return f.read().splitlines(), None
    except Exception as e:
        return [f"<< Error reading file: {e} >>"], str(e)


def read_file_text(abs_path):
    try:
        with open(abs_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return ""


def split_large_file(lines, rel_path):
    blocks = []
    start = 0
    n = len(lines)
    while start < n:
        header = f"// --- {rel_path} ---"
        end = start
        last_blank = None
        while end < n:
            if (
                block_bytes(header + "\n" + "\n".join(lines[start : end + 1]))
                > HARD_LIMIT
            ):
                break
            if not lines[end].strip():
                last_blank = end
            end += 1
        if end == start:
            end = min(start + 1, n)
        elif last_blank is not None and last_blank >= start + 1:
            end = last_blank + 1
        blocks.append({"file": rel_path, "lines": (start + 1, end)})
        start = end

    total = len(blocks)
    normalized = []
    for i, b in enumerate(blocks, start=1):
        a, e = b["lines"]
        tag = f"// --- {rel_path} [part {i}/{total}, lines {a}–{e}] ---"
        text = "\n".join([tag] + lines[a - 1 : e])
        normalized.append(
            {"file": rel_path, "header": tag, "text": text, "bytes": block_bytes(text)}
        )
    return normalized


def iter_src_files():
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for fname in sorted(files):
            abs_path = os.path.join(root, fname)
            rel_path = normalize_rel(os.path.relpath(abs_path, SRC_DIR))
            yield rel_path, abs_path


def build_src_tree_blocks():
    label = "src"
    lines = [f"{label}/"] + build_tree(SRC_DIR, prefix="│   ")
    rel_path = "PROJECT TREE (src)"
    header = f"// --- {rel_path} ---"
    full_text = "\n".join([header] + lines)

    if block_bytes(full_text) <= HARD_LIMIT:
        return [
            {
                "file": rel_path,
                "header": header,
                "text": full_text,
                "bytes": block_bytes(full_text),
            }
        ]

    return split_large_file(lines, rel_path)


def collect_blocks_under_dir(dir_path):
    blocks = []
    for root, dirs, files in os.walk(dir_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for fname in sorted(files):
            abs_path = os.path.join(root, fname)
            rel_path = normalize_rel(os.path.relpath(abs_path, SRC_DIR))
            if is_binary_path(rel_path):
                continue
            lines, err = read_text_lines(abs_path)
            header = f"// --- {rel_path} ---"
            full_text = (
                "\n".join([header] + lines)
                if not err
                else "\n".join([header, lines[0]])
            )
            if block_bytes(full_text) <= HARD_LIMIT:
                blocks.append(
                    {
                        "file": rel_path,
                        "header": header,
                        "text": full_text,
                        "bytes": block_bytes(full_text),
                    }
                )
            else:
                blocks.extend(split_large_file(lines, rel_path))
    blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def collect_blocks_by_types(extensions):
    exts = {e.lower() if e.startswith(".") else f".{e.lower()}" for e in extensions}
    blocks = []
    for rel_path, abs_path in iter_src_files():
        if is_binary_path(rel_path):
            continue
        name_lower = os.path.basename(rel_path).lower()
        if not any(name_lower.endswith(ext) for ext in exts):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel_path} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel_path,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel_path))
    blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def is_env_example(name):
    n = name.lower()
    if not n.startswith(".env"):
        return False
    return any(k in n for k in ("example", "sample", "template"))


def collect_config_blocks(project_root):
    blocks = []
    ignore_dirs_cfg = set(IGNORE_DIRS) | {"scripts", "public"}
    for root, dirs, files in os.walk(project_root):
        dirs[:] = [d for d in dirs if d not in ignore_dirs_cfg]
        rel_root = os.path.relpath(root, project_root).replace("\\", "/")
        for fname in sorted(files):
            if fname in LOCKFILES:
                continue
            if fname.lower().startswith(".env") and not is_env_example(fname):
                continue
            rel_path = (
                os.path.normpath(os.path.join(rel_root, fname))
                .lstrip("./")
                .replace("\\", "/")
            )
            name_match = any(
                fnmatch.fnmatch(fname, pat) for pat in CONFIG_NAME_PATTERNS
            )
            path_match = any(
                fnmatch.fnmatch(rel_path, pat) for pat in CONFIG_PATH_PATTERNS
            )
            if not (name_match or path_match):
                continue
            if is_binary_path(rel_path):
                continue
            abs_path = os.path.join(root, fname)
            lines, err = read_text_lines(abs_path)
            header = f"// --- {rel_path} ---"
            full_text = (
                "\n".join([header] + lines)
                if not err
                else "\n".join([header, lines[0]])
            )
            if block_bytes(full_text) <= HARD_LIMIT:
                blocks.append(
                    {
                        "file": rel_path,
                        "header": header,
                        "text": full_text,
                        "bytes": block_bytes(full_text),
                    }
                )
            else:
                blocks.extend(split_large_file(lines, rel_path))
    blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def is_type_query(q):
    return q.startswith(".") or any(
        part.startswith(".") for part in q.replace(" ", "").split(",")
    )


def parse_extensions(q):
    parts = [p.strip() for p in q.split(",") if p.strip()]
    norm = []
    for p in parts:
        norm.append(p if p.startswith(".") else f".{p}")
    return norm


def tokenize_commalist(q):
    if "," not in q:
        return None
    tokens = [t.strip() for t in q.split(",")]
    tokens = [t for t in tokens if t]
    if not tokens:
        return None
    ext_like = all(t.startswith(".") and len(t) > 1 for t in tokens)
    if ext_like:
        return None
    plaus = any(
        "/" in t
        or "\\" in t
        or (("." in os.path.basename(t)) and not os.path.basename(t).startswith("."))
        for t in tokens
    )
    if not plaus:
        return None
    return tokens


def list_all_src_paths():
    paths = []
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            rel = normalize_rel(os.path.relpath(os.path.join(root, f), SRC_DIR))
            paths.append(rel)
    paths.sort(key=lambda p: p.lower())
    return paths


def resolve_single_file(token, all_paths):
    t = token.strip().replace("\\", "/")
    if t.lower().startswith("src/"):
        cand = t[4:]
        if cand in all_paths:
            return cand, None
        return None, f"not-found: {token}"
    if "/" in t:
        if t in all_paths:
            return t, None
        return None, f"not-found: {token}"
    base = os.path.basename(t)
    matches = [p for p in all_paths if p.split("/")[-1] == base]
    if not matches:
        return None, f"not-found: {token}"
    if len(matches) > 1:
        return matches[0], f"ambiguous:{len(matches)}:{base}"
    return matches[0], None


def collect_blocks_for_paths(paths, preserve_order=False):
    blocks = []
    for rel in paths:
        abs_path = os.path.join(SRC_DIR, rel)
        if is_binary_path(rel):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel))
    if not preserve_order:
        blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def collect_selected_blocks(tokens):
    all_paths = list_all_src_paths()
    ordered = []
    notices = []
    for tok in tokens:
        rel, err = resolve_single_file(tok, all_paths)
        if rel:
            ordered.append(rel)
            if err and err.startswith("ambiguous"):
                notices.append(f"⚠️ {tok} -> {rel} ({err})")
        else:
            notices.append(f"⚠️ {err}")
    blocks = collect_blocks_for_paths(ordered, preserve_order=True)
    return blocks, notices, ordered


def is_single_basename_query(q):
    if "," in q:
        return None
    if "/" in q or "\\" in q:
        return None
    name = q.strip()
    if not name:
        return None
    if name.startswith(".") and name.count(".") == 1:
        return None
    if "." not in os.path.basename(name):
        return None
    return os.path.basename(name)


def find_paths_by_basename(basename):
    matches = []
    for root, dirs, files in os.walk(SRC_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            if f == basename:
                rel = normalize_rel(os.path.relpath(os.path.join(root, f), SRC_DIR))
                matches.append(rel)
    matches.sort(key=lambda p: p.lower())
    return matches


def try_resolve_with_exts(rel_path_candidate, all_paths_set):
    if rel_path_candidate in all_paths_set:
        return rel_path_candidate
    for ext in EXT_CANDIDATES:
        p = rel_path_candidate + ext
        if p in all_paths_set:
            return p
    for ext in EXT_CANDIDATES:
        p = rel_path_candidate.rstrip("/") + "/index" + ext
        if p in all_paths_set:
            return p
    return None


def parse_import_specs(text):
    specs = []
    for m in re.finditer(
        r"(?m)^\s*import\s+[^'\"\n;]*\sfrom\s+['\"]([^'\"\n]+)['\"]", text
    ):
        specs.append(m.group(1))
    for m in re.finditer(r"(?m)^\s*import\s+['\"]([^'\"\n]+)['\"]", text):
        specs.append(m.group(1))
    for m in re.finditer(
        r"(?m)^\s*export\s+[^'\"\n;]*\sfrom\s+['\"]([^'\"\n]+)['\"]", text
    ):
        specs.append(m.group(1))
    for m in re.finditer(r"require\(\s*['\"]([^'\"\n]+)['\"]\s*\)", text):
        specs.append(m.group(1))
    for m in re.finditer(r"import\(\s*['\"]([^'\"\n]+)['\"]\s*\)", text):
        specs.append(m.group(1))
    return specs


def resolve_import_to_rel(from_rel, spec, all_paths_set):
    if spec.startswith("."):
        base_abs = os.path.join(SRC_DIR, os.path.dirname(from_rel))
        target = os.path.normpath(os.path.join(base_abs, spec)).replace("\\", "/")
        rel_try = normalize_rel(os.path.relpath(target, SRC_DIR))
        resolved = try_resolve_with_exts(rel_try, all_paths_set)
        if resolved:
            return resolved
        return None
    if spec.startswith("@/"):
        rel_try = spec[2:].lstrip("/")
        resolved = try_resolve_with_exts(rel_try, all_paths_set)
        if resolved:
            return resolved
        return None
    if spec.startswith("~/"):
        rel_try = spec[2:].lstrip("/")
        resolved = try_resolve_with_exts(rel_try, all_paths_set)
        if resolved:
            return resolved
        return None
    return None


def build_import_indexes():
    all_paths = list_all_src_paths()
    all_set = set(all_paths)
    imports = {p: set() for p in all_paths}
    for rel in all_paths:
        if is_binary_path(rel):
            continue
        abs_path = os.path.join(SRC_DIR, rel)
        txt = read_file_text(abs_path)
        specs = parse_import_specs(txt)
        for spec in specs:
            resolved = resolve_import_to_rel(rel, spec, all_set)
            if resolved:
                imports[rel].add(resolved)
    importers = {p: set() for p in all_paths}
    for a, outs in imports.items():
        for b in outs:
            importers[b].add(a)
    return imports, importers, all_paths


def trace_closure(start_rel, importers):
    seen = set()
    queue = [start_rel]
    ordered = []
    while queue:
        cur = queue.pop(0)
        if cur in seen:
            continue
        seen.add(cur)
        ordered.append(cur)
        for prv in sorted(importers.get(cur, ()), key=str.lower):
            if prv not in seen:
                queue.append(prv)
    return ordered


def get_code_command():
    system = platform.system().lower()
    if system.startswith("win"):
        local = os.environ.get("LOCALAPPDATA")
        if local:
            candidate = os.path.join(
                local, "Programs", "Microsoft VS Code", "bin", "code.cmd"
            )
            if os.path.isfile(candidate):
                return candidate
        return "code"
    return "code"


def open_paths_in_vscode(abs_paths):
    if not abs_paths:
        return
    limited = abs_paths[:MAX_FILES_TO_OPEN]
    if len(abs_paths) > MAX_FILES_TO_OPEN:
        print(
            f"⚠️ {len(abs_paths)} files selected. Opening only the first {MAX_FILES_TO_OPEN}."
        )
    code_cmd = get_code_command()
    args = [code_cmd, "--reuse-window"]
    for p in limited:
        args.extend(["-g", f"{p}:1:1"])
    try:
        result = subprocess.run(args, capture_output=True, text=True)
    except FileNotFoundError:
        print("❌ VS Code CLI not found. Install 'code' CLI or ensure it's on PATH.")
        return
    if result.returncode != 0:
        print(f"❌ VS Code CLI returned exit code {result.returncode}")
        if result.stderr.strip():
            print(result.stderr)


def prompt_yes_no(prompt, default_no=True):
    suffix = " [y/N] " if default_no else " [Y/n] "
    raw = input(prompt + suffix).strip().lower()
    if not raw:
        return not default_no
    return raw in {"y", "yes"}


def plan_split_parts(blocks):
    parts = []
    current = []
    current_bytes = 0

    for b in blocks:
        if current_bytes and current_bytes + b["bytes"] > SOFT_LIMIT:
            parts.append(current)
            current = []
            current_bytes = 0
        if current_bytes and current_bytes + b["bytes"] > HARD_LIMIT:
            parts.append(current)
            current = []
            current_bytes = 0
        if not current and b["bytes"] > HARD_LIMIT:
            parts.append([b])
            continue
        current.append(b)
        current_bytes += b["bytes"]

    if current:
        parts.append(current)

    return parts


def choose_output_mode_if_needed(blocks):
    parts = plan_split_parts(blocks)
    if len(parts) <= 1:
        return "split"
    choice = (
        input(
            f"\n📦 Output would be {len(parts)} files. Split or merge into one file? [S/m] "
        )
        .strip()
        .lower()
    )
    if choice in {"m", "merge"}:
        return "merge"
    return "split"


def unique_output_path(name):
    base, ext = os.path.splitext(name)
    out_path = os.path.join(OUTPUT_DIR, name)
    if not os.path.exists(out_path):
        return out_path
    index = 1
    while True:
        candidate = os.path.join(OUTPUT_DIR, f"{base}-{index}{ext}")
        if not os.path.exists(candidate):
            return candidate
        index += 1


def write_output(blocks, label_prefix, base_name_prefix=None, allow_merge_prompt=True):
    if not blocks:
        print("⚠️ No files.")
        return []

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    mode = choose_output_mode_if_needed(blocks) if allow_merge_prompt else "split"

    if mode == "merge":
        payload = BLOCK_SEP.join([b["text"] for b in blocks])
        name = (
            f"{timestamp}-{label_prefix}-merged.txt"
            if not base_name_prefix
            else f"{timestamp}-{base_name_prefix}-merged.txt"
        )
        out_path = unique_output_path(name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"✅ Wrote {out_path}")
        return [out_path]

    parts = plan_split_parts(blocks)
    written_paths = []
    total = len(parts)

    for idx, group in enumerate(parts, start=1):
        payload = BLOCK_SEP.join([b["text"] for b in group])
        if base_name_prefix and total == 1:
            name = f"{timestamp}-{base_name_prefix}.txt"
        else:
            name = (
                f"{timestamp}-{label_prefix}-part-{idx:03d}.txt"
                if not base_name_prefix
                else f"{timestamp}-{base_name_prefix}-part-{idx:03d}.txt"
            )
        out_path = unique_output_path(name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"✅ Wrote {out_path}")
        written_paths.append(out_path)

    return written_paths


def write_selected_files(tokens):
    blocks, notices, ordered = collect_selected_blocks(tokens)
    for n in notices:
        print(n)
    if not blocks:
        print("⚠️ No matching files.")
        return
    print("\n📄 Concatenating selected files...\n")
    for b in blocks:
        print(f" - {b['header'].splitlines()[0]}")
    write_output(blocks, "files", base_name_prefix="files", allow_merge_prompt=True)
    if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
        abs_paths = [os.path.join(SRC_DIR, p) for p in ordered if not is_binary_path(p)]
        open_paths_in_vscode(abs_paths)
    print("\n✅ Done\n")


def write_found_by_basename(basename):
    paths = find_paths_by_basename(basename)
    if not paths:
        print(f"⚠️ No files named '{basename}' under src.")
        return
    blocks = collect_blocks_for_paths(paths, preserve_order=False)
    if not blocks:
        print("⚠️ No matching files.")
        return
    print(f"\n📄 Searching for '{basename}' under src ...\n")
    for rel in paths:
        print(f" - {rel}")
    write_output(
        blocks,
        f"find-{basename}",
        base_name_prefix=f"find-{basename}",
        allow_merge_prompt=True,
    )
    if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
        abs_paths = [os.path.join(SRC_DIR, p) for p in paths if not is_binary_path(p)]
        open_paths_in_vscode(abs_paths)
    print(f"\n✅ Found {len(paths)} file(s) for '{basename}'\n")


def write_trace(paths, label):
    blocks = collect_blocks_for_paths(paths, preserve_order=True)
    if not blocks:
        print("⚠️ No files in trace.")
        return
    print("\n📄 Building import trace...\n")
    for b in blocks:
        print(f" - {b['header'].splitlines()[0]}")
    write_output(
        blocks,
        f"trace-{label}",
        base_name_prefix=f"trace-{label}",
        allow_merge_prompt=True,
    )
    if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
        abs_paths = [os.path.join(SRC_DIR, p) for p in paths if not is_binary_path(p)]
        open_paths_in_vscode(abs_paths)
    print("\n✅ Trace done\n")


def run_trace_command(arg):
    arg = arg.strip()
    if not arg:
        print("⚠️ Usage: trace <filename or src path>")
        return
    _, importers, all_paths = build_import_indexes()
    rel, err = resolve_single_file(arg, all_paths)
    if not rel:
        print(f"❌ Start file not found: {arg}")
        return
    if err and err.startswith("ambiguous"):
        print(f"⚠️ {arg} -> {rel} ({err})")
    chain = trace_closure(rel, importers)
    if not chain:
        print("⚠️ Nothing to trace.")
        return
    label = os.path.basename(rel)
    write_trace(chain, label)


def collect_codebase_blocks():
    blocks = []
    for rel_path, abs_path in iter_src_files():
        if is_binary_path(rel_path):
            continue
        lines, err = read_text_lines(abs_path)
        header = f"// --- {rel_path} ---"
        full_text = (
            "\n".join([header] + lines) if not err else "\n".join([header, lines[0]])
        )
        if block_bytes(full_text) <= HARD_LIMIT:
            blocks.append(
                {
                    "file": rel_path,
                    "header": header,
                    "text": full_text,
                    "bytes": block_bytes(full_text),
                }
            )
        else:
            blocks.extend(split_large_file(lines, rel_path))
    blocks.sort(key=lambda b: b["file"].lower())
    return blocks


def write_codebase_parts():
    blocks = collect_codebase_blocks()
    if not blocks:
        print("⚠️ No files in src.")
        return
    print("\n📄 Scanning entire src as codebase...\n")
    for b in blocks:
        print(f" - {b['header'].splitlines()[0]}")
    write_output(
        blocks, "codebase", base_name_prefix="codebase", allow_merge_prompt=True
    )
    if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
        abs_paths = [
            os.path.join(SRC_DIR, p)
            for p in list_all_src_paths()
            if not is_binary_path(p)
        ]
        open_paths_in_vscode(abs_paths)
    print("\n✅ Done\n")


def main():
    if not os.path.exists(SRC_DIR):
        print(f"❌ Source directory not found: {SRC_DIR}")
        sys.exit(1)

    print("📁 Project structure under:\n")
    print("src/")
    tree = build_tree(SRC_DIR, prefix="│   ")
    for line in tree:
        print(line)

    while True:
        q = input(
            "\n🔍 Enter folder name, file types (.js,.ts,...) or 'config', 'codebase', 'trace <file>' (or 'exit')\n"
            "    ➤ Path queries are supported, e.g. 'src/components', 'components/forms'\n> "
        ).strip()

        if q.lower() == "exit":
            break

        if q.lower().startswith("trace "):
            run_trace_command(q[6:])
            continue

        if q.lower() == "config":
            print("\n📄 Scanning repository configs...\n")
            tree_blocks = build_src_tree_blocks()
            config_blocks = collect_config_blocks(PROJECT_ROOT)
            blocks = tree_blocks + config_blocks
            if not blocks:
                print("⚠️ No config files found.")
                continue
            write_output(
                blocks, "configs", base_name_prefix="configs", allow_merge_prompt=True
            )
            print("\n✅ Done\n")
            continue

        if q.lower() == "codebase":
            write_codebase_parts()
            continue

        tokens = tokenize_commalist(q)
        if tokens:
            write_selected_files(tokens)
            continue

        basename = is_single_basename_query(q)
        if basename:
            write_found_by_basename(basename)
            continue

        if is_type_query(q):
            exts = parse_extensions(q)
            print(f"\n📄 Scanning by types {', '.join(exts)}...\n")
            blocks = collect_blocks_by_types(exts)
            if not blocks:
                print("⚠️ No matching files found.")
                continue
            label = "types-" + "-".join(
                e.lstrip(".").replace("*", "star") for e in exts
            )
            for b in blocks:
                print(f" - {b['header'].splitlines()[0]}")
            write_output(blocks, label, base_name_prefix=label, allow_merge_prompt=True)
            if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
                paths = [
                    b["file"]
                    for b in blocks
                    if b["file"].startswith(("",)) and "/" in b["file"]
                ]
                uniq = []
                seen = set()
                for p in paths:
                    if p in seen:
                        continue
                    seen.add(p)
                    uniq.append(p)
                abs_paths = [
                    os.path.join(SRC_DIR, p) for p in uniq if not is_binary_path(p)
                ]
                open_paths_in_vscode(abs_paths)
            print("\n✅ Done\n")
            continue

        target_path = resolve_path_query(SRC_DIR, q)
        if not target_path:
            target_path = find_directory_by_name(SRC_DIR, q)
        if not target_path:
            print(f"⚠️ Folder '{q}' not found. Try again with a more specific path.")
            continue

        rel_label = os.path.relpath(target_path, SRC_DIR).replace(os.sep, "_")
        print(
            f"\n📄 Scanning files under '{os.path.relpath(target_path, SRC_DIR)}'...\n"
        )
        blocks = collect_blocks_under_dir(target_path)
        if not blocks:
            print("⚠️ No files found in this folder.")
            continue
        for b in blocks:
            print(f" - {b['header'].splitlines()[0]}")
        write_output(
            blocks, rel_label, base_name_prefix=rel_label, allow_merge_prompt=True
        )
        if prompt_yes_no("🧠 Open these files in VS Code?", default_no=True):
            files = []
            seen = set()
            for b in blocks:
                f = b["file"]
                if f in seen:
                    continue
                seen.add(f)
                files.append(f)
            abs_paths = [
                os.path.join(SRC_DIR, p) for p in files if not is_binary_path(p)
            ]
            open_paths_in_vscode(abs_paths)
        print("\n✅ Done\n")


if __name__ == "__main__":
    main()
