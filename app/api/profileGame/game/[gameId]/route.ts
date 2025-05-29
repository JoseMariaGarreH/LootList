import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request, { params }: { params: { gameId: string } }) {
    try {
        const profileGames = await prisma.profileGame.findMany({
            where: { gameId: Number(params.gameId) },
        });
        return NextResponse.json(profileGames);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener datos globales" }, { status: 500 });
    }
}