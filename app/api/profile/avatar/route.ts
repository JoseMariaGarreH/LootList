import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import { prisma } from '@/src/lib/prisma';

// Configuration
cloudinary.config({ 
    cloud_name: 'dyczqjlew', 
    api_key: '388522924768573', 
    api_secret: 'OnJd78B-4af0HQrAd7zbIa7N11w' // Click 'View API Keys' above to copy your API secret
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

    // const filePath = path.join(process.cwd(), 'public', image.name);
    // guardar en un archivo
    // await writeFile(filePath, buffer)
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
    if (!userIdValue || typeof userIdValue !== 'string' || isNaN(Number(userIdValue))) {
        return NextResponse.json('Invalid or missing userId', {
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