import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/src/utils/cropImage";
import styles from "@/app/home.module.css"

// Componente principal para subir y recortar el avatar
export default function AvatarUploader() {
    // Estado para la imagen seleccionada (preview)
    const [preview, setPreview] = useState<string | null>(null);
    // Estado para la posición del recorte
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    // Estado para el zoom del recorte
    const [zoom, setZoom] = useState(1);
    // Estado para las dimensiones del área recortada
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    // Estado para la imagen recortada final
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    // Referencia al input de archivo
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Maneja el cambio de archivo (cuando el usuario selecciona una imagen)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string); // Guarda la imagen como base64
            reader.readAsDataURL(file);
        }
    };

    // Se ejecuta cuando el usuario termina de ajustar el recorte
    const onCropComplete = useCallback((_: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Genera la imagen recortada usando los datos del cropper
    const showCroppedImage = useCallback(async () => {
        if (!preview || !croppedAreaPixels) return;
        const croppedImg = await getCroppedImg(preview, croppedAreaPixels);
        if (croppedImg instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCroppedImage(reader.result as string);
            };
            reader.readAsDataURL(croppedImg);
        } else if (typeof croppedImg === "string") {
            setCroppedImage(croppedImg);
        }
    }, [preview, croppedAreaPixels]);

    return (
        <div className="max-w-2xl mt-32 mb-32 mx-auto p-6 bg-[#1d3557] rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Avatar</h2>
            <div
                className="relative w-full h-96 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => {
                    if (!preview && !croppedImage) fileInputRef.current?.click();
                }}
            >
                {/* Si hay preview pero no imagen recortada, muestra el cropper */}
                {preview && !croppedImage ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-60 h-60 rounded-full overflow-hidden relative flex items-center justify-center border-4 border-white shadow-lg">
                            <Cropper
                                image={preview}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                                classes={{
                                    containerClassName: styles.cropperContainer,
                                    cropAreaClassName: styles.cropperArea,
                                }}
                            />
                        </div>
                        {/* Botón para confirmar el recorte, ahora debajo del cropper */}
                        <button
                            className="mt-4 bg-[#e63946] px-5 py-2 rounded-full text-white font-semibold shadow-md hover:bg-[#a82832] transition"
                            onClick={showCroppedImage}
                        >
                            Confirmar recorte
                        </button>
                    </div>
                ) : croppedImage ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="rounded-full overflow-hidden flex items-center justify-center bg-[linear-gradient(45deg,#e0e0e0_25%,transparent_25%,transparent_75%,#e0e0e0_75%,#e0e0e0),linear-gradient(-45deg,#f8f8f8_25%,transparent_25%,transparent_75%,#f8f8f8_75%,#f8f8f8)] bg-[length:24px_24px] border-4 border-white shadow-lg">
                            <Image
                                src={croppedImage}
                                width={180}
                                height={180}
                                alt="Avatar Preview"
                                className="object-cover"
                            />
                        </div>
                        <button
                            className="mt-2 px-4 py-2 bg-[#457b9d] hover:bg-[#274060] text-white rounded-full font-semibold shadow transition"
                            onClick={() => {
                                setPreview(null);
                                setCroppedImage(null);
                                setCrop({ x: 0, y: 0 });
                                setZoom(1);
                                fileInputRef.current?.click();
                            }}
                        >
                            Cambiar imagen
                        </button>
                    </div>
                ) : (
                    // Si no hay imagen, muestra el mensaje para cargar una
                    <p>Arrastrar y soltar una imagen</p>
                )}
            </div>
            {/* Input de archivo oculto */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
        </div>
    );
}