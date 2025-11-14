/**
 * Next.js Middleware for Authentication
 * 
 * Protects routes that require authentication.
 * Redirects unauthenticated users to login page.
 * 
 * IMPORTANT: Uses @supabase/ssr for proper cookie handling in middleware.
 * This ensures sessions persist correctly across page navigations.
 * 
 * Protected routes:
 * - /dashboard
 * - /account
 * - /create (when backend is connected)
 * - /preview (when backend is connected)
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/account'];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/auth/login', '/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If not a protected or auth route, allow through
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  // Get Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase not configured, allow through (fallback to localStorage mode)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Middleware] Supabase not configured, allowing through');
    return NextResponse.next();
  }

  try {
    // Create a response object to modify
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create Supabase client with proper cookie handling for middleware
    const supabase = createServerClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Set cookies on the request for subsequent middleware
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            // Set cookies on the response for the client
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Get session from cookies (this will read from the cookies we set up above)
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('[Middleware] Session check error:', error);
    }

    // Handle protected routes
    if (isProtectedRoute) {
      if (!session) {
        // Not logged in, redirect to login
        console.log('[Middleware] No session, redirecting to login:', pathname);
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Logged in, allow through
      console.log('[Middleware] ✅ Session valid, allowing access:', {
        pathname,
        userId: session.user.id,
        email: session.user.email,
      });
      return response;
    }

    // Handle auth routes (login, signup)
    if (isAuthRoute) {
      if (session) {
        // Already logged in, redirect to dashboard
        console.log('[Middleware] Already logged in, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Not logged in, allow through to auth pages
      return response;
    }

  } catch (error) {
    console.error('[Middleware] Unexpected error:', error);
    
    // On error, allow through to avoid breaking the app
    return NextResponse.next();
  }

  // Default: allow through
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public files (svg, images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|svg).*)',
  ],
};

