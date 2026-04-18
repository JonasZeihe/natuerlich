#!/usr/bin/env bash
cd "$(dirname "$0")"
cd ../logic
python3 run_eslint_and_open_files.py
