/**
 * Reset Password Page
 * 
 * Allows users to set a new password after clicking reset link in email.
 */

'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updatePassword } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);

  // Check if we have a valid recovery token
  useEffect(() => {
    const checkToken = async () => {
      if (!supabase) {
        setValidToken(false);
        setError('Authentication service unavailable');
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setValidToken(true);
        } else {
          setValidToken(false);
          setError('Invalid or expired reset link. Please request a new one.');
        }
      } catch (err) {
        console.error('Token check error:', err);
        setValidToken(false);
        setError('Failed to verify reset link');
      }
    };

    checkToken();
  }, []);

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await updatePassword(newPassword);

      if (!result.success) {
        setError(result.error || 'Failed to update password');
        setLoading(false);
        return;
      }

      setSuccess(true);
      
      // Redirect to login after short delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      console.error('Password update error:', err);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  // Loading state while checking token
  if (validToken === null) {
    return (
      <div className="min-h-screen bg-background-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-neutral-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (validToken === false) {
    return (
      <div className="min-h-screen bg-background-200 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-neutral-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link href="/auth/forgot-password" className="btn-primary inline-block">
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Set New Password
          </h1>
          <p className="text-neutral-600">
            Enter your new password below
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
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Password Updated!
              </h2>
              <p className="text-neutral-600 mb-4">
                Your password has been successfully changed.
              </p>
              <p className="text-sm text-neutral-500">
                Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  Confirm New Password
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
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating Password...
                  </span>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

