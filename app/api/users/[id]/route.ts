"use server"

import { prisma } from "@/src/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


interface Params {
    params: {
        id: string
    }
}

export async function GET(request : Request, { params }: Params) {
    try{
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        if(!user) {
            return NextResponse.json({
                message: "User not found"
            }, { 
                status: 404 
            });
        }

        return NextResponse.json({
            user
        })
    } catch (error) {
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

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            
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