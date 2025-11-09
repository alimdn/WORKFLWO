@echo off
REM Script to start both frontend and backend in development mode on Windows

echo Starting development servers...

REM Start backend in background
echo Starting backend server...
cd backend
start "Backend Server" npm run dev

REM Start frontend in background
echo Starting frontend server...
cd ../frontend
start "Frontend Server" npm run dev

echo.
echo Development servers started!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3001
echo.
echo Close the server windows to stop the servers