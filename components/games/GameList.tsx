import useGames from "@/hooks/useGames";
import GameCard from "./GameCard";
import { Games } from "@/src/types";

export default function GameList() {
    const { games } = useGames();

    if (!games || games.length === 0) {
        return <p className="text-center text-[#f1faee]">No hay juegos disponibles.</p>;
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {games.map((game: Games) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}