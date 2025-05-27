import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        // Buscar el token
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expires < new Date()) {
            return NextResponse.json(
                { success: false, message: "Token inválido o expirado" },
                { status: 400 }
            );
        }

        // Buscar el usuario por email
        const user = await prisma.users.findUnique({
            where: { email: resetToken.email },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        // Hashear la nueva contraseña y actualizar
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        // Eliminar el token
        await prisma.passwordResetToken.delete({
            where: { token },
        });

        return NextResponse.json({ success: true, message: "Contraseña cambiada correctamente" });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Error al cambiar la contraseña" },
            { status: 500 }
        );
    }
}