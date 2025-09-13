"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/utils/auth";

export async function POST(request: Request) {

    const authResult = await requireRole(['ADMIN', 'USER']);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { profileId, gameId, content } = await request.json();

        if (!profileId) {
            return NextResponse.json({ message: "profileId es requerido" }, { status: 400 });
        }
        if (!gameId) {
            return NextResponse.json({ message: "gameId es requerido" }, { status: 400 });
        }
        if (typeof content !== "string") {
            return NextResponse.json({ message: "El contenido del comentario debe ser un string" }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: { profileId, gameId, content }
        });
        
        return NextResponse.json(comment);
    } catch (error: any) {
        console.error("Error al crear comentario:", error);

        return NextResponse.json(
            { message: "Error al crear el comentario" },
            { status: 500 }
        );
    }
}