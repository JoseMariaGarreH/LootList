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
    platforms: string[];
    years: string[];
    onClear: () => void;
}

export default function GameFilters({
    search, setSearch,
    platform, setPlatform,
    year, setYear,
    order, setOrder,
    platforms, years,
    onClear
}: GameFiltersProps) {
    return (
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
                        className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-[#1d3557] border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
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
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1d3557] border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#a8dadc] transition shadow-inner"
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
                    onClick={onClear}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md w-full transition"
                >
                    <FilterX className="w-5 h-5" />
                    Limpiar
                </button>
            </div>
        </div>
    );
}