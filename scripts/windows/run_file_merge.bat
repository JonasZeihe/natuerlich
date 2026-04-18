@echo off
setlocal EnableExtensions

cd /d "%~dp0"
cd ..

if exist "%SystemRoot%\py.exe" (
  set "PY=py"
) else (
  where py >nul 2>nul && set "PY=py"
)
if not defined PY (
  where python >nul 2>nul && set "PY=python"
)
if not defined PY (
  echo [ERROR] Python not found in PATH. Install Python 3 or add it to PATH.
  echo Press any key to close...
  pause >nul
  exit /b 1
)

"%PY%" ".\logic\file_merge.py" %*
set EC=%ERRORLEVEL%
echo(
if %EC% NEQ 0 (echo [INFO] Exit code %EC%) else (echo [INFO] OK)
echo Press any key to close...
pause >nul
exit /b %EC%
