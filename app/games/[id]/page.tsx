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
                <GameDetails id={id} />
            </div>
        </div>
    );
}