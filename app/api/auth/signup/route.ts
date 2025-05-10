import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json()

        const userEmailFound = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (userEmailFound) {
            return NextResponse.json({
                message: "El correo ya está registrado",
            }, {
                status: 400
            })
        }

        const userNameFound = await prisma.users.findUnique({
            where: {
                username: username
            }
        })

        if (userNameFound) {
            return NextResponse.json({
                message: "El nombre de usuario ya está registrado",
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear usuario y perfil asociado en una transacción
        const newUser = await prisma.$transaction(async () => {
            const user = await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            await prisma.profiles.create({
                data: {
                    userId: user.id,
                    bio: "",
                    location: "",
                    pronoun: "",
                    profileImage: "",
                },
            });

            return user;
        });

        const { password: _, ...user } = newUser

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: "Error al registrar el usuario",
        }, {
            status: 500
        })
    }
}