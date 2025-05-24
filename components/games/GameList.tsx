import useGames from "@/hooks/useGames";
import GameCard from "./GameCard";
import { useState } from "react";
import { Search, FilterX } from "lucide-react";
import AjaxLoader from "../ui/AjaxLoader";

export default function GameList() {
    const { games } = useGames();
    const [platform, setPlatform] = useState("");
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const [order, setOrder] = useState(""); // Nuevo estado para el orden

    if (!games || games.length === 0) {
        return <AjaxLoader />;
    }

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
            {/* Filtros mejorados */}
            <div className="flex flex-wrap gap-6 mb-10 justify-center px-4">
                <div className="flex flex-col md:flex-row gap-4 bg-[#1d3557] border border-[#a8dadc]/30 rounded-3xl shadow-xl p-6 w-full max-w-4xl">
                    {/* Filtro: Título */}
                    <div className="flex-1 min-w-[180px]">
                        <label htmlFor="search" className="block text-xs font-bold text-[#a8dadc] mb-1 tracking-wide uppercase">
                            Buscar por título
                        </label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 text-[#a8dadc] w-5 h-5" />
                            <input
                                id="search"
                                type="text"
                                placeholder="Ej: Zelda..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9 pr-3 py-2 w-full rounded-lg bg-[#457b9d]/40 border border-[#a8dadc]/40 text-[#f1faee] placeholder-[#f1faee]/50 focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition"
                            />
                        </div>
                    </div>

                    {/* Filtro: Plataforma */}
                    <div className="flex-1 min-w-[180px]">
                        <label htmlFor="platform" className="block text-xs font-bold text-[#a8dadc] mb-1 tracking-wide uppercase">
                            Plataforma
                        </label>
                        <select
                            id="platform"
                            value={platform}
                            onChange={e => setPlatform(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg bg-[#457b9d]/40 border border-[#a8dadc]/40 text-[#f1faee] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition"
                        >
                            <option value="">Todas</option>
                            {platforms.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro: Año */}
                    <div className="flex-1 min-w-[140px]">
                        <label htmlFor="year" className="block text-xs font-bold text-[#a8dadc] mb-1 tracking-wide uppercase">
                            Año
                        </label>
                        <select
                            id="year"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg bg-[#457b9d]/40 border border-[#a8dadc]/40 text-[#f1faee] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition"
                        >
                            <option value="">Todos</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro: Orden */}
                    <div className="flex-1 min-w-[140px]">
                        <label htmlFor="order" className="block text-xs font-bold text-[#a8dadc] mb-1 tracking-wide uppercase">
                            Ordenar
                        </label>
                        <select
                            id="order"
                            value={order}
                            onChange={e => setOrder(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg bg-[#457b9d]/40 border border-[#a8dadc]/40 text-[#f1faee] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition"
                        >
                            <option value="">Sin orden</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                    </div>

                    {/* Botón: Limpiar filtros */}
                    <div className="flex items-end min-w-[120px]">
                        <button
                            onClick={() => {
                                setSearch("");
                                setPlatform("");
                                setYear("");
                                setOrder(""); // Reinicia el filtro de orden
                            }}
                            className="flex items-center gap-2 bg-[#e63946] hover:bg-[#a4161a] text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition"
                        >
                            <FilterX className="w-5 h-5" />
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Listado de juegos */}
            <div className="flex flex-wrap gap-2 justify-start px-4 pb-10">
                {displayedGames.length === 0 ? (
                    <p className="text-center text-[#f1faee] w-full">No hay juegos que coincidan con los filtros.</p>
                ) : (
                    displayedGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))
                )}
            </div>
        </>
    );
}