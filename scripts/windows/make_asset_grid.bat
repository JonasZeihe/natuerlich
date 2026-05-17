@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================
echo   Asset Grid Maker
echo ===============================
echo.

python "..\logic\make_asset_grid.py" %*

echo.
pause