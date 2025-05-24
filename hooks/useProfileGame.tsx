"use client"

import { ProfileGame } from "@/src/types";
import { useEffect, useState } from "react";
import getProfileGameById from "@/src/actions/get-profileGameById-action";

export function useProfileGame(id : string): { profile: ProfileGame[] } {
    const [profile, setProfile] = useState<ProfileGame[]>([]);

    useEffect(() => {
        if (!id) return;
        getProfileGameById(id)
            .then(data => setProfile(data))
            .catch(() => setProfile([]));
    }, [id]);

    return { profile };
}