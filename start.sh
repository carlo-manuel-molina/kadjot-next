#!/bin/bash

# Kadjot Fitness - Start Script
# Starts both backend and frontend servers

set -e

echo "🏋️  Starting Kadjot Fitness..."
echo ""

# Check if backend config exists
if [ ! -f "backend/config.js" ]; then
    echo "⚠️  backend/config.js not found!"
    echo "📝 Copying from config.example.js..."
    cp backend/config.example.js backend/config.js
    echo "✅ Please edit backend/config.js with your database credentials"
    echo ""
fi

# Start backend
echo "🚀 Starting backend server..."
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait for backend to initialize
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Start frontend
echo "🚀 Starting Next.js frontend..."
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║   🏋️  Kadjot Fitness is now running!    ║"
echo "╠═══════════════════════════════════════════╣"
echo "║   Backend:  http://localhost:3000/api    ║"
echo "║   Frontend: http://localhost:3001        ║"
echo "╚═══════════════════════════════════════════╝"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop: ./stop.sh"
echo ""
