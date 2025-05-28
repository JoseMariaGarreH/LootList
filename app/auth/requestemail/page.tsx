"use client";

import RequestEmailForm from "@/components/auth/requestemail/RequestEmailForm";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function RequestEmailPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="bg-[#355f7a] rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-[#a8dadc]/30">
                    <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-[#f1faee]">Solicitar restablecimiento de contraseña</h1>
                    <p className="text-sm text-[#f1faee] mb-6">
                        Introduce tu dirección de correo electrónico para recibir un enlace de restablecimiento de contraseña.
                    </p>
                    <RequestEmailForm />
                </div>
            </div>
        </>
    );
}