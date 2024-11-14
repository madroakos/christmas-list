import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isUserAuthenticated && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
