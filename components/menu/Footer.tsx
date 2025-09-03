"use client"

// Next.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        // Contenedor principal del pie de página
        <footer className="w-full bg-[#a8dadc]">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex flex-col items-start">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-black">
                            {/* Enlaces de navegación, de la aplicación en la parte inferior */}
                            <Link href="/about" className="hover:text-gray-600 font-medium text-sm">Sobre nosotros</Link>
                            <Link href="/help" className="hover:text-gray-600 font-medium text-sm">Ayuda</Link>
                            <Link href="/games" className="hover:text-gray-600 font-medium text-sm">Juegos</Link>
                        </div>
                        {/* Texto de derechos de autor y mensaje de la aplicación */}
                        <p className="text-gray-800 text-xs mt-1">
                            <Link href="https://creativecommons.org" target="_blank" rel="noopener noreferrer" className="underline">LootList</Link> © 2025 by <Link href="https://creativecommons.org" target="_blank" rel="noopener noreferrer" className="underline">Jose Maria</Link> is licensed under <Link href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</Link>
                            <Image src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" width={16} height={16} style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em", display: "inline" }} alt="cc" />
                            <Image src="https://mirrors.creativecommons.org/presskit/icons/by.svg" width={16} height={16} style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em", display: "inline" }} alt="by" />
                            <Image src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" width={16} height={16} style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em", display: "inline" }} alt="sa" />
                        </p>
                    </div>
                    {/* los iconos de redes sociales */}
                    <div className="flex gap-3 mt-3 sm:mt-0 sm:ml-16">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="hover:opacity-75"
                            aria-label="Twitter"
                        >
                            <Image
                                alt="x"
                                src="/assets/x_dark.svg"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            className="hover:opacity-75"
                            aria-label="Instagram"
                        >
                            <Image
                                alt="instagram"
                                src="/assets/instagram.svg"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="hover:opacity-75"
                            aria-label="Facebook"
                        >
                            <Image
                                alt="facebook"
                                src="/assets/facebook.svg"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link
                            href="https://youtube.com"
                            target="_blank"
                            className="hover:opacity-75 mt-1"
                            aria-label="YouTube"
                        >
                            <Image
                                alt="youtube"
                                src="/assets/youtube.svg"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link
                            href="https://tiktok.com"
                            target="_blank"
                            className="hover:opacity-75"
                            aria-label="TikTok"
                        >
                            <Image
                                alt="tiktok"
                                src="/assets/tiktok.svg"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}