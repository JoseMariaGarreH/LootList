
import GameDetails from "@/components/games/GameDetails";
import { use } from "react";

// Página para mostrar los detalles de un juego específico
export default function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 px-2">
            <div className="w-full max-w-5xl">
                <GameDetails id={id} />
            </div>
        </div>
    );
}