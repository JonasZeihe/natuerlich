#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
cd ..

PY="python3"
if ! command -v "$PY" >/dev/null 2>&1; then
  if command -v python >/dev/null 2>&1; then PY="python"; else
    echo "[ERROR] Python not found in PATH."
    read -n 1 -s -r -p "Press any key to close..."; echo
    exit 1
  fi
fi

"$PY" "./logic/file_merge.py" "$@"
EC=$?
echo
if [[ $EC -ne 0 ]]; then echo "[INFO] Exit code $EC"; else echo "[INFO] OK"; fi
read -n 1 -s -r -p "Press any key to close..."; echo
exit $EC
