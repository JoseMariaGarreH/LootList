import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

interface Params {
    params: {
        id: string
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { gameId, played, playing, wishlist, liked, rating } = await request.json();

        // Busca el registro ProfileGame
        const profileGame = await prisma.profileGame.upsert({
            where: {
                profileId_gameId: {
                    profileId: Number(params.id),
                    gameId: Number(gameId),
                },
            },
            update: {
                played,
                playing,
                wishlist,
                liked,
                rating,
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

        return NextResponse.json(profileGame);
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar el estado" }, { status: 500 });
    }
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