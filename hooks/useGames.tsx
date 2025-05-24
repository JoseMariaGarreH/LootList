"use client"

import { Games } from "@prisma/client";
import { useEffect, useState } from "react";
import getGames from "@/src/actions/get-games-action";

export default function useGames(): { games: Games[] } {
    const [games, setGames] = useState<Games[]>([]);

    useEffect(() => {
        getGames()
            .then((data) => setGames(data))
            .catch((error) => {
                console.error("Error fetching games:", error);
            });
    }, []);

    return { games };
}