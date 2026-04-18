#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOGIC_DIR="$SCRIPT_DIR/../logic"
PY_SCRIPT="$LOGIC_DIR/extract_endpoints_frontend.py"

if [ ! -f "$PY_SCRIPT" ]; then
  echo "[ERROR] Python script not found: $PY_SCRIPT"
  read -n 1 -s -r -p "Press any key to close..."
  echo
  exit 1
fi

echo "[INFO] Running extract_endpoints_frontend.py"
python3 "$PY_SCRIPT"
EXITCODE=$?

if [ $EXITCODE -ne 0 ]; then
  echo "[ERROR] Script failed with exit code $EXITCODE."
else
  echo "[INFO] Script completed successfully."
fi

echo
read -n 1 -s -r -p "Press any key to close..."
echo
