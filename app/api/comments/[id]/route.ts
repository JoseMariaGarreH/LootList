"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función para obtener todos los comentarios de un juego específico por su ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // Verifica que el ID del juego sea un número válido
        const gameId = Number(id);
        // Si el ID no es un número, devuelve un error 400
        if (isNaN(gameId)) {
            return NextResponse.json(
                { message: "ID de juego inválido" },
                { status: 400 }
            );
        }
        // Busca todos los comentarios asociados al gameId proporcionado
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
        // Si ha salido bien, devuelve los comentarios encontrados en formato JSON
        return NextResponse.json(comments);
    } catch (error: any) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error al obtener comentarios:", error);
        return NextResponse.json(
            { message: "Error al obtener los comentarios", error: error?.message || error },
            { status: 500 }
        );
    }
}

// Función que actualiza un comentario específico por su ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // Verifica que el ID sea un número válido
        const commentId = Number(id);
        // Si el ID no es un número, devuelve un error 400
        if (isNaN(commentId)) {
            return NextResponse.json(
                { message: "ID de comentario inválido" },
                { status: 400 }
            );
        }

        // Carga el comentario a actualizar desde el cuerpo de la solicitud
        const { content } = await request.json();
        // Permitir string vacío, solo rechazar si es undefined o no string
        if (typeof content !== "string") {
            return NextResponse.json(
                { message: "El contenido del comentario debe ser un string" },
                { status: 400 }
            );
        }

        // Actualiza el comentario en la base de datos
        const updatedComment = await prisma.comments.update({
            where: { id: commentId },
            data: { content }
        });

        // Si la actualización es exitosa, devuelve el comentario actualizado en formato JSON
        return NextResponse.json(updatedComment);
    } catch (error: any) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error al actualizar comentario:", error);
        return NextResponse.json(
            { message: "Error al actualizar el comentario", error: error?.message || error },
            { status: 500 }
        );
    }
}

// Función que elimina un comentario específico por su ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const commentId = Number(id);
        if (isNaN(commentId)) {
            return NextResponse.json(
                { message: "ID de comentario inválido" },
                { status: 400 }
            );
        }

        // Busca el comentario para obtener profileId y gameId
        const comment = await prisma.comments.findUnique({ where: { id: commentId } });
        if (!comment) {
            return NextResponse.json(
                { message: "Comentario no encontrado" },
                { status: 404 }
            );
        }

        // Borra el comentario
        await prisma.comments.delete({ where: { id: commentId } });

        // Resetea los datos de ProfileGame asociados al comentario eliminado
        await prisma.profileGame.updateMany({
            where: {
                profileId: comment.profileId,
                gameId: comment.gameId,
            },
            data: {
                rating: null,
                liked: false,
                played: false,
                playing: false,
                wishlist: false,
            },
        });

        // Si todo sale bien, devuelve una respuesta vacía con estado 200
        return NextResponse.json({}, { status: 200 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                { message: "Comentario no encontrado" },
                { status: 404 }
            );
        }
        console.error("Error al eliminar comentario:", error);
        return NextResponse.json(
            { message: "Error al eliminar el comentario", error: error?.message || error },
            { status: 500 }
        );
    }
}