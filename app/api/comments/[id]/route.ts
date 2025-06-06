"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función para obtener todos los comentarios de un juego específico por su ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        // Verifica que el ID del juego sea un número válido
        const gameId = Number(params.id);
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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        // Verifica que el ID sea un número válido
        const id = Number(params.id);
        // Si el ID no es un número, devuelve un error 400
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "ID de comentario inválido" },
                { status: 400 }
            );
        }

        // Carga el comentario a actualizar desde el cuerpo de la solicitud
        const { content } = await request.json();
        // Verifica que el contenido del comentario sea una cadena no vacía
        if (!content || typeof content !== "string" || !content.trim()) {
            return NextResponse.json(
                { message: "El contenido del comentario es requerido" },
                { status: 400 }
            );
        }

        // Actualiza el comentario en la base de datos
        const updatedComment = await prisma.comments.update({
            where: { id },
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