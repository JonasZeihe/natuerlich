#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

ROOT_DIR="$(cd ../.. && pwd)"
VENV_DIR="$ROOT_DIR/.venv-prompt-builder"
PYTHON_SCRIPT="$ROOT_DIR/scripts/logic/build_prompts.py"

echo
echo "==============================="
echo "  Prompt Builder · MD tool"
echo "==============================="
echo

if [ ! -d "$VENV_DIR" ]; then
  echo "Creating local Python environment..."
  python3 -m venv "$VENV_DIR"
fi

PYTHON="$VENV_DIR/bin/python"

echo
"$PYTHON" "$PYTHON_SCRIPT" "$@"

echo
read -r -p "Press Enter to close..."