@echo off
:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator.
    echo Please right-click on install.bat and select "Run as administrator".
    pause
    exit /b
)

echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b
)

echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python.
    exit /b
)

echo Installing project dependencies...
npm install

echo Installation complete. To start development, run:
echo npm run dev
pause
