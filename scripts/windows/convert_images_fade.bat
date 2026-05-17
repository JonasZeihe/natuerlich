@echo off
setlocal

cd /d "%~dp0"

for %%I in ("%cd%\..\..") do set "ROOT_DIR=%%~fI"
set "VENV_DIR=%ROOT_DIR%\.venv-image-optimizer"
set "PYTHON_SCRIPT=%ROOT_DIR%\scripts\logic\convert_images_fade.py"

echo.
echo ===============================
echo   Image Extender - Fade tool
echo ===============================
echo.

if not exist "%VENV_DIR%" (
    echo Creating local Python environment...
    py -3 -m venv "%VENV_DIR%"
    if errorlevel 1 (
        python -m venv "%VENV_DIR%"
    )
)

set "PYTHON=%VENV_DIR%\Scripts\python.exe"

echo Checking dependencies...
"%PYTHON%" -c "import importlib.util, subprocess, sys; missing = importlib.util.find_spec('PIL') is None; subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip']) if missing else None; subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pillow']) if missing else None"

echo.
"%PYTHON%" "%PYTHON_SCRIPT%" %*

echo.
pause