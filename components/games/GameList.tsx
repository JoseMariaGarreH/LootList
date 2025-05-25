import useGames from "@/hooks/useGames";
import GameCard from "./GameCard";
import { useState } from "react";
import { Search, FilterX } from "lucide-react";
import AjaxLoader from "../ui/AjaxLoader";

export default function GameList() {

    const { games, loading } = useGames();

    const [platform, setPlatform] = useState("");
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const [order, setOrder] = useState("");

    const platforms = [
        "PlayStation 5",
        "Xbox Series",
        "Nintendo Switch",
        "PlayStation 4",
        "Xbox One",
        "Windows PC",
        "Mac",
        "PlayStation 3",
        "Xbox 360",
        "Nintendo 3DS",
        "Wii U",
        "Wii",
        "Nintendo DS"
    ];

    const years = Array.from(
        new Set(
            games.map((g) => g.releaseDate ? new Date(g.releaseDate).getFullYear().toString() : null).filter((y): y is string => y !== null)
        )
    );

    const filteredGames = games.filter((game) => {
        const gamePlatforms = game.platform ? game.platform.split(', ') : [];

        const matchesPlatform = platform
            ? gamePlatforms.includes(platform)
            : true;

        const matchesSearch = search
            ? game.title.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesYear = year
            ? (game.releaseDate && new Date(game.releaseDate).getFullYear().toString() === year)
            : true;

        return matchesPlatform && matchesSearch && matchesYear;
    });

    // Ordena solo si el usuario lo selecciona
    const displayedGames =
        order === "az"
            ? [...filteredGames].sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }))
            : order === "za"
                ? [...filteredGames].sort((a, b) => b.title.localeCompare(a.title, "es", { sensitivity: "base" }))
                : filteredGames;

    return (
        <>
            {/* Filtros */}
            <div className="mb-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-7xl mx-auto">

                    {/* Buscar */}
                    <div>
                        <label htmlFor="search" className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                            Buscar
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-white/70 w-5 h-5" />
                            <input
                                id="search"
                                type="text"
                                placeholder="Ej: Zelda..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-[#1d3557]  border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Plataforma */}
                    <div>
                        <label htmlFor="platform" className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                            Plataforma
                        </label>
                        <select
                            id="platform"
                            value={platform}
                            onChange={e => setPlatform(e.target.value)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#1d3557]  border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
                        >
                            <option value="">Todas</option>
                            {platforms.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {/* Año */}
                    <div>
                        <label htmlFor="year" className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                            Año
                        </label>
                        <select
                            id="year"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#1d3557] border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
                        >
                            <option value="">Todos</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Ordenar */}
                    <div>
                        <label htmlFor="order" className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                            Orden
                        </label>
                        <select
                            id="order"
                            value={order}
                            onChange={e => setOrder(e.target.value)}
                            className="bg-[#1d3557] w-full py-2.5 px-4 rounded-xl border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
                        >
                            <option value="">Sin orden</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                    </div>

                    {/* Limpiar */}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearch("");
                                setPlatform("");
                                setYear("");
                                setOrder("");
                            }}
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md w-full transition"
                        >
                            <FilterX className="w-5 h-5" />
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>


            {/* Listado de juegos */}
            { loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <AjaxLoader />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 px-12 pb-10 max-w-7xl mx-auto">
                    {displayedGames.length === 0 ? (
                        <p className="text-center text-[#f1faee] w-full col-span-full">No hay juegos que coincidan con los filtros.</p>
                    ) : (
                        displayedGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))
                    )}
                </div>
            )}
        </>
    );
}