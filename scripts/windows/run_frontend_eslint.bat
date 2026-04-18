@echo off
cd /d "%~dp0"
cd ..\logic
python run_eslint_and_open_files.py
