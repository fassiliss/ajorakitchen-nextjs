import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to login page
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};