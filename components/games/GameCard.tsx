"use client";

import { Games } from "@/src/types";
import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }: { game: Games }) {
    return (
        <Link
            href={`/games/${game.id}`}
            className="relative w-44 h-64 overflow-hidden rounded border border-[#1d3557] bg-[#0b1c2c] group hover:shadow-lg transition-shadow"
        >
            <Image
                src={game.imageUrl || "/img/default_game.jpg"}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
            />

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-[#f1faee] text-center px-2 font-semibold drop-shadow">
                    {game.title}
                </p>
            </div>
        </Link>

    );
}