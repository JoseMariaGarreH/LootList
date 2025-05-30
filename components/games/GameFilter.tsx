import { Search, FilterX } from "lucide-react";

interface GameFiltersProps {
    search: string;
    setSearch: (v: string) => void;
    platform: string;
    setPlatform: (v: string) => void;
    year: string;
    setYear: (v: string) => void;
    order: string;
    setOrder: (v: string) => void;
    genre: string;
    setGenre: (v: string) => void;
    platforms: string[];
    genres: string[];
    years: string[];
    onClear: () => void;
}

export default function GameFilters({
    search, setSearch,
    platform, setPlatform,
    year, setYear,
    order, setOrder,
    genre, setGenre,
    platforms, years, genres,
    onClear
}: GameFiltersProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
            {/* Título */}
            <div className="text-xs font-semibold text-white uppercase tracking-widest mr-4">
                Juegos
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4 flex-1">
                {/* Buscar */}
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-white/70 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-1.5 rounded-md bg-[#1d3557] border border-white/20 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#a8dadc] transition"
                    />
                </div>

                {/* Plataforma */}
                <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="bg-[#1d3557] py-1.5 px-3 rounded-md border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#a8dadc] transition"
                >
                    <option value="">Plataforma</option>
                    {platforms.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                {/* Género */}
                <select
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    className="bg-[#1d3557] py-1.5 px-3 rounded-md border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#a8dadc] transition"
                >
                    <option value="">Género</option>
                    {genres.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                {/* Año */}
                <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="bg-[#1d3557] py-1.5 px-3 rounded-md border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#a8dadc] transition"
                >
                    <option value="">Año</option>
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                {/* Orden */}
                <select
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                    className="bg-[#1d3557] py-1.5 px-3 rounded-md border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#a8dadc] transition"
                >
                    <option value="">Orden</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>

            {/* Limpiar */}
            <button
                onClick={onClear}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded-md transition shadow-sm"
            >
                <FilterX className="w-4 h-4" />
                Limpiar
            </button>
        </div>
    );
}
