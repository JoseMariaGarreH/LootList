import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const gameId = Number(params.id);
        if (isNaN(gameId)) {
            return NextResponse.json(
                { message: "ID de juego inválido" },
                { status: 400 }
            );
        }
        const comments = await prisma.comments.findMany({
            where: { gameId },
            include: {
                profile: {
                    include: {
                        user: true,
                    }
                }
            }
        });
        return NextResponse.json(comments);
    } catch (error: any) {
        console.error("Error al obtener comentarios:", error);
        return NextResponse.json(
            { message: "Error al obtener los comentarios", error: error?.message || error },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "ID de comentario inválido" },
                { status: 400 }
            );
        }
        const { content } = await request.json();
        if (!content || typeof content !== "string" || !content.trim()) {
            return NextResponse.json(
                { message: "El contenido del comentario es requerido" },
                { status: 400 }
            );
        }

        const updatedComment = await prisma.comments.update({
            where: { id },
            data: { content }
        });

        return NextResponse.json(updatedComment);
    } catch (error: any) {
        console.error("Error al actualizar comentario:", error);
        return NextResponse.json(
            { message: "Error al actualizar el comentario", error: error?.message || error },
            { status: 500 }
        );
    }
}