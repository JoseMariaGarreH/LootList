import useGames from "@/hooks/useGames";
import GameCard from "./GameCard";
import { Games } from "@/src/types";
import { useState } from "react";

export default function GameList() {
    const { games } = useGames();
    const [platform, setPlatform] = useState("");
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");

    if (!games || games.length === 0) {
        return <p className="text-center text-[#f1faee]">No hay juegos disponibles.</p>;
    }

    // Obtener plataformas
    const platforms = Array.from(new Set(games.map((g) => g.platform).filter((p): p is string => typeof p === "string" && !!p)));

    // Filtrado
    const filteredGames = games.filter((game) => {
        const matchesPlatform = platform ? game.platform === platform : true;
        const matchesSearch = search ? game.title.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesYear = year ? (game.releaseDate && new Date(game.releaseDate).getFullYear().toString() === year) : true;
        return matchesPlatform && matchesSearch && matchesYear;
    });

    // Obtener años
    const years = Array.from(
        new Set(
            games
                .map((g) => g.releaseDate ? new Date(g.releaseDate).getFullYear().toString() : null)
                .filter((y): y is string => y !== null)
        )
    );

    return (
        <>
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex flex-col items-start mx-2">
                    <label className="mb-1 text-sm text-[#f1faee] font-semibold" htmlFor="search">
                        Buscar por título
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Ej: Zelda..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="p-2 rounded border border-[#457b9d] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] bg-[#1d3557] text-[#f1faee] w-48"
                    />
                </div>
                <div className="flex flex-col items-start mx-2">
                    <label className="mb-1 text-sm text-[#f1faee] font-semibold" htmlFor="platform">
                        Plataforma
                    </label>
                    <select
                        id="platform"
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        className="p-2 rounded border border-[#457b9d] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] bg-[#1d3557] text-[#f1faee] w-48"
                    >
                        <option value="">Todas las plataformas</option>
                        {platforms.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-start mx-2">
                    <label className="mb-1 text-sm text-[#f1faee] font-semibold" htmlFor="year">
                        Año de lanzamiento
                    </label>
                    <select
                        id="year"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="p-2 rounded border border-[#457b9d] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] bg-[#1d3557] text-[#f1faee] w-48"
                    >
                        <option value="">Todos los años</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col justify-end mx-2">
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setPlatform("");
                            setYear("");
                        }}
                        className="p-2 rounded bg-[#e63946] text-[#f1faee] font-semibold hover:bg-[#a4161a] transition"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center p-4">
                {filteredGames.length === 0 ? (
                    <p className="text-center text-[#f1faee] w-full">No hay juegos que coincidan con los filtros.</p>
                ) : (
                    filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))
                )}
            </div>
        </>
    );
}