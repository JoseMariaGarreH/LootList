"use client"

import { Games } from "@prisma/client";
import { useEffect, useState } from "react";
import getGames from "@/src/actions/get-games-action";

export default function useGames(): { games: Games[]; loading: boolean } {
    const [games, setGames] = useState<Games[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGames()
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching games:", error);
                setLoading(false);
            });
    }, []);

    return { games, loading };
}