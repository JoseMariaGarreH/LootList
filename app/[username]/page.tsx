"use client";

import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UsernamePage() {
    const { data: session } = useSession();
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee]">
                    ¡Bienvenido a tu perfil {session?.user.username}!
                </h1>
                <p className="mt-4 text-base md:text-lg text-[#f1faee]">
                    Aquí podrás ver y editar tu información.
                </p>
                <Link
                    href={"/settings/profile"}
                    className="mt-5 py-2 px-6 text-sm md:text-base text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                >
                    EDITAR PERFIL
                </Link>
            </div>
            <Footer />
        </>
    );
}