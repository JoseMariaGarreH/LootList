import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

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

    const isUserWishlistRoute = /^\/[^\/]+\/wishlist$/.test(pathname);
    const isUserLikesRoute = /^\/[^\/]+\/likes$/.test(pathname);
    const isUserPlayingRoute = /^\/[^\/]+\/playing$/.test(pathname);
    const isUserPlayedRoute = /^\/[^\/]+\/played$/.test(pathname);

    if (
        (
            pathname.startsWith("/settings") ||
            isProfileRoute ||
            isUserPlayedRoute ||
            isUserWishlistRoute ||
            isUserLikesRoute ||
            isUserPlayingRoute
        ) && !token
    ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (
        token &&
        (   
            pathname.startsWith("/auth/login") ||
            pathname.startsWith("/auth/signup") ||
            pathname.startsWith("/auth/resetpassword") ||
            pathname.startsWith("/auth/requestemail")
        )
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