@echo off
setlocal
cd /d "%~dp0\..\.."
python scripts\logic\fix_path_headers_ts.py
endlocal
pause
