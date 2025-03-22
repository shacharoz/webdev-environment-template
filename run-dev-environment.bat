@echo off
setlocal

:: Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b
)

:: Check for Python
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python from https://www.python.org/ and try again.
    pause
    exit /b
)

echo All required dependencies are installed. Proceeding...

:: Check if package.json exists; if not, initialize a new project
if not exist package.json (
    echo Initializing npm project...
    npm init -y
)

:: Install dependencies if not already installed
for %%i in (express body-parser cors node-sass-chokidar autoprefixer chokidar-cli npm-run-all postcss-cli live-server) do (
    npm list -g %%i >nul 2>&1
    if %errorlevel% neq 0 (
        echo Installing %%i...
        npm install -g %%i
    ) else (
        echo %%i is already installed.
    )
)

:: Ensure required folder structure exists
if not exist src\scss mkdir src\scss
if not exist release\css mkdir release\css
if not exist server mkdir server

:: Create package.json scripts (if not already defined)
echo Updating package.json scripts...

node -e "const fs=require('fs'); let pkg=JSON.parse(fs.readFileSync('package.json')); pkg.scripts={\
    'build-task:scss-compile': 'node-sass-chokidar --source-map true src/scss/ -o release/css',\
    'build-task:autoprefixer': 'postcss release/css/*.css --use autoprefixer -d release/css',\
    'sass:build': 'npm-run-all -p build-task:*',\
    'sass:watch': 'chokidar \"src/scss/**/*.scss\" -c \"npm run sass:build\"',\
    'server': 'node server/index.js',\
    'dev': 'npm-run-all -p sass:* live-server server'\
}; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"

:: Create a basic Express server file if not exists
if not exist server\index.js (
    echo Creating Express server file...
    echo const express = require('express');> server\index.js
    echo const bodyParser = require('body-parser');>> server\index.js
    echo const cors = require('cors');>> server\index.js
    echo const app = express();>> server\index.js
    echo app.use(cors());>> server\index.js
    echo app.use(bodyParser.json());>> server\index.js
    echo app.use(express.static('release'));>> server\index.js
    echo app.get('/api/data', (req, res) => { res.json({ message: 'Hello, API!' }); });>> server\index.js
    echo const PORT = process.env.PORT || 3000;>> server\index.js
    echo app.listen(PORT, () => console.log('Server running on port ' + PORT));>> server\index.js
)

:: Run development environment
echo Starting development server...
npm run dev

:: Open index.html in default browser
start release\index.html

exit
