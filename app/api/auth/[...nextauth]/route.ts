import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const userFound = await prisma.users.findUnique({
                    where: { email: credentials?.email }
                });

                if (!userFound) throw new Error("No existe el usuario");
                if (!credentials?.password) throw new Error("No se proporcionó contraseña");

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                if (!matchPassword) throw new Error("Contraseña incorrecta");

                return { id: userFound.id.toString(), username: userFound.username, email: userFound.email };
            }
        })
    ],
    pages: { signIn: "/auth/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };