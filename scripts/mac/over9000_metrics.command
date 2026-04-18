#!/usr/bin/env bash
set +e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
PY_SCRIPT="$SCRIPT_DIR/../logic/over9000_metrics.py"

cd "$REPO_ROOT" || exit 1

echo "=== Shizen Over9000 Metrics (macOS) ==="
echo "Repo: $REPO_ROOT"
echo

PY="python3"
command -v python3 >/dev/null 2>&1 || PY="python"

if ! command -v "$PY" >/dev/null 2>&1; then
  echo "ERROR: Python not found. Install Python 3."
  echo
  echo "Press any key to exit..."
  read -n 1 -s
  exit 1
fi

"$PY" "$PY_SCRIPT"
EXIT_CODE=$?

echo
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "DONE."
else
  echo "FAILED with exit code $EXIT_CODE."
fi
echo
echo "Press any key to exit..."
read -n 1 -s
exit "$EXIT_CODE"
