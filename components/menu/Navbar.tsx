"use client"

import { useState } from 'react';
import { AlignJustify, X } from 'lucide-react'
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const [estaAbierto, setEstaAbierto] = useState(false);
    const { data: session }  = useSession();

    return (
        <nav className="w-full bg-[#457b9d]">
            <div className="container mx-auto px-4 py-2">

                <div className="flex items-center justify-between">
                    
                    <div className="flex items-center">
                        <Link href="/" >
                            <Logo />
                        </Link>
                    </div>

                    <ul className="hidden md:flex space-x-4">
                        {(session) ? (
                            <>
                                <li><Link href="/profile" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Perfil</Link></li>
                                <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Biblioteca</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/auth/login" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Iniciar sesión</Link></li>
                                <li><Link href="/auth/signup" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Crear cuenta</Link></li>
                            </>
                        )}
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Juegos</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Sobre nosotros</Link></li>
                    </ul>

                    <div className="md:hidden">
                        <button
                            onClick={() => setEstaAbierto(!estaAbierto)}
                            className="text-[#1d3557] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                                {estaAbierto ? (
                                    <X
                                        className='w-6 h-6 text-[#1d3557]'
                                    >
                                    </X>
                                ) : (
                                    <AlignJustify
                                        className='w-6 h-6 text-[#1d3557]'
                                    ></AlignJustify>
                                )}
                        </button>
                    </div>
                </div>

                {estaAbierto && (
                    <ul className="md:hidden mt-2 space-y-2 pb-2">
                        {(session) ? (
                            <>
                                <li><Link href="/profile" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Perfil</Link></li>
                                <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Biblioteca</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/auth/login" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Iniciar sesión</Link></li>
                                <li><Link href="/auth/signup" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Crear cuenta</Link></li>
                            </>
                        )}
                        
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Juegos</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Sobre nosotros</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    );
}