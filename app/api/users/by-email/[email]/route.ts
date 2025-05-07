import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

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