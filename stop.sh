#!/bin/bash

# Kadjot Fitness - Stop Script
# Stops both backend and frontend servers

echo "🛑 Stopping Kadjot Fitness..."
echo ""

# Stop backend
echo "Stopping backend server..."
pkill -f "node.*backend/server.js" && echo "✅ Backend stopped" || echo "ℹ️  Backend not running"

# Stop frontend
echo "Stopping Next.js frontend..."
pkill -f "next dev" && echo "✅ Frontend stopped" || echo "ℹ️  Frontend not running"

echo ""
echo "✅ All servers stopped!"
echo ""
