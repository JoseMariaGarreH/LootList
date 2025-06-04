"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
    try {
        const { profileId, gameId, content } = await request.json();

        if (!profileId) {
            return NextResponse.json({ message: "profileId es requerido" }, { status: 400 });
        }
        if (!gameId) {
            return NextResponse.json({ message: "gameId es requerido" }, { status: 400 });
        }
        if (!content || typeof content !== "string" || !content.trim()) {
            return NextResponse.json({ message: "El contenido del comentario es requerido" }, { status: 400 });
        }

        const comment = await prisma.comments.create({
            data: { profileId, gameId, content }
        });

        return NextResponse.json(comment);
    } catch (error: any) {
        console.error("Error al crear comentario:", error);

        // Prisma error
        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "Comentario duplicado o restricción de unicidad" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Error al crear el comentario" },
            { status: 500 }
        );
    }
}