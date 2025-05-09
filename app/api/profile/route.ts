"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET() {
    try {
        const profiles = await prisma.profiles.findMany()
        return NextResponse.json(profiles)
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener los usuarios",
        }, {
            status: 500
        })
    }
}


export async function PUT(request: Request) {
    // try {
    //     // Obtener la sesión del usuario
    //     const session = await getServerSession();

    //     console.log("Session User ID:", session);

    //     if (!session?.user?.email) {
    //         return NextResponse.json(
    //             { message: "No autorizado" },
    //             { status: 401 }
    //         );
    //     }

    //     const user = await prisma.users.findUnique({
    //         where: { email: session.user.email },
    //     });

    //     if (!user) {
    //         return NextResponse.json(
    //             { message: "Usuario no encontrado" },
    //             { status: 404 }
    //         );
    //     }

    //     const profile = await prisma.profiles.findUnique({
    //         where: { userId: user.id },
    //     });

    //     if (!profile) {
    //         return NextResponse.json(
    //             { message: "Perfil no encontrado" },
    //             { status: 404 }
    //         );
    //     }

    //     const body = await request.json();
    //     const {
    //         name,
    //         firstSurname,
    //         SecondSurname,
    //         bio,
    //         location,
    //         pronoun,
    //         profileImage
    //     } = body;

    //     const updatedProfile = await prisma.profiles.update({
    //         where: { userId: user.id },
    //         data: {
    //             name,
    //             firstSurname,
    //             SecondSurname,
    //             bio,
    //             location,
    //             pronoun,
    //             profileImage,
    //         },
    //     });


    //     console.log("Updated Profile:", updatedProfile);
    //     return NextResponse.json(updatedProfile);
    // } catch (error) {
    //     console.error("Error al actualizar el perfil:", error);
    //     return NextResponse.json(
    //         { message: "Error al actualizar el perfil" },
    //         { status: 500 }
    //     );
    // }
}