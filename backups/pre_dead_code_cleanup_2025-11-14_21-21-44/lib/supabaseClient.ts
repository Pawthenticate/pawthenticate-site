/**
 * Supabase Client Configuration
 * 
 * This file creates and exports the Supabase client for database and auth operations.
 * It includes comprehensive error handling and logging for debugging.
 * 
 * IMPORTANT: Uses Next.js-specific Supabase clients for proper cookie handling
 * - createBrowserClient: For client components (auto-manages cookies)
 * - Use this in client components for auth and data operations
 * 
 * Error Handling Strategy:
 * - Validates environment variables on initialization
 * - Logs all errors with timestamps and context
 * - Provides fallback behavior for missing configuration
 * - Type-safe client with proper TypeScript types
 * 
 * Usage:
 * import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
 * const supabase = createBrowserSupabaseClient();
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

/**
 * Console Logger with Timestamps
 * 
 * Helper function to log Supabase operations with timestamps.
 * Makes it easy to debug issues in the browser console.
 */
const logSupabase = (action: string, status: 'success' | 'error' | 'warn' | 'info', data?: any) => {
  const timestamp = new Date().toISOString();
  const prefix = `[Supabase ${timestamp}]`;
  
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
 * Validate Environment Variables
 * 
 * Ensures required Supabase environment variables are present.
 * Logs detailed errors if configuration is missing.
 */
const validateEnvVars = (): { url: string; anonKey: string } | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    logSupabase('Environment validation', 'error', {
      error: 'Missing Supabase environment variables',
      details: {
        url: supabaseUrl ? '✓ Present' : '✗ Missing NEXT_PUBLIC_SUPABASE_URL',
        anonKey: supabaseAnonKey ? '✓ Present' : '✗ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
      solution: [
        '1. Create a .env.local file in the project root',
        '2. Add: NEXT_PUBLIC_SUPABASE_URL=your_project_url',
        '3. Add: NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key',
        '4. Restart the development server'
      ]
    });
    return null;
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch {
    logSupabase('Environment validation', 'error', {
      error: 'Invalid NEXT_PUBLIC_SUPABASE_URL format',
      providedUrl: supabaseUrl,
      expectedFormat: 'https://xxxxx.supabase.co'
    });
    return null;
  }

  // Validate anon key format (should be a JWT-like string)
  if (supabaseAnonKey.length < 100) {
    logSupabase('Environment validation', 'warn', {
      warning: 'NEXT_PUBLIC_SUPABASE_ANON_KEY seems too short',
      length: supabaseAnonKey.length,
      note: 'Supabase anon keys are typically 200+ characters'
    });
  }

  logSupabase('Environment validation', 'success', {
    url: supabaseUrl,
    anonKeyLength: supabaseAnonKey.length
  });

  return { url: supabaseUrl, anonKey: supabaseAnonKey };
};

/**
 * Create Browser Supabase Client
 * 
 * Creates a Supabase client optimized for browser use with Next.js.
 * This client automatically handles cookie-based session management.
 * 
 * IMPORTANT: Call this function to get a fresh client instance.
 * Don't export a singleton - each component should call this function.
 * 
 * @returns Supabase client or null if env vars are missing
 */
export function createBrowserSupabaseClient() {
  const envVars = validateEnvVars();
  
  if (!envVars) {
    logSupabase('Client creation', 'error', {
      error: 'Cannot create Supabase client without valid environment variables',
      fallback: 'App will use localStorage-only mode (no backend persistence)'
    });
    return null;
  }

  try {
    // Use Next.js-specific browser client that handles cookies automatically
    const client = createBrowserClient<Database>(
      envVars.url,
      envVars.anonKey
    );

    logSupabase('Client creation', 'success', {
      message: 'Supabase browser client initialized successfully',
      projectUrl: envVars.url,
      authConfig: {
        autoRefresh: true,
        persistSession: true,
        storageType: 'cookies (via Next.js SSR)'
      }
    });

    return client;
  } catch (error) {
    logSupabase('Client creation', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      possibleCauses: [
        'Invalid Supabase credentials',
        'Network connectivity issues',
        'Supabase project is paused or deleted'
      ]
    });
    return null;
  }
}

/**
 * Backwards Compatibility
 * 
 * Export a default client instance for backwards compatibility.
 * However, prefer using createBrowserSupabaseClient() in new code.
 */
export const supabase = createBrowserSupabaseClient();

/**
 * Check if Supabase is Available
 * 
 * Helper function to check if Supabase can be initialized.
 * Use this before making Supabase calls to provide fallback behavior.
 */
export const isSupabaseAvailable = (): boolean => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const available = !!(supabaseUrl && supabaseAnonKey);
  
  if (!available && typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    logSupabase('Availability check', 'warn', {
      available: false,
      message: 'Supabase environment variables not configured'
    });
  }
  
  return available;
};

/**
 * Get Supabase Health Status
 * 
 * Performs a simple query to check if Supabase is reachable.
 * Useful for debugging connection issues.
 */
export const checkSupabaseHealth = async (): Promise<{
  healthy: boolean;
  latencyMs?: number;
  error?: string;
}> => {
  const client = createBrowserSupabaseClient();
  
  if (!client) {
    return {
      healthy: false,
      error: 'Supabase client not initialized'
    };
  }

  try {
    const startTime = Date.now();
    
    // Simple query to check connection
    const { error } = await client.from('pets').select('count', { count: 'exact', head: true });
    
    const latencyMs = Date.now() - startTime;

    if (error) {
      logSupabase('Health check', 'error', {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });

      return {
        healthy: false,
        latencyMs,
        error: error.message
      };
    }

    logSupabase('Health check', 'success', {
      healthy: true,
      latencyMs,
      message: 'Supabase connection is healthy'
    });

    return {
      healthy: true,
      latencyMs
    };
  } catch (error) {
    logSupabase('Health check', 'error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      possibleCauses: [
        'Network is offline',
        'Supabase project is down',
        'Database not initialized',
        'RLS policies blocking access'
      ]
    });

    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Handle Supabase Errors
 * 
 * Centralized error handler for Supabase operations.
 * Logs errors with context and returns user-friendly messages.
 */
export const handleSupabaseError = (
  error: any,
  operation: string,
  context?: Record<string, any>
): string => {
  logSupabase(`Error in ${operation}`, 'error', {
    error: error?.message || 'Unknown error',
    code: error?.code,
    details: error?.details,
    hint: error?.hint,
    context
  });

  // Map Supabase error codes to user-friendly messages
  if (error?.code === '23505') {
    return 'This record already exists';
  }
  
  if (error?.code === '42501') {
    return 'You do not have permission to perform this action';
  }
  
  if (error?.code === 'PGRST116') {
    return 'No data found';
  }

  if (error?.message?.includes('JWT')) {
    return 'Your session has expired. Please log in again.';
  }

  if (error?.message?.includes('network')) {
    return 'Network error. Please check your internet connection.';
  }

  // Default user-friendly message
  return error?.message || 'An unexpected error occurred. Please try again.';
};

