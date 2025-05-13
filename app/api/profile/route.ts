"use server"

import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const profiles = await prisma.profiles.findMany()
        return NextResponse.json(profiles)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los usuarios",
        }, {
            status: 500
        })
    }
}