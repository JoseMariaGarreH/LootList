import { useEffect, useState } from "react";
import AjaxLoader from "../ui/AjaxLoader";
import GameCard from "./GameCard";
import useGames from "@/hooks/useGames";
import GameFilters from "./GameFilter";
import Pagination from "./Pagination";

const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Indie",
    "Simulation",
    "Sports",
    "Racing",
    "Strategy",
    "Puzzle",
    "Platformer",
    "Multiplayer",
    "Fighting",
    "Casual",
    "Family",
];

const platforms = [
    "Android",
    "Classic Macintosh",
    "Dreamcast",
    "iOS",
    "Linux",
    "Mac",
    "Nintendo 3DS",
    "Nintendo Switch",
    "PC",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "PS Vita",
    "Web",
    "Wii U",
    "Xbox",
    "Xbox 360",
    "Xbox One",
    "Xbox Series S/X",
    "SEGA Saturn"
];

function getInitialFilters() {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("gameListFilters");
        if (saved) {
            return JSON.parse(saved);
        }
    }
    return {};
}

export default function GameList() {
    const initialFilters = getInitialFilters();

    // Estados para los filtros
    const [platform, setPlatform] = useState(initialFilters.platform || "");
    const [search, setSearch] = useState(initialFilters.search || "");
    const [year, setYear] = useState(initialFilters.year || "");
    const [order, setOrder] = useState(initialFilters.order || "");
    const [genre, setGenre] = useState(initialFilters.genre || "");
    const [page, setPage] = useState(initialFilters.page || 1);
    const pageSize = 20; // Número de juegos por página

    const { games, loading } = useGames();

    useEffect(() => {
        setPage(1);
    }, [search, platform, year, order, genre]);

    const years = Array.from(
        new Set(
            games.map((g) =>
                g.releaseDate ? new Date(g.releaseDate).getFullYear().toString() : null
            ).filter((y): y is string => y !== null)
        )
    );

    const filteredGames = games.filter((game) => {
        const gamePlatforms: string[] = typeof game.platform === "string"
            ? game.platform.split(",").map(p => p.trim())
            : [];

        const matchesPlatform = platform.length > 0
            ? gamePlatforms.some(p => platform.includes(p))
            : true;

        const matchesYear = year
            ? (game.releaseDate && new Date(game.releaseDate).getFullYear().toString() === year)
            : true;

        const matchesSearch = search
            ? game.title?.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesGenre = genre
            ? (game.genre && game.genre.includes(genre))
            : true;

        return matchesPlatform && matchesYear && matchesSearch && matchesGenre;
    });

    const orderedGames =
        order === "az"
            ? [...filteredGames].sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }))
            : order === "za"
                ? [...filteredGames].sort((a, b) => b.title.localeCompare(a.title, "es", { sensitivity: "base" }))
                : filteredGames;

    // PAGINACIÓN LOCAL
    const totalPages = Math.ceil(orderedGames.length / pageSize);
    const displayedGames = orderedGames.slice((page - 1) * pageSize, page * pageSize);

    // Guardar filtros cada vez que cambian
    useEffect(() => {
        const filters = { platform, search, year, order, genre, page };
        localStorage.setItem("gameListFilters", JSON.stringify(filters));
    }, [platform, search, year, order, genre, page]);

    return (
        <>
            {/* Filtros */}
            <GameFilters
                search={search}
                setSearch={setSearch}
                platform={platform}
                setPlatform={setPlatform}
                year={year}
                setYear={setYear}
                order={order}
                setOrder={setOrder}
                genre={genre}
                setGenre={setGenre}
                platforms={platforms}
                genres={genres}
                years={years}
                onClear={() => {
                    setSearch("");
                    setPlatform("");
                    setGenre("");
                    setYear("");
                    setOrder("");
                }}
            />

            {/* Listado de juegos */}
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <AjaxLoader />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 px-16 pt-4 pb-10 max-w-7xl mx-auto">
                    {displayedGames.length === 0 ? (
                        <p className="text-center text-[#f1faee] w-full col-span-full">No hay juegos que coincidan con los filtros.</p>
                    ) : (
                        displayedGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={{
                                    id: game.id,
                                    title: game.title ?? "",
                                    platform: game.platform,
                                    genre: game.genre ?? "",
                                    releaseDate: game.releaseDate,
                                    description: "",
                                    imageUrl: game.imageUrl ?? "",
                                }}
                            />
                        ))
                    )}
                </div>
            )}

            {/* Controles de paginación */}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
    );
}