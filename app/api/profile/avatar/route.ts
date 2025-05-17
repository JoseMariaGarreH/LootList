import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/src/lib/prisma';

cloudinary.config({ 
    cloud_name: 'dyczqjlew', 
    api_key: '388522924768573', 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {

    const data = await request.formData()
    console.log('data', data.get('image'));
    const image = data.get('image') as File;

    if(!image) {
        return NextResponse.json('No se ha subido una imagen',{
            status: 400
        });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        })
        .end(buffer);
    });

    console.log('response', response);
    // guardar en la base de datos
    const userIdValue = data.get('userId');
    if (!userIdValue) {
        return NextResponse.json('No se ha recibido el id del usuario', {
            status: 400
        });
    }
    const userId = Number(userIdValue);

    await prisma.profiles.update({
        where: {
            userId: userId
        },
        data: {
            profileImage: response.secure_url
        }
    });
    return NextResponse.json({
        message: 'Imagen subida correctamente',
        url: response.secure_url
    }, {
        status: 200
    });
}