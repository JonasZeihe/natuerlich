@echo off
setlocal
cd /d "%~dp0"
python "..\logic\normalize_fire_sheets.py"
endlocal