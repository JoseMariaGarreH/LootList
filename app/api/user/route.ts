import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(){
    try{
        const users = await prisma.user.findMany()
        return NextResponse.json(users)
    }catch(error){
        return NextResponse.json({
            message: "Error al obtener los usuarios",
        },{
            status: 500
        })
    }
}

export function POST(request : Request){

    return NextResponse.json({
        message: "creating user"
    })
}