#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON_FILE="$SCRIPT_DIR/../logic/gitreport.py"

if [ ! -f "$PYTHON_FILE" ]; then
  echo "[gitreport] FEHLER: Python-Datei nicht gefunden:"
  echo "$PYTHON_FILE"
  read -r -p "Enter zum Beenden ..."
  exit 1
fi

cd "$SCRIPT_DIR" || exit 1
echo "[gitreport] Starte Python-Logik..."
python3 "$PYTHON_FILE"
status=$?
if [ $status -ne 0 ]; then
  echo "[gitreport] FEHLER bei der Ausfuehrung."
  read -r -p "Enter zum Beenden ..."
  exit $status
fi

echo "[gitreport] Beendet."
read -r -p "Enter zum Beenden ..."