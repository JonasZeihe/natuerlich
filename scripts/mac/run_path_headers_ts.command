#!/bin/bash
cd "$(cd "$(dirname "$0")" && pwd)/../.."
python3 scripts/logic/fix_path_headers_ts.py
