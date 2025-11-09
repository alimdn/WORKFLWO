#!/bin/bash

# Script to start both frontend and backend in development mode

echo "Starting development servers..."

# Start backend in background
echo "Starting backend server..."
cd backend
npm run dev > backend.log 2>&1 &
BACKEND_PID=$!

# Start frontend in background
echo "Starting frontend server..."
cd ../frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "Development servers started!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID
wait $FRONTEND_PID