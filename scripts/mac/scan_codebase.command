#!/bin/bash
DIR="$(cd "$(dirname "$0")"; pwd)"
SCRIPT_PATH="$DIR/../logic/backend_code_scanner.py"

osascript -e 'tell application "Terminal" to activate' \
          -e "tell application \"Terminal\" to do script \"python3 '$SCRIPT_PATH'\""
