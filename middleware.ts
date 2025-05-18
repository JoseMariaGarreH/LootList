import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    // Solo pide login en rutas tipo /[username] que no sean reservadas

    const publicPaths = [
        "/settings", 
        "/auth", 
        "/games", 
        "/about", 
        "/help"
    ];

    const isProfileRoute =
        /^\/[^\/]+$/.test(pathname) &&
        !publicPaths.some(route => pathname.startsWith(route));

    const isUserLibraryRoute =
        /^\/[^\/]+\/library$/.test(pathname);

    if ((pathname.startsWith("/settings") || isProfileRoute || isUserLibraryRoute) && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (
        token &&
        (pathname.startsWith("/auth/login") ||
            pathname.startsWith("/auth/signup") ||
            pathname.startsWith("/auth/resetpassword"))
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/settings/:path*",
        "/:path*",
        '/auth/login',
        '/auth/signup',
    ],
}