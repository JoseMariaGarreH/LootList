"use server"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// Función para obtener todos los perfiles que están asociados a un usuario específico
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // Verificamos si hay un ID en los parámetros
        if (!id) {
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        // Buscamos el perfil del usuario por su ID
        const profile = await prisma.profile.findUnique({
            where: { userId: Number(id) },
        });

        // Si no se encuentra el perfil, devolvemos un mensaje de error 404
        if (!profile) {
            return NextResponse.json(
                { message: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        // Si se encuentra el perfil, devolvemos sus datos en formato JSON
        return NextResponse.json(profile);
    } catch (error) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error al obtener el perfil:", error);
        return NextResponse.json(
            { message: "Error al obtener el perfil" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { message: "No autorizado" },
                { status: 401 }
            );
        }

        const user = await prisma.consumer.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        const profile = await prisma.profile.findUnique({
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
            username,
            email,
        } = body;

        // Actualiza el usuario si hay cambios en username o email
        if (username || email) {
            await prisma.consumer.update({
                where: { id: user.id },
                data: {
                    username: username,
                    email: email,
                },
            });
        }

        const updatedProfile = await prisma.profile.update({
            where: { userId: user.id },
            data: {
                name,
                firstSurname,
                secondSurname,
                bio,
                location,
                pronoun,
                updatedAt: new Date(),
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