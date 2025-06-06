"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función para obtener todos los usuarios
export async function GET() {
    try {
        // Obtenemos todos los usuarios de la base de datos
        const users = await prisma.users.findMany()
        // Si todo sale bien, devolvemos los usuarios en formato JSON
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los usuarios",
        }, {
            status: 500
        })
    }
}

// Función para crear un nuevo usuario
export async function POST(request: Request) {
    try {
        // Guardamos los datos del usuario que vienen en el cuerpo de la solicitud
        const { username, email, password } = await request.json()

        // Creamos un nuevo usuario en la base de datos
        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password
            },
        })

        // Si todo sale bien, devolvemos el nuevo usuario en formato JSON
        return NextResponse.json(newUser)
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        return NextResponse.json({
            message: "Error al crear el usuario",
        }, {
            status: 500
        })
    }
}

