'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.username, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-400 via-slate-500 to-stone-600 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-white">💪 Kadjot Fitness</h1>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-3 text-base font-semibold text-slate-100">
            Or{' '}
            <Link href="/register" className="font-black text-white hover:text-slate-200 underline">
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 rounded-2xl bg-white p-8 shadow-2xl" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl bg-amber-700 p-4 shadow-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-white">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-black text-gray-900">
                Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-500"
                placeholder="username or email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-black text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-stone-700 to-stone-800 px-4 py-3.5 text-base font-black text-white shadow-lg transition-all hover:from-stone-800 hover:to-stone-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                '🔐 Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-gray-900">
              ← Back to dashboard
            </Link>
          </div>
        </form>

        {/* Guest Mode Notice */}
        <div className="mt-6 rounded-2xl border-2 border-white/30 bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">
            <strong className="font-black">💡 Tip:</strong> You can use the app without signing in. Your data will be saved locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
