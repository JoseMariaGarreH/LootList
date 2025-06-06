"use server"

import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

// Esta función recoge todos los perfiles de usuario de la base de datos
export async function GET() {
    try {
        const profiles = await prisma.profiles.findMany()
        return NextResponse.json(profiles)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los perfiles",
        }, {
            status: 500
        })
    }
}