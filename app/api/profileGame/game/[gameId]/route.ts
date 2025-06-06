"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función para obtener todos los perfiles de juego asociados a un gameId específico
export async function GET(request: Request, { params }: { params: { gameId: string } }) {
    try {
        // Busca todos los registros de profileGame que correspondan al gameId recibido por parámetro
        const profileGames = await prisma.profileGame.findMany({
            where: { gameId: Number(params.gameId) },
        });
        // Si todo sale bien, devuelve los registros encontrados en formato JSON
        return NextResponse.json(profileGames);
    } catch (error) {
        // Si ocurre un error, devuelve un mensaje de error y status 500
        return NextResponse.json({ message: "Error al obtener datos globales" }, { status: 500 });
    }
}