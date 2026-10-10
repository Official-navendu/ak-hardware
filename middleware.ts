import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * AK HARDWARE — MINIMAL MIDDLEWARE BOUNDARY (PHASE 1)
 *
 * NOTE: Active authentication and route protection logic for /admin, /account, and /checkout
 * will be implemented in Phase 4. This file remains a minimal pass-through placeholder.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons|logos).*)',
  ],
};
