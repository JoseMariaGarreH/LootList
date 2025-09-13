"use client"

// Componentes
import GameCard from "@/components/games/GameCard";
// Tipos
import { Game } from "@/src/types";

// Definición de las propiedades del componente
interface ProfileGameListSectionProps {
    games: Game[];
    emptyText: string;
    title: string;
    icon: React.ReactNode;
}

export default function ProfileGameListSection({ games, emptyText, title, icon }: ProfileGameListSectionProps) {
    return (
        <div className="max-w-7xl mx-auto mt-8 px-2 sm:px-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">{icon} {title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 pb-10">
                {games.length === 0 ? (
                    <p className="text-center text-[#f1faee] w-full col-span-full">
                        {emptyText}
                    </p>
                ) : (
                    games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))
                )}
            </div>
        </div>
    );
}