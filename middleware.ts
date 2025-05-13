"use server"

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/settings") || pathname.match(/^\/[^\/]+$/)) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    if (token && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
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