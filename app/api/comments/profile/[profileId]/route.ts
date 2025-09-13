"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función que devolverá todos los comentarios de un perfil específico
export async function GET(request: Request, { params }: { params: Promise<{ profileId: string }> }) {
    try {
        const { profileId } = await params;
        const comments = await prisma.comment.findMany({
            where: { profileId: Number(profileId) },
            include: { game: true }, // Incluye los detalles del juego asociado al comentario
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener comentarios" }, { status: 500 });
    }
}