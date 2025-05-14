"use client";

import { useState, useRef } from "react";

export default function AvatarUploader() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-2xl mt-28 mb-28 mx-auto p-6 bg-[#1d3557] rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Avatar</h2>

            <div
                className="relative w-full h-60 border-2 border-dashed border-gray-600 rounded-md bg-[url('/checker.png')] bg-repeat-center bg-size-16 flex items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />

            <div className="mt-4 flex gap-4">
                <button
                    className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
                    onClick={() => fileInputRef.current?.click()}
                >
                    SELECT NEW AVATAR
                </button>
                <button
                    className="text-[#a0a0a0] text-sm"
                    onClick={() => setAvatar(null)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}