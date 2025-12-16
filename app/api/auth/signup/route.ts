import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt"

// URL por defecto para la imagen de perfil
const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dyczqjlew/image/upload/v1747501573/jybzlcwtyskmwk3azgxu.jpg"

// Función para registrar un nuevo usuario
export async function POST(request: Request) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, email, password } = await request.json()

        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // Validar que se hayan proporcionado todos los campos necesarios
        const userEmailFound = await prisma.consumer.findUnique({
            where: {
                email: email
            }
        })


        // Si el correo ya está registrado, devolver un error 400
        if (userEmailFound) {
            return NextResponse.json({
                message: "El correo ya está registrado",
            }, {
                status: 400
            })
        }

        // Buscamos el nombre de usuario en la base de datos, según el nombre de usuario proporcionado
        const userNameFound = await prisma.consumer.findUnique({
            where: {
                username: username
            }
        })

        // Si el nombre de usuario ya está registrado, devolver un error 400
        if (userNameFound) {
            return NextResponse.json({
                message: "El nombre de usuario ya está registrado",
            }, {
                status: 400
            })
        }

        // Si el correo y el nombre de usuario son únicos, encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.$transaction(async (tx) => {

            const user = await tx.consumer.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    rolId: 2,
                },
            });

            await tx.profile.create({
                data: {
                    userId: user.id,
                    bio: "",
                    location: "",
                    pronoun: "",
                    profileImage: DEFAULT_AVATAR_URL,
                },
            });

            return user;
        });

        // Excluir el campo de contraseña del objeto de usuario antes de devolverlo
        // Usamos el operador de desestructuración para eliminar la contraseña del objeto
        const { password: _, ...user } = newUser
        // Devolver el usuario creado sin la contraseña
        return NextResponse.json(user)
    } catch (error) {
        console.error("[signup] Error al registrar el usuario:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2002: Unique constraint failed
            if (error.code === "P2002") {
                const target = (error.meta as { target?: string[] } | undefined)?.target;
                const targetStr = Array.isArray(target) ? target.join(",") : "";

                if (targetStr.includes("email")) {
                    return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 });
                }
                if (targetStr.includes("username")) {
                    return NextResponse.json({ message: "El nombre de usuario ya está registrado" }, { status: 400 });
                }
                return NextResponse.json({ message: "Datos duplicados" }, { status: 400 });
            }

            // P2003: Foreign key constraint failed
            if (error.code === "P2003") {
                return NextResponse.json(
                    { message: "Error de integridad: falta el rol por defecto en la base de datos" },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(
            { message: "Error al registrar el usuario" },
            { status: 500 }
        );
    }
}