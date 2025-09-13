import { authOptions } from "@/src/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    console.log("Sesión obtenida en requireAuth:", session);

    if (!session?.user) {
        return NextResponse.json(
            { message: "No autorizado" },
            { status: 401 }
        );
    }
    
    return session;
}

export async function requireRole(allowedRoles: string[]) {
    const session = await getServerSession(authOptions);

    console.log("Sesión obtenida en requireRole:", session);
    
    if (!session?.user) {
        return NextResponse.json(
            { message: "No autorizado" },
            { status: 401 }
        );
    }
    
    if (!allowedRoles.includes(session.user.role)) {
        return NextResponse.json(
            { message: "No tienes permisos para realizar esta acción" },
            { status: 403 }
        );
    }
    
    return session;
}