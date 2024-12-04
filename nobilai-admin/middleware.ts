import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const path = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicPaths = ['/'];

  // Check if the current path is public
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/pages/:path*', '/admin/:path*', '/settings/:path*'],
};
