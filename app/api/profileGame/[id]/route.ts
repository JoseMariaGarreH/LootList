import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

interface Params {
    params: {
        id: string
    }
}

export async function POST(request: Request, { params }: Params) {

    const { gameId, rating, liked, status } = await request.json();

    console.log("params", params);
    console.log("gameId", gameId);
    console.log("rating", rating);
    console.log("liked", liked);
    console.log("status", status);

    // Busca el perfil del usuario autenticado
    const profile = await prisma.profiles.findUnique({
        where: {
            userId: Number(params.id)
        }
    });

    if (!profile) {
        return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    // Crea o actualiza el registro en ProfileGame
    const profileGame = await prisma.profileGame.upsert({
        where: {
            profileId_gameId: {
                profileId: profile.id,
                gameId: Number(gameId)
            }
        },
        update: {
            rating: rating ?? 0,
            liked: liked ?? false,
            status: status ?? "",
        },
        create: {
            profileId: profile.id,
            gameId: Number(gameId),
            rating: rating ?? 0,
            liked: liked ?? false,
            status: status ?? "",
        }
    });

    return NextResponse.json(profileGame);
}

export async function GET(request: Request, { params }: Params) {
    try {
        const profile = await prisma.profiles.findUnique({
            where: {
                userId: Number(params.id)
            }
        });

        if (!profile) {
            return NextResponse.json({ message: "Perfil no encontrado" }, { status: 404 });
        }

        const profileGames = await prisma.profileGame.findMany({
            where: {
                profileId: profile.id
            },
            include: {
                game: true
            }
        });

        return NextResponse.json(profileGames);
    } catch (error) {
        console.error("Error al obtener los juegos del perfil:", error);
        return NextResponse.json({ message: "Error al obtener los juegos del perfil" }, { status: 500 });
    }
}