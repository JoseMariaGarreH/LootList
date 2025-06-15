"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Definimos los parámetros que recibirá la función POST y GET
interface Params {
    params: {
        id: string
    }
}

// Esta función actualiza o crea un registro de ProfileGame para un usuario específico
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { gameId, played, playing, wishlist, liked, rating } = await request.json();

        // Añade o actualiza el registro de ProfileGame en la base de datos
        const profileGame = await prisma.profileGame.upsert({
            where: {
                profileId_gameId: {
                    profileId: Number(params.id),
                    gameId: Number(gameId),
                },
            },
            update: {
                played: !!played,
                playing: !!playing,
                wishlist: !!wishlist,
                liked: !!liked,
                rating: rating ?? null,
                updatedAt: new Date(),
            },
            create: {
                profileId: Number(params.id),
                gameId: Number(gameId),
                played: !!played,
                playing: !!playing,
                wishlist: !!wishlist,
                liked: !!liked,
                rating: rating ?? null,
            },
        });

        // Si la operación es exitosa, devuelve el registro actualizado o creado
        return NextResponse.json(profileGame);
    } catch (error) {
        // Loguea el error real para depuración
        console.error("Error real al actualizar el estado:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ message: "Error al actualizar el estado", error: errorMessage }, { status: 500 });
    }
}

// Esta función obtiene todos los juegos que estan asiociados a un perfil de juego específico
export async function GET(request: Request, { params }: Params) {
    try {
        // Busca el perfil de usuario por su ID
        const profile = await prisma.profiles.findUnique({
            where: {
                userId: Number(params.id)
            }
        });

        // Si no se encuentra el perfil, devuelve un mensaje de error 404
        if (!profile) {
            return NextResponse.json({ message: "Perfil no encontrado" }, { status: 404 });
        }

        // Busca todos los juegos asociados al perfil encontrado
        const profileGames = await prisma.profileGame.findMany({
            where: {
                profileId: profile.id
            },
            include: {
                game: true
            }
        });

        // Si se encuentran juegos asociados al perfil, devuelve los datos en formato JSON
        return NextResponse.json(profileGames);
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error al obtener los juegos del perfil:", error);
        return NextResponse.json({ message: "Error al obtener los juegos del perfil" }, { status: 500 });
    }
}