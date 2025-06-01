import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const gameId = Number(params.id);
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
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { content } = await request.json();
    console.log("Actualizando comentario con id:", id, "Nuevo contenido:", content);
    
    const updatedComment = await prisma.comments.update({
        where: { id },
        data: { content }
    });
    
    console.log("Comentario actualizado:", updatedComment);
    return NextResponse.json(updatedComment);
}