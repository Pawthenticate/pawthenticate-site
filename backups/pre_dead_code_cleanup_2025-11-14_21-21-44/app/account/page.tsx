/**
 * My Account Page
 * 
 * User account management - profile info, password change, logout.
 * Protected route - requires authentication.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut, updatePassword } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
          // No user, redirect to login
          router.push('/auth/login');
          return;
        }

        setUser(currentUser);
      } catch (err) {
        console.error('Error loading user:', err);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  // Handle sign out
  const handleSignOut = async () => {
    setSignOutLoading(true);
    
    try {
      const result = await signOut();

      if (!result.success) {
        setError(result.error || 'Sign out failed');
        setSignOutLoading(false);
        return;
      }

      // Redirect to home
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
      setError('An unexpected error occurred');
      setSignOutLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      const result = await updatePassword(newPassword);

      if (!result.success) {
        setError(result.error || 'Failed to update password');
        setPasswordLoading(false);
        return;
      }

      setSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordLoading(false);
    } catch (err) {
      console.error('Password update error:', err);
      setError('An unexpected error occurred');
      setPasswordLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background-200">
        <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/svg/pawthenticate-icon-only.svg" 
                alt="Pawthenticate Logo" 
                className="h-8 w-8"
              />
              <span className="font-bold text-neutral-900">Pawthenticate</span>
            </Link>
          </div>
        </header>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/svg/pawthenticate-icon-only.svg" 
              alt="Pawthenticate Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold text-neutral-900">Pawthenticate</span>
          </Link>
          
          <Link href="/dashboard" className="btn-outline">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">
            My Account
          </h1>

          {/* Account Info Card */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              Account Information
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-bold text-neutral-700">Email</label>
                <p className="text-neutral-900">{user?.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-bold text-neutral-700">User ID</label>
                <p className="text-neutral-600 text-sm font-mono">{user?.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-bold text-neutral-700">Account Created</label>
                <p className="text-neutral-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              Change Password
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg" role="alert">
                <p className="text-red-700 text-sm font-medium">❌ {error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg" role="alert">
                <p className="text-green-700 text-sm font-medium">✓ {success}</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
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
                  disabled={passwordLoading}
                  minLength={6}
                />
              </div>

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
                  disabled={passwordLoading}
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={passwordLoading || !newPassword || !confirmPassword}
              >
                {passwordLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>

          {/* Danger Zone Card */}
          <div className="card border-2 border-red-200 bg-red-50">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Sign Out
            </h2>
            
            <p className="text-red-700 mb-4">
              Sign out of your account on this device.
            </p>

            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              disabled={signOutLoading}
            >
              {signOutLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing Out...
                </span>
              ) : (
                'Sign Out'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

