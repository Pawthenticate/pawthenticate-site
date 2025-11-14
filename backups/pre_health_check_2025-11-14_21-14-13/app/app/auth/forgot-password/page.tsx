/**
 * Forgot Password Page
 * 
 * Allows users to request a password reset email.
 */

'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const result = await resetPassword(email);

      if (!result.success) {
        setError(result.error || 'Failed to send reset email');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-200 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img 
              src="/svg/pawthenticate-icon-only.svg" 
              alt="Pawthenticate" 
              className="h-12 w-12"
            />
            <span className="text-2xl font-bold text-neutral-900">Pawthenticate</span>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Reset Password
          </h1>
          <p className="text-neutral-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Form */}
        <div className="card">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg" role="alert">
              <p className="text-red-700 text-sm font-medium">❌ {error}</p>
            </div>
          )}

          {/* Success Message */}
          {success ? (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">✉️</div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-neutral-600 mb-4">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Don't see it? Check your spam folder or try again.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="text-primary-400 hover:text-primary-500 font-medium"
              >
                Send Another Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-4">
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

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/auth/login" 
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

