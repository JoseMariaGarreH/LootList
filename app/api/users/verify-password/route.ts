"use server"

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Función para verificar la contraseña de un usuario
export async function POST(request: Request) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { email, password } = await request.json();

        // Buscar al usuario por correo electrónico
        const user = await prisma.users.findUnique({
            where: { email },
        });

        // Si el usuario no existe, devolver un error 404
        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Verificar la contraseña encriptada del usuario
        // Usamos bcrypt para comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, devolver un error 401
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Contraseña incorrecta" },
                { status: 401 }
            );
        }

        // Si la contraseña es correcta, devolver un mensaje de éxito
        return NextResponse.json({ message: "Contraseña verificada correctamente" });
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error al verificar la contraseña:", error);
        return NextResponse.json(
            { message: "Error al verificar la contraseña" },
            { status: 500 }
        );
    }
}