"use server"

import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

// Esta función recoge todos los juegos de la base de datos
export async function GET() {
    try {
        const games = await prisma.games.findMany()
        return NextResponse.json(games)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los juegos",
        }, {
            status: 500
        })
    }
}