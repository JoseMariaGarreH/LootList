import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { pages } from "next/dist/build/templates/app-page";

const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)

                const userFound = await prisma.users.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!userFound) {
                    throw new Error("No existe el usuario");
                }

                const matchPassword = credentials?.password 
                    ? await bcrypt.compare(credentials.password, userFound.password) 
                    : false;
                                                        
                if (matchPassword) throw new Error("Contraseña incorrecta");

                return {
                    id: userFound.id.toString(),
                    username: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages:{
        signIn: "/login",
    }
}

const handler = NextAuth(
    authOptions
);

export { handler as GET, handler as POST };