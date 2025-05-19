"use client"

import Image from "next/image";

export default function AjaxLoader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Image width={150} height={150}  src="/assets/loader.svg" alt="loader"></Image>
        </div>
    )
}