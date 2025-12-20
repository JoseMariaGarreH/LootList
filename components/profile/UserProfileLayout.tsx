"use client"

// Tipos
import { Profile } from "@/src/types";
// Iconos
import { Edit3, User } from "lucide-react";
// Next.js
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente de diseño para el perfil de usuario
interface UserProfileLayoutProps {
    profile: Profile;
    session: any;
    children: React.ReactNode;
}

export default function UserProfileLayout({ profile, session, children }: UserProfileLayoutProps) {
    // Obtiene la ruta actual para resaltar la pestaña activa
    const pathname = usePathname();
    const username = encodeURIComponent(session?.user.username || "");
    // Define las pestañas de navegación del perfil
    const tabs = [
        { name: "Perfil", href: `/user/${username}` },
        { name: "Jugados", href: `/user/${username}/played` },
        { name: "Jugando", href: `/user/${username}/playing` },
        { name: "Lista de Deseos", href: `/user/${username}/wishlist` },
        { name: "Reseñas", href: `/user/${username}/reviews` },
        { name: "Me Gusta", href: `/user/${username}/likes` },
    ];

    return (
        <div className="min-h-screen text-white">
            {/* Header */}
            <header className="px-4 sm:px-6 py-5 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/15 bg-[#1d3557] shadow-sm">
                                {profile?.profileImage ? (
                                    <Image
                                        src={profile.profileImage}
                                        width={200}
                                        height={200}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User className="w-10 h-10 text-[#f1faee]" />
                                    </div>
                                )}
                            </div>

                            <div className="text-left">
                                <h1 className="text-xl sm:text-2xl font-bold text-[#f1faee] leading-tight">
                                    {session?.user.username}
                                </h1>
                                <p className="text-sm text-[#a8dadc]">@{session?.user.username}</p>
                            </div>
                        </div>

                        <Link
                            href={"/settings/profile"}
                            className="w-full md:w-auto py-2 px-4 text-sm md:text-base text-white rounded-md bg-[#e63946] hover:bg-[#d62839] active:bg-[#a62633] transition flex items-center justify-center gap-2 border border-white/10"
                        >
                            <Edit3 className="w-4 h-4" />
                            Editar Perfil
                        </Link>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="mt-4 bg-[#1d3557] border border-white/10 rounded-xl px-2 sm:px-4">
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto py-2">
                            {tabs.map((tab) => {
                                const isActive = pathname === tab.href;
                                return (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`shrink-0 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${isActive
                                            ? "bg-white/5 text-[#e63946] border-[#e63946]/40"
                                            : "text-[#a8dadc] border-transparent hover:text-[#e63946] hover:bg-white/5"
                                            }`}
                                    >
                                        {tab.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>

            <div className="px-4 sm:px-6">
                <div className="max-w-7xl mx-auto py-6">
                    {children}
                </div>
            </div>
        </div>
    );
}