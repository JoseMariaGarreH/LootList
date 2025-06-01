"use client"

import { Edit3, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserProfileLayout({ profile, session, children }: { profile: any, session: any, children: React.ReactNode }) {
    const pathname = usePathname();
    const tabs = [
        { name: "Perfil", href: `/user/${session?.user.username}` },
        { name: "Jugados", href: `/user/${session?.user.username}/played` },
        { name: "Jugando", href: `/user/${session?.user.username}/playing` },
        { name: "Lista de Deseos", href: `/user/${session?.user.username}/wishlist` },
        { name: "Reseñas", href: `/user/${session?.user.username}/reviews` },
        { name: "Me Gusta", href: `/user/${session?.user.username}/likes` },
    ];

    return (
        <div className="min-h-screen text-white">
            {/* Header */}
            <div className="px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                            {profile?.profileImage ? (
                                <Image
                                    src={profile.profileImage}
                                    width={200}
                                    height={200}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-10 h-10 text-[#f1faee]" />
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold text-[#f1faee]">
                                {session?.user.username}
                            </h1>
                        </div>
                    </div>
                    <Link
                        href={"/settings/profile"}
                        className="mt-5 py-2 px-4 text-sm md:text-base text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition flex items-center gap-2"
                    >
                        <Edit3 className="w-4 h-4" />
                        Editar Perfil
                    </Link>
                </div>
            </div>
            {/* Navigation Tabs */}
            <div className="bg-[#1d3557] px-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${isActive
                                        ? "text-[#e63946] border-[#e63946]"
                                        : "text-[#a8dadc] border-transparent hover:text-[#e63946]"
                                        }`}
                                >
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
            {/* Contenido dinámico */}
            {children}
        </div>
    );
}