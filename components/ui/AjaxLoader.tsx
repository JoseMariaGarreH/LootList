"use client"
// Next.js
import Image from "next/image";

// Componente de loader para mostrar mientras se cargan datos
export default function AjaxLoader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image width={150} height={150}  src="/assets/loader.svg" alt="loader" priority></Image>
        </div>
    )
}