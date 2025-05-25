"use client"

import { ProfileGame } from "@/src/types";
import { useEffect, useState } from "react";
import getProfileGameById from "@/src/actions/get-profileGameById-action";

export function useProfileGame(id : string): { profileGames: ProfileGame[] } {
    const [profileGames, setProfileGames] = useState<ProfileGame[]>([]);

    useEffect(() => {
        if (!id) return;
        getProfileGameById(id)
            .then(data => setProfileGames(data))
            .catch(() => setProfileGames([]));
    }, [id]);

    return { profileGames };
}