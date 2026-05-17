@echo off
setlocal EnableExtensions
cd /d "%~dp0"
echo.
echo ================================
echo   Prompt Builder · MD tool
echo ================================
echo.
python "%~dp0\..\logic\build_prompts.py" %*
echo.
pause
endlocal