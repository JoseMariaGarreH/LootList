"use server"

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/src/lib/prisma';

cloudinary.config({ 
    cloud_name: 'dyczqjlew', 
    api_key: '388522924768573', 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function PUT(request: Request) {
    const data = await request.formData();
    const image = data.get('image');
    const userIdValue = data.get('userId');

    if (!userIdValue) {
        return NextResponse.json('No se ha recibido el id del usuario', { status: 400 });
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

        await prisma.profiles.update({
            where: { userId },
            data: { profileImage: response.secure_url }
        });
        return NextResponse.json({
            message: 'Imagen subida correctamente',
            url: response.secure_url
        }, { status: 200 });
    }

    return NextResponse.json('No se ha subido una imagen', { status: 400 });
}