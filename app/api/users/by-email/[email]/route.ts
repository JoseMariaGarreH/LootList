import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface Params {
    params: {
        email: string
    }
}

export async function GET(request : Request, { params }: Params) {
    try{
        const user = await prisma.users.findFirst({
            where: {
                email: params.email
            }
        })

        if(!user) {
            return NextResponse.json({
                message: "User by email not found"
            }, { 
                status: 404 
            });
        }

        console.log("added User by email:", user);

        return NextResponse.json({
            user
        })
    } catch (error) {
        console.log("Error fetching user by email:", error);
        return NextResponse.json({
            message: "Error fetching user by email"
        }, { 
            status: 500 
        });
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { password, email } = await request.json();

        console.log("email", email);
        console.log("password", password);

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const updateUserPassword = await prisma.users.update({
            where: {
                email: params.email,
            },
            data: {
                password: hashedPassword, // Guardar la contraseña hasheada
            },
        });

        console.log("updateUserPassword", updateUserPassword);

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