"use client";

import Logo from "@/components/ui/Logo";
import { useRequestResetPassword } from "@/hooks/useRequestPasswordReset";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RequestEmailPage() {
    const [email, setEmail] = useState('');
    const { sendResetEmail, isPending, message, isError } = useRequestResetPassword();

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message);
            } else {
                toast.success(message);
            }
        }
    }, [message, isError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendResetEmail(email);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded transition-all
                            bg-[#1d3557] text-[#F1FAEE]
                            focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                            disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                            disabled={isPending}
                        />
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                        >
                            {isPending ? "Enviando..." : "Enviar enlace"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}