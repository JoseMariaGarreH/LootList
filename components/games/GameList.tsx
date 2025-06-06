"use client"

// Componentes
import AjaxLoader from "../ui/AjaxLoader";
import GameCard from "./GameCard";
import GameFilters from "./GameFilter";
import Pagination from "./Pagination";
// Hooks
import { useEffect, useState } from "react";
import useGames from "@/hooks/useGames";



// Definiciones de una lista de géneros y plataformas
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

// Función para obtener los filtros iniciales desde localStorage
function getInitialFilters() {
    // Verifica si el código se está ejecutando en el navegador 
    if (typeof window !== "undefined") {
        // Intenta obtener los filtros guardados en localStorage bajo la clave "gameListFilters"
        const saved = localStorage.getItem("gameListFilters");
        // Si existen filtros guardados
        if (saved) {
            // Parsea el JSON guardado y lo devuelve
            return JSON.parse(saved);
        }
    }
    // Si no hay filtros guardados, devuelve un objeto vacío
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
    const pageSize = 18; // Número de juegos por página

    // Hook personalizado para obtener los juegos
    const { games, loading } = useGames();

    // useEffect para reiniciar la página a 1 cuando cambian los filtros
    useEffect(() => {
        setPage(1);
    }, [search, platform, year, order, genre]);

    // Extraer los años de los juegos que estan registrados en la base de datos
    const years = Array.from(
        new Set(
            games.map((g) =>
                g.releaseDate ? new Date(g.releaseDate).getFullYear().toString() : null
            ).filter((y): y is string => y !== null)
        )
    );

    // Filtros de la lista de los juegos, se filtran por plataforma, año, búsqueda, género y orden, según los valores seleccionados
    const filteredGames = games.filter((game) => {
        // Array de plataformas de videojuegos, si es una cadena, se divide por comas y se limpia
        const gamePlatforms: string[] = typeof game.platform === "string"
            ? game.platform.split(",").map(p => p.trim())
            : [];
        // Array de géneros de videojuegos, si es una cadena, se divide por comas y se limpia
        const genres: string[] = typeof game.genre === "string"
            ? game.genre.split(",").map(g => g.trim())
            : [];

        // Verifica si la plataforma del juego coincide con la plataforma seleccionada
        const matchesPlatform = platform.length > 0
            ? gamePlatforms.includes(platform)
            : true;

        // Verifica si el año del juego coincide con el año seleccionado
        const matchesYear = year
            ? (game.releaseDate && new Date(game.releaseDate).getFullYear().toString() === year)
            : true;

        // Verifica si el título del juego coincide con la búsqueda
        const matchesSearch = search
            ? game.title?.toLowerCase().includes(search.toLowerCase())
            : true;

        // Verifica si el género del juego coincide con el género seleccionado
        const matchesGenre = genre
            ? (genres.includes(genre))
            : true;

        // Retorna true si el juego coincide con todos los filtros
        return matchesPlatform && matchesYear && matchesSearch && matchesGenre;
    });

    // Ordena los juegos filtrados según el orden seleccionado
    // Si el orden es "az", se ordena de A a Z; si es "za", de Z a A; si no, se deja sin ordenar
    const orderedGames =
        order === "az"
            ? [...filteredGames].sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }))
            : order === "za"
                ? [...filteredGames].sort((a, b) => b.title.localeCompare(a.title, "es", { sensitivity: "base" }))
                : filteredGames;

    // Paginación de los juegos 
    const totalPages = Math.ceil(orderedGames.length / pageSize);
    const displayedGames = orderedGames.slice((page - 1) * pageSize, page * pageSize);

    // Guardar filtros cada vez que cambian
    useEffect(() => {
        const filters = { platform, search, year, order, genre, page };
        localStorage.setItem("gameListFilters", JSON.stringify(filters));
    }, [platform, search, year, order, genre, page]);

    return (
        <>
            {/* Filtro de la lista de juegos */}
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-5 px-1 pt-4 pb-10 max-w-7xl mx-auto">
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