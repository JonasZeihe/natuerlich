@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%\..\.." || exit /b 1

echo === Shizen Over9000 Metrics (Windows) ===
echo Repo: %cd%
echo.

set "PY="
where py >nul 2>nul
if %errorlevel%==0 set "PY=py -3"
if "%PY%"=="" (
  where python >nul 2>nul
  if %errorlevel%==0 set "PY=python"
)

if "%PY%"=="" (
  echo ERROR: Python not found. Install Python 3 and ensure it is in PATH.
  echo.
  echo Press any key to exit...
  pause >nul
  exit /b 1
)

%PY% "%SCRIPT_DIR%\..\logic\over9000_metrics.py"
set "EXIT_CODE=%errorlevel%"

echo.
if "%EXIT_CODE%"=="0" (
  echo DONE.
) else (
  echo FAILED with exit code %EXIT_CODE%.
)
echo.
echo Press any key to exit...
pause >nul
exit /b %EXIT_CODE%
