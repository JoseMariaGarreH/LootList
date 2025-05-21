"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GameDetails from "@/components/games/GameDetails";

export default function GameDetailPage() {
    const { id } = useParams() as { id: string };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 px-2">
            <div className="w-full max-w-5xl">
                <Link href="/games" className="inline-block mb-8">
                    <span className="flex items-center gap-2 text-[#a8dadc] hover:text-[#f1faee] transition font-semibold text-lg">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a la lista de juegos
                    </span>
                </Link>
                <GameDetails id={id} />
            </div>
        </div>
    );
}