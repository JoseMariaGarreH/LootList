"use client"

import LoginForm from "@/components/auth/login/LoginForm";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

// Página de inicio de sesión
export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#457b9d]">
            <div className="w-full max-w-md p-8 space-y-6">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center">
                        <Link href="/" >
                            <Logo />
                        </Link>
                    </div>
                </div>

                <h2 className="text-center text-xl font-semibold text-[#e63946] text-[26px]">Iniciar sesión</h2>

                <LoginForm />

                <div className="flex justify-center text-sm border rounded border-[#a8dadc] bg-[#355f7a] shadow-lg p-5">
                    <p className="mr-2 text-white font-light">¿No tienes una cuenta?</p>
                    <Link href="/auth/signup" className="text-[#a8dadc]  hover:underline">
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}