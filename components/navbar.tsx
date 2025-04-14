"use client"

import { useState } from 'react';
import { AlignJustify, X } from 'lucide-react'
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full">
            <div className="container mx-auto px-4 py-2">
                {/* Contenedor principal */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Logo />
                        </Link>
                    </div>

                    {/* Menú desktop - visible en pantallas medianas/grandes */}
                    <ul className="hidden md:flex space-x-4">
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Iniciar sesión</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Crear cuenta</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Perfil</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Juegos</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Biblioteca</Link></li>
                        <li><Link href="#" className="text-[#a8dadc] hover:text-[#1d3557] transition-colors">Sobre nosotros</Link></li>
                    </ul>

                    {/* Botón hamburguesa - visible solo en móviles */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#1d3557] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                                {isOpen ? (
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

                {/* Menú móvil - aparece al hacer clic en el botón hamburguesa */}
                {isOpen && (
                    <ul className="md:hidden mt-2 space-y-2 pb-2">
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Iniciar sesión</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Crear cuenta</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Perfil</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Juegos</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Biblioteca</Link></li>
                        <li><Link href="#" className="block py-2 text-[#a8dadc] hover:text-[#1d3557] transition-colors">Sobre nosotros</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    );
}