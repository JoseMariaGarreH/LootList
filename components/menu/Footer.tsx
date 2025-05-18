"use client"

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#1d3557]">
            <div className="mx-auto max-w-6xl px-4 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex flex-col items-start">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <a href="/about" className="text-[#a8dadc] hover:text-white font-medium text-sm">Sobre nosotros</a>
                            <a href="/help" className="text-[#a8dadc] hover:text-white font-medium text-sm">Ayuda</a>
                            <a href="/games" className="text-[#a8dadc] hover:text-white font-medium text-sm">Juegos</a>
                        </div>
                        <p className="text-[#a0a0a0] text-xs mt-1">©LootList hecho por gente que hace lo que le gusta.</p>
                    </div>

                    <div className="flex gap-3 mt-3 sm:mt-0 sm:ml-16">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="hover:opacity-75"
                            aria-label="Twitter"
                        >
                            <Image
                                alt="x"
                                src="/assets/x_light.svg"
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