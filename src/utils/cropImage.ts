// Utilidad para recortar una imagen a un tamaño específico y devolverla como una imagen Blob
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    outputSize = 180,
    mimeType = 'image/jpeg',
    quality = 0.98
): Promise<Blob> {
    // Crea una nueva imagen y le asigna la fuente recibida
    const image = new window.Image();
    image.src = imageSrc;
    // Espera a que la imagen se cargue completamente antes de continuar
    await new Promise((resolve) => (image.onload = resolve));

    // Crea un canvas con el tamaño de salida deseado
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    // Obtiene el contexto 2D del canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');

    // Dibuja la porción recortada de la imagen en el canvas, ajustándola al tamaño de salida
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputSize,
        outputSize
    );

    // Convierte el canvas a un Blob en el formato y calidad especificados y lo devuelve
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
        }, mimeType, quality);
    });
}