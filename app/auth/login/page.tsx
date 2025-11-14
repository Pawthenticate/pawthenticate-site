/**
 * Login Page
 * 
 * Allows users to sign in with email/password or magic link.
 * Features comprehensive error handling and user feedback.
 */

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signInWithMagicLink, getSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);

  // Handle email/password login
  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault(); // CRITICAL: Prevent form submission/page reload
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('[Login] Attempting to sign in...');
      const result = await signIn(email, password);

      if (!result.success) {
        console.error('[Login] Sign in failed:', result.error);
        setError(result.error || 'Login failed');
        setLoading(false);
        return;
      }

      console.log('[Login] ✅ Sign in successful! Redirecting to dashboard...');
      setSuccess('Login successful! Redirecting...');
      
      // Use Next.js router for client-side navigation (preserves session)
      // This is much better than window.location.href which causes a full page reload
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
      
    } catch (err) {
      console.error('[Login] Unexpected error during login:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  // Handle magic link login
  const handleMagicLinkLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await signInWithMagicLink(email);

      if (!result.success) {
        setError(result.error || 'Failed to send magic link');
        setLoading(false);
        return;
      }

      setSuccess('Magic link sent! Check your email.');
      setLoading(false);
    } catch (err) {
      console.error('Magic link error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Paw Prints Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl opacity-10 animate-float">🐾</div>
        <div className="absolute top-40 right-20 text-3xl opacity-10 animate-float animation-delay-1000">🐾</div>
        <div className="absolute bottom-40 left-1/4 text-5xl opacity-10 animate-float animation-delay-2000">🐾</div>
        <div className="absolute bottom-20 right-1/3 text-2xl opacity-10 animate-float animation-delay-3000">🐾</div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-14 h-14 bg-white rounded-full p-2 shadow-xl transform group-hover:scale-110 transition-transform">
                <img 
                  src="/svg/pawthenticate-icon-only.svg" 
                  alt="Pawthenticate" 
                  className="w-full h-full"
                />
              </div>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Pawthenticate
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-lg text-neutral-600">
            Sign in to access your pet resumes
          </p>
        </div>

        {/* Login Form - Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          {/* Toggle between email/password and magic link */}
          <div className="flex gap-3 mb-6 p-1.5 bg-gray-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setUseMagicLink(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                !useMagicLink
                  ? 'bg-gradient-to-r from-primary-400 to-secondary-400 text-white shadow-lg transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              🔑 Password
            </button>
            <button
              type="button"
              onClick={() => setUseMagicLink(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                useMagicLink
                  ? 'bg-gradient-to-r from-primary-400 to-secondary-400 text-white shadow-lg transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              ✨ Magic Link
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-2xl shadow-md" role="alert">
              <p className="text-red-700 text-sm font-bold flex items-center gap-2">
                <span className="text-xl">❌</span>
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl shadow-md" role="alert">
              <p className="text-green-700 text-sm font-bold flex items-center gap-2">
                <span className="text-xl">✅</span>
                {success}
              </p>
            </div>
          )}

          <form onSubmit={useMagicLink ? handleMagicLinkLogin : handleEmailLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>

            {/* Password Field (only for email/password login) */}
            {!useMagicLink && (
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  minLength={6}
                />
                <div className="mt-2 text-right">
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-primary-400 hover:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full py-4 px-8 text-lg font-black text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 animate-gradient-shift"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {useMagicLink ? 'Sending Link...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {useMagicLink ? 'Send Magic Link' : 'Sign In'}
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-sm text-neutral-500 font-medium">Don't have an account?</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/auth/signup"
            className="block w-full text-center py-4 px-8 text-lg font-bold text-neutral-700 bg-white border-2 border-neutral-200 hover:border-primary-300 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-700 hover:text-primary-500 font-medium transition-colors bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

