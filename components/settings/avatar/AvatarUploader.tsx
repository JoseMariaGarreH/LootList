"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { set } from "react-hook-form";

export default function AvatarUploader() {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-2xl mt-28 mb-28 mx-auto p-6 bg-[#1d3557] rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Avatar </h2>
            <div
                className="relative w-full h-60 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt="Avatar Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <p>Clica para cargar una imagen</p>
                )}
            </div>

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