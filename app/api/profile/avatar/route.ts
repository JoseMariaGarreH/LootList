"use server"

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/src/lib/prisma';

// Configura Cloudinary con las variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function PUT(request: Request) {
    try {
        // Obtiene los datos del formulario enviados en la petición
        const data = await request.formData();
        const image = data.get('image');
        const userIdValue = data.get('userId');

        // Valida que se haya recibido el userId
        if (!userIdValue) {
            return NextResponse.json(
                { message: 'No se ha recibido el id del usuario' },
                { status: 400 }
            );
        }
        const userId = Number(userIdValue);

        // Si image es una URL (string), solo actualiza el campo en la base de datos
        if (typeof image === "string" && image.startsWith("https")) {
            await prisma.profiles.update({
                where: { userId },
                data: { profileImage: image }
            });
            return NextResponse.json({
                message: 'Avatar restablecido',
                url: image
            }, { status: 200 });
        }

        // Si image es un archivo, sigue el flujo normal de subida a Cloudinary
        if (image instanceof File) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const response = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }).end(buffer);
            });

            // Verifica que la respuesta de Cloudinary contenga una URL segura
            if (!response?.secure_url) {
                return NextResponse.json(
                    { message: 'Error al subir la imagen a Cloudinary' },
                    { status: 500 }
                );
            }

            // Actualiza el perfil del usuario con la URL de la imagen subida en Cloudinary
            await prisma.profiles.update({
                where: { userId },
                data: { profileImage: response.secure_url }
            });
            // Devuelve la URL de la imagen subida y un mensaje de éxito
            return NextResponse.json({
                message: 'Imagen subida correctamente',
                url: response.secure_url
            }, { status: 200 });
        }

        // Si no se ha subido una imagen válida, devuelve un error
        return NextResponse.json(
            { message: 'No se ha subido una imagen' },
            { status: 400 }
        );
    } catch (error: any) {
        // En caso de error, registrar el error y devolver un mensaje de error 500
        console.error("Error en PUT /api/profile/avatar:", error);
        return NextResponse.json(
            { message: 'Error interno del servidor', error: error?.message || error },
            { status: 500 }
        );
    }
}