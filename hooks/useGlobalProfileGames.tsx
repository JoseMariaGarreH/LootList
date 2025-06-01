"use client"

import { useEffect, useState } from "react";
import { ProfileGame } from "@/src/types";
import getGlobalProfileGames from "@/src/actions/get-globalProfileGames-action";

export function useGlobalProfileGames(gameId: string): { globalProfileGames: ProfileGame[] } {
    const [globalProfileGames, setGlobalProfileGames] = useState<ProfileGame[]>([]);

    useEffect(() => {
        if (!gameId) return;
        getGlobalProfileGames(gameId)
            .then(data => setGlobalProfileGames(data || []))
            .catch(() => setGlobalProfileGames([]));
    }, [gameId]);

    return { globalProfileGames };
}