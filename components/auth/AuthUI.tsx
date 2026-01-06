'use client';

// Kadjot Fitness - Auth UI Component

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthUI() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-300"></div>
        <div className="h-10 w-24 rounded-xl bg-gray-300"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Logged in user
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <span className="text-sm font-serif italic text-blue-900" style={{ fontFamily: 'Georgia, Garamond, "Times New Roman", serif' }}>
          👋 Hello, <span className="font-black text-cyan-800">{user.username}</span>!
        </span>
        <button
          onClick={handleLogout}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-black text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
        >
          🚪 Logout
        </button>
      </div>
    );
  }

  // Guest mode
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <span className="text-sm font-bold text-blue-900">👤 Guest Mode</span>
      <button
        onClick={() => router.push('/login')}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-2.5 text-sm font-black text-white shadow-lg transition-all hover:from-blue-700 hover:to-sky-700 hover:shadow-xl"
      >
        🔐 Login
      </button>
      <button
        onClick={() => router.push('/register')}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-sm font-black text-white shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 hover:shadow-xl"
      >
        ✨ Create Account
      </button>
    </div>
  );
}
