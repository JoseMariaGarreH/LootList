"use server"

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
        };
    }

    interface User {
        id: string;
        email: string;
        username: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Buscar el usuario en la base de datos
                const userFound = await prisma.users.findUnique({
                    where: { email: credentials?.email }
                });

                if (!userFound) throw new Error("No existe el usuario");
                if (!credentials?.password) throw new Error("No se proporcionó contraseña");

                // Verificar la contraseña
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                if (!matchPassword) throw new Error("Contraseña incorrecta");

                // Retornar el usuario con los campos necesarios
                return {
                    id: userFound.id.toString(),
                    email: userFound.email,
                    username: userFound.username
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Agregar el username al objeto session.user
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    username: token.username as string
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            // Si hay un usuario (login), añade los datos
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
            } else if (token?.id) {
                // Refresca los datos del usuario en cada petición
                const userInDb = await prisma.users.findUnique({
                    where: { id: Number(token.id) },
                    select: { id: true, email: true, username: true }
                });
                if (userInDb) {
                    token.email = userInDb.email;
                    token.username = userInDb.username;
                }
            }
            return token;
        }
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };