"use server"

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Esta función recoge los datos de un usuario específico por su ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // Recuperamos un usuario de la base de datos usando el ID proporcionado en los parámetros
        const user = await prisma.users.findFirst({
            where: {
                id: Number(id)
            }
        })

        // Si no se encuentra el usuario seleccionado, devolvemos un mensaje de error 404
        if(!user) {
            return NextResponse.json({
                message: "User not found"
            }, { 
                status: 404 
            });
        }

        // Si se encuentra el usuario, devolvemos sus datos en formato JSON
        return NextResponse.json({
            user
        })
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.log("Error fetching user:", error);
        return NextResponse.json({
            message: "Error fetching user"
        }, { 
            status: 500 
        });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { password } = await request.json();

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUserPassword = await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updateUserPassword);
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return NextResponse.json(
            {
                message: "Error al actualizar la contraseña",
            },
            {
                status: 500,
            }
        );
    }
}