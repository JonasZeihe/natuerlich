@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "LOGIC_DIR=%SCRIPT_DIR%..\logic"
set "PY_SCRIPT=%LOGIC_DIR%\extract_endpoints_frontend.py"

if not exist "%PY_SCRIPT%" (
  echo [ERROR] Python script not found: %PY_SCRIPT%
  echo.
  echo Press any key to close...
  pause >nul
  endlocal
  exit /b 1
)

echo [INFO] Running extract_endpoints_frontend.py
python "%PY_SCRIPT%"
set "EXITCODE=%ERRORLEVEL%"

if not "%EXITCODE%"=="0" (
  echo [ERROR] Script failed with exit code %EXITCODE%.
) else (
  echo [INFO] Script completed successfully.
)

echo.
echo Press any key to close...
pause >nul
endlocal
