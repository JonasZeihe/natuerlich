@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PYTHON_FILE=%SCRIPT_DIR%..\logic\gitreport.py"

if not exist "%PYTHON_FILE%" (
  echo [gitreport] FEHLER: Python-Datei nicht gefunden:
  echo %PYTHON_FILE%
  pause
  exit /b 1
)

pushd "%SCRIPT_DIR%"
echo [gitreport] Starte Python-Logik...
py -3 "%PYTHON_FILE%"
if errorlevel 1 (
  popd
  echo [gitreport] FEHLER bei der Ausfuehrung.
  pause
  exit /b 1
)

popd
echo [gitreport] Beendet.
pause