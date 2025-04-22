"use client"

import Logo from "@/components/ui/Logo";
import Link from "next/link";

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

                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded transition-all
                                        bg-[#1d3557] text-[#F1FAEE]
                                        focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                        disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded transition-all bg-[#1d3557] text-white
                                        focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                        disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <div className="flex justify-between text-sm text-black">
                    <a href="#" className="hover:underline">
                        Crear cuenta
                    </a>
                    <a href="#" className="hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>
        </div>
    );
}