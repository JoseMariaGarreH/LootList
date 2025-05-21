import { Games } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useGames() : { games: Games[] } {
    const [games, setGames] = useState<Games[]>([]);

    useEffect(() => {
        fetch("/api/games")
            .then((res) => res.json())
            .then((data) => {
                setGames(data);
            })
            .catch((error) => {
                console.error("Error fetching games:", error);
            });
    }, []);

    return { games };
}