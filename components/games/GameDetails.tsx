import useGames from "@/hooks/useGames";
import { Games } from "@/src/types";
import { Calendar, Gamepad2, Heart } from "lucide-react";
import Image from "next/image";

export default function GameDetails({ id }: { id: string }) {

    const { games } = useGames();
    const game: Games | undefined = games.find((g) => g.id.toString() === id);

    if (!game) {
        return <p className="text-center text-[#f1faee]">Juego no encontrado.</p>;
    }

    return (
        <div className="bg-[#457b9d] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#a8dadc]/20">
            <div className="flex-shrink-0 flex items-center justify-center bg-[#1d3557] p-8 md:p-10">
                <Image
                    src={game.imageUrl || ""}
                    alt={game.title}
                    width={280}
                    height={280}
                    className="object-cover shadow-lg border border-[#a8dadc]/10"
                />
            </div>
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <h1 className="text-4xl font-extrabold mb-4 text-[#f1faee] flex items-center gap-2">
                    {game.title}
                </h1>
                <div className="mb-6 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-base shadow">
                        <Gamepad2 className="w-5 h-5" />
                        {game.platform || "Desconocida"}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-base shadow">
                        <Calendar className="w-5 h-5" />
                        {game.releaseDate ? new Date(game.releaseDate).getFullYear() : "Desconocido"}
                    </span>
                    <button className="inline-flex items-center gap-2 bg-[#e63946] text-[#f1faee] px-4 py-2 rounded-full font-semibold text-base shadow">
                        <Heart className="w-5 h-5" />
                        Favorito
                    </button>
                </div>
                <div className="flex items-start gap-2 text-[#f1faee] text-lg p-4">
                    <div>
                        <p className="font-semibold">Descripción:</p>
                        <p>{game.description || "Sin descripción."}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}