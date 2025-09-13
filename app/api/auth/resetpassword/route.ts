"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

// Función para cambiar la contraseña de un usuario usando un token de restablecimiento
export async function POST(request: Request) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { token, password } = await request.json();

        // Buscar el token
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        // Verificar si el token existe y no ha expirado
        if (!resetToken || resetToken.expires < new Date()) {
            return NextResponse.json(
                { success: false, message: "Token inválido o expirado" },
                { status: 400 }
            );
        }

        // Buscar el usuario por email
        const user = await prisma.consumer.findUnique({
            where: { email: resetToken.email },
        });

        // Verificar si el usuario existe
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Hashear la nueva contraseña y actualizar
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.consumer.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        // Eliminar el token
        await prisma.passwordResetToken.delete({
            where: { token },
        });

        // Respuesta exitosa
        return NextResponse.json({ success: true, message: "Contraseña cambiada correctamente" });
    } catch (error: any) {
        // Muestra el error si ocurre un problema en la ejecución de la operación de cambio de contraseña
        return NextResponse.json(
            { success: false, message: error.message || "Error al cambiar la contraseña" },
            { status: 500 }
        );
    }
}