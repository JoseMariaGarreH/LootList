"use server"

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

// Definimos los parámetros que recibirá la función GET, DELETE y PUT
interface Params {
    params: {
        id: string
    }
}
// Esta función recoge los datos de un usuario específico por su ID
export async function GET(request : Request, { params }: Params) {
    try{
        // Recuperamos un usuario de la base de datos usando el ID proporcionado en los parámetros
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        // Si no se encuentra el usuario seleccionado, devolvemos un mensaje de error 404
        if(!user) {
            return NextResponse.json({
                message: "User not found"
            }, { 
                status: 404 
            });
        }

        // Si se encuentra el usuario, devolvemos sus datos en formato JSON
        return NextResponse.json({
            user
        })
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.log("Error fetching user:", error);
        return NextResponse.json({
            message: "Error fetching user"
        }, { 
            status: 500 
        });
    }
}

export async function DELETE(request : Request, { params }: Params){
    try{
        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(params.id)
            }
        })

        if(!deletedUser) {
            return NextResponse.json({
                message: "User not found"
            }, { 
                status: 404 
            });
        }

        return NextResponse.json({
            user: deletedUser
        })
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) {
            
            if (error.code === 'P2025') {
                return NextResponse.json({
                    message: "User not found"
                }, { 
                    status: 404 
                });
            }

            return NextResponse.json({
                message: "Error fetching user"
            }, { 
                status: 500 
            });
        }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { password } = await request.json();

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUserPassword = await prisma.users.update({
            where: {
                id: Number(params.id),
            },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updateUserPassword);
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return NextResponse.json(
            {
                message: "Error al actualizar la contraseña",
            },
            {
                status: 500,
            }
        );
    }
}