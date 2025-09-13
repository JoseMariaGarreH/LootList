"use server"

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { prisma } from "@/src/lib/prisma";

// Esta función maneja la solicitud POST para enviar un correo de restablecimiento de contraseña
export async function POST(request: Request) {
    try {
        // Extraer el email del cuerpo de la solicitud, al que se le va enviar el enlace de restablecimiento de contraseña
        const { email } = await request.json();

        // Verifica que el email exista en la base de datos
        const user = await prisma.consumer.findUnique({
            where: { email },
        });

        // Si no se encuentra el usuario, devuelve un error 404
        if (!user) {
            return NextResponse.json(
                { success: false, message: "No existe un usuario registrado con ese correo" },
                { status: 404 }
            );
        }
        // Generar un token único para el restablecimiento de contraseña
        const token = uuidv4();
        const expires = new Date(Date.now() + 30 * 30 * 1000); // el token durará15 minutos

        // Guardar el token en la base de datos
        await prisma.passwordResetToken.create({
            data: { userId: user.id, email, token, expires },
        });

        // Enviar email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Crear el enlace de restablecimiento de contraseña
        const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/resetpassword?token=${token}`;

        // Enviar el correo electrónico con el enlace de restablecimiento de contraseña
        // Con un diseño personalizado de email
        await transporter.sendMail({
            to: email,
            subject: 'Restablecimiento de contraseña',
            html: `
                <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #457b9d; padding: 32px; border-radius: 10px; max-width: 600px; margin: auto; color: #f1faee;">
                    <h2 style="color: #f1faee; margin-bottom: 12px;">Restablece tu contraseña</h2>
                    <p style="margin: 0 0 16px;">Hola,</p>
                    <p style="margin: 0 0 16px;">
                        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, puedes ignorar este correo.
                    </p>
                    <p style="margin: 0 0 16px;">
                        Para cambiar tu contraseña, haz clic en el botón a continuación:
                    </p>
                    <div style="text-align: center; margin: 24px 0;">
                        <a href="${resetLink}" style="background-color: #e63946; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                            Cambiar contraseña
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #a8dadc; margin-top: 16px;">
                        Este enlace expirará en 15 minutos.
                    </p>
                    <p style="font-size: 12px; color: #a8dadc; margin-top: 32px;">
                        Si tienes problemas, contacta con el equipo de soporte de <strong style="color: #f1faee;">LootList</strong>.
                    </p>
                </div>
            `,
        });

        // Respuesta exitosa en caso de que el correo se envíe correctamente
        return NextResponse.json({ success: true, message: "Correo enviado con éxito" });
    } catch (error: any) {
        // Muestra el error si ocurre un problema en la ejecución de la operación de envío de correo
        return NextResponse.json(
            { success: false, message: error.message || "No se pudo enviar el correo" },
            { status: 500 }
        );
    }
}