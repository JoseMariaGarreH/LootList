import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Middleware para proteger rutas y gestionar redirecciones según el estado de autenticación
export async function middleware(request: NextRequest) {
    // Obtiene el token de sesión del usuario (si existe)
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    // Destaca si la ruta es una de las rutas de perfil del usuario
    const isProfileRoute =
        /^\/user\/[^\/]+$/.test(pathname);

    // Rutas específicas del usuario que requieren autenticación
    const isUserWishlistRoute = /^\/user\/[^\/]+\/wishlist$/.test(pathname);
    const isUserLikesRoute = /^\/user\/[^\/]+\/likes$/.test(pathname);
    const isUserReviewsRoute = /^\/user\/[^\/]+\/reviews$/.test(pathname);
    const isUserPlayingRoute = /^\/user\/[^\/]+\/playing$/.test(pathname);
    const isUserPlayedRoute = /^\/user\/[^\/]+\/played$/.test(pathname);

    // Si intenta acceder a rutas protegidas sin estar autenticado, redirige a login
    if (
        (
            pathname.startsWith("/settings") ||
            isProfileRoute ||
            isUserPlayedRoute ||
            isUserWishlistRoute ||
            isUserLikesRoute ||
            isUserPlayingRoute ||
            isUserReviewsRoute
        ) && !token
    ) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Si ya está autenticado e intenta acceder a login, signup, resetpassword o requestemail, redirige al home
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

    // Si no se cumple ninguna condición anterior, permite el acceso
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