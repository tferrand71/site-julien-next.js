import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    const session = request.cookies.get('admin_session')?.value;
    if (!session || session !== process.env.ADMIN_SECRET) {
      const url = request.nextUrl.clone();
      // Extract locale if present (e.g., /fr/admin -> fr)
      const segments = pathname.split('/');
      const locale = ['fr', 'en', 'es', 'de'].includes(segments[1]) ? `/${segments[1]}` : '';
      url.pathname = `${locale}/admin/login`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fr|en|de|es)/:path*', '/admin/:path*']
};
