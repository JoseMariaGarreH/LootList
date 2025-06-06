"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Funcióm para crear un nuevo comentario por un usuario en un juego específico
export async function POST(request: Request) {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { profileId, gameId, content } = await request.json();

        // Validamos que los datos requeridos estén presentes y sean correctos
        if (!profileId) {
            return NextResponse.json({ message: "profileId es requerido" }, { status: 400 });
        }
        if (!gameId) {
            return NextResponse.json({ message: "gameId es requerido" }, { status: 400 });
        }
        if (!content || typeof content !== "string" || !content.trim()) {
            return NextResponse.json({ message: "El contenido del comentario es requerido" }, { status: 400 });
        }

        // Creamos el nuevo comentario en la base de datos, según los datos proporcionados
        const comment = await prisma.comments.create({
            data: { profileId, gameId, content }
        });
        // Devolvemos el comentario creado como respuesta
        return NextResponse.json(comment);
    } catch (error: any) {
        // En caso de error, registramos el error en la consola y devolvemos un mensaje de error
        console.error("Error al crear comentario:", error);

        // Prisma error
        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "Comentario duplicado o restricción de unicidad" },
                { status: 409 }
            );
        }
        // Error genérico
        return NextResponse.json(
            { message: "Error al crear el comentario" },
            { status: 500 }
        );
    }
}