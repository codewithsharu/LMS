@echo off
:: Set text color to green
color 0a

:: Print "Made by Shareen"
echo.
echo ============================
echo Made by Shareen
echo ============================
echo.

:: Get the current directory path
set current_dir=%cd%

:: Prompt for commit message
set /p message="Enter commit message: "

:: Run git commands
cd /d "%current_dir%"
git add .
git commit -m "%message%"
git push origin main

:: Pause at the end
pause
