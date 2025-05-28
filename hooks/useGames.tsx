"use client"

import { Games } from "@/src/types";
import { useEffect, useState } from "react";
import { gamesRawAction } from "@/src/actions/games-raw-action";

export default function useGames(): { games: Games[]; loading: boolean } {
    const [games, setGames] = useState<Games[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        gamesRawAction()
            .then((data : any) => {
                console.log("Games fetched:", data);
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