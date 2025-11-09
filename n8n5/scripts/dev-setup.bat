@echo off
REM Development Environment Setup Script for Windows

echo Setting up development environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18+ and try again.
    exit /b 1
)

echo Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install npm and try again.
    exit /b 1
)

echo npm version:
npm --version

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo PostgreSQL is not installed. Please install PostgreSQL 15+ and try again.
    exit /b 1
)

echo PostgreSQL version:
psql --version

REM Create database
echo Creating database...
createdb ecommerce_db >nul 2>&1
if %errorlevel% neq 0 (
    echo Database already exists or creation failed
)

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
npm install

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ../frontend
npm install

REM Create .env files if they don't exist
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo Please update the .env file with your configuration values
)

echo Setup complete!
echo.
echo Next steps:
echo 1. Update backend/.env with your configuration values
echo 2. Run database migrations: cd backend && npm run migrate
echo 3. Start backend: cd backend && npm run dev
echo 4. Start frontend: cd frontend && npm run dev
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:3001