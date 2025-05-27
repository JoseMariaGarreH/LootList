'use server'

import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { prisma } from '../lib/prisma';

// import tu base de datos
export async function requestPasswordReset(email: string) {
  const token = uuidv4();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

  // Guardar el token en la base de datos
  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  // Enviar email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: 'Restablecimiento de contraseña',
    html: `<p>Haz clic <a href="${resetLink}">aquí</a> para cambiar tu contraseña</p>`,
  });

  return { success: true };
}
