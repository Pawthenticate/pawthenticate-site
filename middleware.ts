/**
 * Next.js Middleware - Coming Soon Mode
 * 
 * Redirects root (/) to coming soon page
 * Allows access to all other routes for testing/development
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to coming soon page
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/coming-soon-temp', request.url));
  }

  // Allow all other routes
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

