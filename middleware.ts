import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/admin',
  '/settings',
  '/achievements',
  '/journey',
  '/knowledge-map',
  '/onboarding',
  '/org',
  '/share',
];

// API routes that require authentication (checked separately in route handlers for token-based auth)
// Middleware handles page-level cookie/session protection only

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect specific page routes
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for Supabase auth session
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase isn't configured, allow through (dev mode)
    return NextResponse.next();
  }

  // Try to get session from cookies
  const accessToken = req.cookies.get('sb-access-token')?.value
    || req.cookies.get(`sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`)?.value;

  if (!accessToken) {
    // No session cookie found - try parsing the Supabase auth storage cookie
    const allCookies = req.cookies.getAll();
    const supabaseCookie = allCookies.find(
      (c) => c.name.includes('auth-token') || c.name.includes('sb-')
    );

    if (!supabaseCookie?.value) {
      // No auth found, redirect to login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all protected page routes.
     * Exclude static files, API routes (they handle auth themselves), and public pages.
     */
    '/dashboard/:path*',
    '/admin/:path*',
    '/settings/:path*',
    '/achievements/:path*',
    '/journey/:path*',
    '/knowledge-map/:path*',
    '/onboarding/:path*',
    '/org/:path*',
    '/share/:path*',
  ],
};
