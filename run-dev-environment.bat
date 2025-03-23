@echo off
echo Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    exit /b
)

echo Checking for Python...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python is not installed. Please install it from https://www.python.org/downloads/
    exit /b
)

echo Installing dependencies...
npm install

echo Starting development server...
npm start

echo Development environment is running. Open http://localhost:3000 in your browser.
pause
