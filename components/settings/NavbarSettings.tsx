"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarSettings() {
    const pathname = usePathname();

    return (
        <>
            <div className="max-w-4xl mx-auto mt-8 p-4 bg-[#1d3557] shadow-md rounded-sm">
                <div className="flex flex-col space-y-4">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <Link
                                href="/settings/profile"
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    pathname === "/settings/profile"
                                        ? "text-[#e63946] border-[#e63946]"
                                        : "text-[#a8dadc] border-transparent hover:text-[#e63946]"
                                }`}
                            >
                                PERFIL
                            </Link>
                            <Link
                                href="/settings/password"
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    pathname === "/settings/password"
                                        ? "text-[#e63946] border-[#e63946]"
                                        : "text-[#a8dadc] border-transparent hover:text-[#e63946]"
                                }`}
                            >
                                CONTRASEÑA
                            </Link>
                            <Link
                                href="/settings/avatar"
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    pathname === "/settings/avatar"
                                        ? "text-[#e63946] border-[#e63946]"
                                        : "text-[#a8dadc] border-transparent hover:text-[#e63946]"
                                }`}
                            >
                                AVATAR
                            </Link>
                            <Link
                                href="/profile/connections"
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    pathname === "/profile/connections"
                                        ? "text-[#e63946] border-[#e63946]"
                                        : "text-[#a8dadc] border-transparent hover:text-[#e63946]"
                                }`}
                            >
                                CONEXIONES
                            </Link>
                        </nav>
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="px-4 py-1.5 border border-white/30 hover:border-white hover:bg-red-600 text-sm text-white font-medium rounded transition"
                    >
                        Desconectar cuenta
                    </button>
                </div>
            </div>
        </>
    );
}