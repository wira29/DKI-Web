import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isCmsRoute = path.startsWith('/cms');
  const isLoginRoute = path === '/cms/login';

  const token = request.cookies.get('dki_admin_token')?.value;

  if (isCmsRoute && !isLoginRoute && !token) {
    return NextResponse.redirect(new URL('/cms/login', request.url));
  }

  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/cms', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};
