# scripts/mac/run_path_headers.command
#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOGIC="$SCRIPT_DIR/../logic/fix_path_headers.py"
PYTHON_BIN="${PYTHON_BIN:-python3}"
if [ -f "$LOGIC" ]; then
  "$PYTHON_BIN" "$LOGIC" "$@"
else
  echo "Script not found: $LOGIC"
fi
echo
read -n 1 -s -r -p "Press any key to exit"
echo
