"use client";

import GameDetails from "@/components/games/GameDetails";

// Página para mostrar los detalles de un juego específico
export default function GameDetailPage({params}: {params: {id: string}}) {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 px-2">
            <div className="w-full max-w-5xl">
                <GameDetails id={params.id} />
            </div>
        </div>
    );
}