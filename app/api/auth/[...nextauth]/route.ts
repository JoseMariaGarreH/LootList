import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

// Extiende los tipos de Session y User de next-auth para incluir id, email y username
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            role: string;
        };
    }

    interface User {
        id: string;
        email: string;
        username: string;
        role: string;
    }
}

// Configuración de NextAuth
export const authOptions: NextAuthOptions = {
    providers: [
        // Proveedor de autenticación por credenciales (email y contraseña)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const userFound = await prisma.consumer.findUnique({
                    where: { email: credentials?.email },
                    include: { role: true }
                });
                
                if (!userFound) throw new Error("No existe el usuario");
                if (!credentials?.password) throw new Error("No se proporcionó contraseña");

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                if (!matchPassword) throw new Error("Contraseña incorrecta");

                return {
                    id: userFound.id.toString(),
                    email: userFound.email,
                    username: userFound.username,
                    role: userFound.role.name
                };
            }
        })
    ],
    callbacks: {
        // Callback para manejar la sesión y añadir los datos del usuario
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    username: token.username as string,
                    role: token.role as string
                };
            }
            return session;
        },
        // Callback para manejar el token JWT y añadir los datos del usuario
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        }
    },
    // Página de inicio de sesión personalizada
    pages: {
        signIn: "/auth/login",
    },
    // Secreto para firmar los tokens
    secret: process.env.NEXTAUTH_SECRET,
};

// Crea el handler de NextAuth con la configuración definida
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };