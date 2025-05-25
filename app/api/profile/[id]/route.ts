"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        
        if (!params.id) {
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        const profile = await prisma.profiles.findUnique({
            where: { userId: Number(params.id) },
        });

        if (!profile) {
            return NextResponse.json(
                { message: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error al obtener el perfil:", error);
        return NextResponse.json(
            { message: "Error al obtener el perfil" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log("params", params);
        if (!params.id) {
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        const user = await prisma.users.findUnique({
            where: { id: Number(params.id) },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        const profile = await prisma.profiles.findUnique({
            where: { userId: user.id },
        });

        if (!profile) {
            return NextResponse.json(
                { message: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const {
            name,
            firstSurname,
            secondSurname,
            bio,
            location,
            pronoun,
        } = body;

        const updatedProfile = await prisma.profiles.update({
            where: { userId: user.id },
            data: {
                name,
                firstSurname,
                secondSurname,
                bio,
                location,
                pronoun,
            },
        });

        console.log("Updated Profile:", updatedProfile);
        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        return NextResponse.json(
            { message: "Error al actualizar el perfil" },
            { status: 500 }
        );
    }
}