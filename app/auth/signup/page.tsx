/**
 * Sign Up Page
 * 
 * Allows new users to create an account.
 * Features comprehensive validation and error handling.
 */

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  // Handle sign up
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, { name });

      if (!result.success) {
        setError(result.error || 'Sign up failed');
        setLoading(false);
        return;
      }

      if (result.needsEmailConfirmation) {
        setNeedsConfirmation(true);
        setSuccess('Account created! Please check your email to confirm your account.');
        setLoading(false);
      } else {
        setSuccess('Account created successfully! Redirecting...');
        
        // Wait for session to be fully persisted, then redirect
        setTimeout(() => {
          // Force a hard navigation to ensure cookies are sent
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (err) {
      console.error('Sign up error:', err);
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
            Create Account
          </h1>
          <p className="text-lg text-neutral-600">
            Start creating professional pet resumes
          </p>
        </div>

        {/* Sign Up Form - Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
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
              {needsConfirmation && (
                <p className="text-green-700 text-xs mt-2 ml-7">
                  📧 Check your inbox and spam folder for the confirmation email.
                </p>
              )}
            </div>
          )}

          {!needsConfirmation && (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="label">
                  Name <span className="text-neutral-400">(Optional)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={loading}
                />
              </div>

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

              {/* Password Field */}
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
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={6}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={6}
                />
              </div>

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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          )}

          {needsConfirmation && (
            <div className="text-center py-6">
              <p className="text-neutral-600 mb-4 font-medium">
                Didn't receive the email?
              </p>
              <button
                onClick={() => {
                  setNeedsConfirmation(false);
                  setSuccess('');
                  setLoading(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary-400 to-secondary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-sm text-neutral-500 font-medium">Already have an account?</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Sign In Link */}
          <Link
            href="/auth/login"
            className="block w-full text-center py-4 px-8 text-lg font-bold text-neutral-700 bg-white border-2 border-neutral-200 hover:border-primary-300 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Sign In
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

