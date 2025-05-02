import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    // Protección de rutas
    if (!token && pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/profile","login","signup"],
}