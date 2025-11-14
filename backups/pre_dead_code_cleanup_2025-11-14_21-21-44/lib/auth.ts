/**
 * Authentication Utilities
 * 
 * Helper functions for user authentication using Supabase Auth.
 * Includes comprehensive error handling and user-friendly messages.
 * 
 * Features:
 * - Sign up with email/password
 * - Sign in with email/password
 * - Magic link authentication
 * - Password reset
 * - Session management
 * - Error handling with detailed logging
 */

import { createBrowserSupabaseClient, handleSupabaseError } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

// Helper to get a fresh Supabase client instance
const getSupabase = () => createBrowserSupabaseClient();

/**
 * Console Logger for Auth Operations
 */
const logAuth = (action: string, status: 'success' | 'error' | 'warn' | 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[Auth ${timestamp}]`;
  
  if (status === 'error') {
    console.error(prefix, action, data);
  } else if (status === 'warn') {
    console.warn(prefix, action, data);
  } else if (status === 'info') {
    console.info(prefix, action, data);
  } else {
    console.log(prefix, action, data);
  }
};

/**
 * Auth Result Type
 * 
 * Standardized return type for all auth operations.
 */
export type AuthResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  needsEmailConfirmation?: boolean;
};

/**
 * Sign Up with Email and Password
 * 
 * Creates a new user account.
 * 
 * @param email - User's email address
 * @param password - User's password (min 6 characters)
 * @param metadata - Optional user metadata (name, etc.)
 */
export async function signUp(
  email: string,
  password: string,
  metadata?: { name?: string }
): Promise<AuthResult<User>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('signUp', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  // Validate input
  if (!email || !email.includes('@')) {
    logAuth('signUp', 'error', { error: 'Invalid email format', email });
    return { success: false, error: 'Please enter a valid email address' };
  }

  if (!password || password.length < 6) {
    logAuth('signUp', 'error', { error: 'Password too short' });
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  try {
    logAuth('signUp', 'info', { email, hasMetadata: !!metadata });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata || {},
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'signUp', { email });
      return { success: false, error: friendlyError };
    }

    if (!data.user) {
      logAuth('signUp', 'error', { error: 'No user data returned' });
      return { success: false, error: 'Sign up failed. Please try again.' };
    }

    // Check if email confirmation is required
    const needsEmailConfirmation = data.user.identities?.length === 0;

    logAuth('signUp', 'success', {
      userId: data.user.id,
      email: data.user.email,
      needsEmailConfirmation
    });

    return {
      success: true,
      data: data.user,
      needsEmailConfirmation
    };
  } catch (error) {
    logAuth('signUp', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred during sign up' };
  }
}

/**
 * Sign In with Email and Password
 * 
 * Authenticates an existing user.
 * 
 * @param email - User's email address
 * @param password - User's password
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult<User>> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('signIn', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  // Validate input
  if (!email || !email.includes('@')) {
    logAuth('signIn', 'error', { error: 'Invalid email format', email });
    return { success: false, error: 'Please enter a valid email address' };
  }

  if (!password) {
    logAuth('signIn', 'error', { error: 'No password provided' });
    return { success: false, error: 'Please enter your password' };
  }

  try {
    logAuth('signIn', 'info', { email });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Special handling for common auth errors
      if (error.message.includes('Invalid login credentials')) {
        logAuth('signIn', 'warn', { error: 'Invalid credentials', email });
        return { success: false, error: 'Invalid email or password' };
      }
      
      if (error.message.includes('Email not confirmed')) {
        logAuth('signIn', 'warn', { error: 'Email not confirmed', email });
        return { success: false, error: 'Please confirm your email address before signing in' };
      }

      const friendlyError = handleSupabaseError(error, 'signIn', { email });
      return { success: false, error: friendlyError };
    }

    if (!data.user) {
      logAuth('signIn', 'error', { error: 'No user data returned' });
      return { success: false, error: 'Sign in failed. Please try again.' };
    }

    logAuth('signIn', 'success', {
      userId: data.user.id,
      email: data.user.email
    });

    return {
      success: true,
      data: data.user
    };
  } catch (error) {
    logAuth('signIn', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred during sign in' };
  }
}

/**
 * Sign In with Magic Link
 * 
 * Sends a magic link to the user's email for passwordless authentication.
 * 
 * @param email - User's email address
 */
export async function signInWithMagicLink(email: string): Promise<AuthResult> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('signInWithMagicLink', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  // Validate input
  if (!email || !email.includes('@')) {
    logAuth('signInWithMagicLink', 'error', { error: 'Invalid email format', email });
    return { success: false, error: 'Please enter a valid email address' };
  }

  try {
    logAuth('signInWithMagicLink', 'info', { email });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'signInWithMagicLink', { email });
      return { success: false, error: friendlyError };
    }

    logAuth('signInWithMagicLink', 'success', { email });

    return {
      success: true,
      data: { message: 'Check your email for the magic link!' }
    };
  } catch (error) {
    logAuth('signInWithMagicLink', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred sending magic link' };
  }
}

/**
 * Sign Out
 * 
 * Signs out the current user and clears the session.
 */
export async function signOut(): Promise<AuthResult> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('signOut', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  try {
    logAuth('signOut', 'info', {});

    const { error } = await supabase.auth.signOut();

    if (error) {
      const friendlyError = handleSupabaseError(error, 'signOut');
      return { success: false, error: friendlyError };
    }

    logAuth('signOut', 'success', {});

    return { success: true };
  } catch (error) {
    logAuth('signOut', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred during sign out' };
  }
}

/**
 * Request Password Reset
 * 
 * Sends a password reset email to the user.
 * 
 * @param email - User's email address
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('resetPassword', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  // Validate input
  if (!email || !email.includes('@')) {
    logAuth('resetPassword', 'error', { error: 'Invalid email format', email });
    return { success: false, error: 'Please enter a valid email address' };
  }

  try {
    logAuth('resetPassword', 'info', { email });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'resetPassword', { email });
      return { success: false, error: friendlyError };
    }

    logAuth('resetPassword', 'success', { email });

    return {
      success: true,
      data: { message: 'Check your email for password reset instructions!' }
    };
  } catch (error) {
    logAuth('resetPassword', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred sending reset email' };
  }
}

/**
 * Update Password
 * 
 * Updates the user's password (must be signed in).
 * 
 * @param newPassword - New password (min 6 characters)
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const supabase = getSupabase();
  
  if (!supabase) {
    const error = 'Supabase client not initialized';
    logAuth('updatePassword', 'error', { error });
    return { success: false, error: 'Authentication service unavailable' };
  }

  if (!newPassword || newPassword.length < 6) {
    logAuth('updatePassword', 'error', { error: 'Password too short' });
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  try {
    logAuth('updatePassword', 'info', {});

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      const friendlyError = handleSupabaseError(error, 'updatePassword');
      return { success: false, error: friendlyError };
    }

    logAuth('updatePassword', 'success', {});

    return { success: true };
  } catch (error) {
    logAuth('updatePassword', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: 'An unexpected error occurred updating password' };
  }
}

/**
 * Get Current User
 * 
 * Returns the currently authenticated user, or null if not signed in.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase();
  
  if (!supabase) {
    logAuth('getCurrentUser', 'error', { error: 'Supabase client not initialized' });
    return null;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      logAuth('getCurrentUser', 'warn', {
        error: error.message,
        note: 'User might not be signed in'
      });
      return null;
    }

    if (user) {
      logAuth('getCurrentUser', 'info', {
        userId: user.id,
        email: user.email
      });
    }

    return user;
  } catch (error) {
    logAuth('getCurrentUser', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return null;
  }
}

/**
 * Get Current Session
 * 
 * Returns the current session, or null if not signed in.
 */
export async function getSession() {
  const supabase = getSupabase();
  
  if (!supabase) {
    logAuth('getSession', 'error', { error: 'Supabase client not initialized' });
    return null;
  }

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      logAuth('getSession', 'warn', {
        error: error.message,
        note: 'Session might have expired'
      });
      return null;
    }

    return session;
  } catch (error) {
    logAuth('getSession', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return null;
  }
}

/**
 * Check if User is Authenticated
 * 
 * Quick check to see if a user is currently signed in.
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

