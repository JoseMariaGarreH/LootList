"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.users.findMany()
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los usuarios",
        }, {
            status: 500
        })
    }
}

export async function POST(request: Request) {

    try {
        const { username, email, password } = await request.json()

        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password
            },
        })

        return NextResponse.json(newUser)
    } catch (error) {
        return NextResponse.json({
            message: "Error al crear el usuario",
        }, {
            status: 500
        })
    }
}

