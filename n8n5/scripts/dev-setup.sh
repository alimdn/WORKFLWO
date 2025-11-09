#!/bin/bash

# Development Environment Setup Script

echo "Setting up development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

echo "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

echo "npm version: $(npm --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null
then
    echo "PostgreSQL is not installed. Please install PostgreSQL 15+ and try again."
    exit 1
fi

echo "PostgreSQL version: $(psql --version)"

# Create database
echo "Creating database..."
createdb ecommerce_db || echo "Database already exists or creation failed"

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Create .env files if they don't exist
if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo "Please update the .env file with your configuration values"
fi

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your configuration values"
echo "2. Run database migrations: cd backend && npm run migrate"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001"