/**
 * Auth Callback Route
 * 
 * Handles authentication callbacks from Supabase (magic links, OAuth, etc.)
 * This is a server-side route that processes the auth code and redirects the user.
 */

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');

  // Log callback for debugging
  console.log('[Auth Callback]', {
    hasCode: !!code,
    error,
    error_description,
    timestamp: new Date().toISOString()
  });

  // Handle authentication errors
  if (error) {
    console.error('[Auth Callback] Error:', error, error_description);
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error_description || error)}`, requestUrl.origin)
    );
  }

  // Exchange the code for a session
  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Auth Callback] Missing Supabase environment variables');
      return NextResponse.redirect(
        new URL('/auth/login?error=Configuration error', requestUrl.origin)
      );
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error('[Auth Callback] Code exchange failed:', exchangeError);
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
        );
      }

      console.log('[Auth Callback] Code exchange successful');
      
      // Redirect to dashboard on success
      return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
    } catch (err) {
      console.error('[Auth Callback] Unexpected error:', err);
      return NextResponse.redirect(
        new URL('/auth/login?error=Authentication failed', requestUrl.origin)
      );
    }
  }

  // No code and no error - shouldn't happen but redirect to login
  console.warn('[Auth Callback] No code or error present');
  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin));
}

