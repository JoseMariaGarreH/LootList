import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/src/utils/cropImage";
import styles from "@/app/home.module.css"
import { useSession } from "next-auth/react";

export default function AvatarUploader() {

    const [preview, setPreview] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);

    const { data: session } = useSession();

    // Maneja el cambio de archivo (cuando el usuario selecciona una imagen)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
        // Limpia el valor del input para permitir seleccionar el mismo archivo de nuevo
        e.target.value = "";
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

    // Maneja el drop de archivos (drag & drop)
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Previene el comportamiento por defecto al arrastrar sobre el área
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    const formData = new FormData();
                    // Convierte la imagen recortada a un blob y lo agrega al FormData
                    if (croppedImage && imageName && session) {
                        const res = await fetch(croppedImage);
                        const blob = await res.blob();
                        const file = new File([blob], imageName, { type: blob.type });
                        formData.append("image", file);
                        formData.append("userId", session?.user.id);
                    }

                    if (!croppedImage) return;
                    const res = await fetch("/api/profile/avatar", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await res.json();
                    console.log(data);
                    setPreview(data.url);
                }}
            >
                <div className="max-w-2xl mt-32 mb-32 mx-auto p-6 bg-[#1d3557] rounded-lg shadow-lg text-white">
                    <h2 className="text-xl font-semibold mb-4">Avatar</h2>
                    <div
                        className="relative w-full h-96 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            if (!preview && !croppedImage) fileInputRef.current?.click();
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
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
                                {/* Barra de zoom */}
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-48 h-2 rounded bg-[#a8dadc] outline-none accent-[#a8dadc] transition"
                                />
                                <button
                                    className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-green-600 text-sm text-white font-medium rounded transition"
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
                    <div className="flex gap-4 mt-4 justify-center">
                        <button
                            type="button"
                            className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-green-600 text-sm text-white font-medium rounded transition"
                            onClick={() => {
                                setPreview(null);
                                setCroppedImage(null);
                                setCrop({ x: 0, y: 0 });
                                setZoom(1);
                                fileInputRef.current?.click();
                            }}
                        >
                            Seleccionar nueva imagen
                        </button>
                        <button
                            type="button"
                            className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-red-600 text-sm text-white font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                                setPreview(null);
                                setCroppedImage(null);
                                setCrop({ x: 0, y: 0 });
                                setZoom(1);
                            }}
                            disabled={!preview && !croppedImage}
                        >
                            Borrar imagen
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-blue-600 text-sm text-white font-medium rounded transition"
                            disabled={!croppedImage}
                        >
                            Guardar avatar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}