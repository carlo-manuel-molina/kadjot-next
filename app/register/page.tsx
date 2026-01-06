'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-lime-600 via-green-600 to-yellow-600 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black text-white">💪 Kadjot Fitness</h1>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-3 text-base font-semibold text-lime-200">
            Or{' '}
            <Link href="/login" className="font-black text-white hover:text-lime-100 underline">
              sign in to existing account
            </Link>
          </p>
        </div>

        {/* Registration Form */}
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

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-black text-gray-900">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-lime-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-black text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-lime-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="you@example.com"
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-lime-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="••••••••"
              />
              <p className="mt-1.5 text-xs font-bold text-gray-600">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-black text-gray-900">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 placeholder-gray-500 shadow-sm transition-colors focus:border-lime-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-green-700 to-lime-700 px-4 py-3.5 text-base font-black text-white shadow-lg transition-all hover:from-green-800 hover:to-lime-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                '✨ Create account'
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
            <strong className="font-black">💡 Tip:</strong> You can use the app without creating an account. Your data will be saved locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
