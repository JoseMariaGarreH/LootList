"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request, { params }: { params: { profileId: string } }) {
    try {
        const comments = await prisma.comments.findMany({
            where: { profileId: Number(params.profileId) },
            include: { game: true }, // Incluye los detalles del juego asociado al comentario
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener comentarios" }, { status: 500 });
    }
}