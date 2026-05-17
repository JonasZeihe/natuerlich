#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

ROOT_DIR="$(cd ../.. && pwd)"
VENV_DIR="$ROOT_DIR/.venv-image-optimizer"
PYTHON_SCRIPT="$ROOT_DIR/scripts/logic/convert_images.py"

echo
echo "==============================="
echo "  Image Optimizer · WebP tool"
echo "==============================="
echo

if [ ! -d "$VENV_DIR" ]; then
  echo "Creating local Python environment..."
  python3 -m venv "$VENV_DIR"
fi

PYTHON="$VENV_DIR/bin/python"

echo "Checking dependencies..."
"$PYTHON" - <<'PY'
import importlib.util
import subprocess
import sys

if importlib.util.find_spec("PIL") is None:
    print("Installing Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade", "pip"])
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
PY

echo
"$PYTHON" "$PYTHON_SCRIPT" "$@"

echo
read -r -p "Press Enter to close..."