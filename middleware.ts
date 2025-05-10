import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    if (!token && (pathname.startsWith('/settings/profile') || pathname.startsWith('/settings/password'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
        return NextResponse.redirect(new URL('/settings/profile', request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: [
        '/settings/profile',
        '/settings/password',
        '/auth/login',
        '/auth/signup',
    ],
}