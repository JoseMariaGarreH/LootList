"use server"

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Buscar al usuario por correo electrónico
        const user = await prisma.users.findUnique({
            where: { email },
        });

        console.log("user", user);

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Contraseña incorrecta" },
                { status: 401 }
            );
        }

        return NextResponse.json({ message: "Contraseña verificada correctamente" });
    } catch (error) {
        console.error("Error al verificar la contraseña:", error);
        return NextResponse.json(
            { message: "Error al verificar la contraseña" },
            { status: 500 }
        );
    }
}