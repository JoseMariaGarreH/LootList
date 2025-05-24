"use client"

import { useEffect, useState } from "react";
import getProfileById from "@/src/actions/get-profilesById-action";
import { Profile } from "@/src/types";

export function useProfileById(userId: string): { profile: Profile | null } {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        if (!userId) return;
        getProfileById(userId)
            .then(data => setProfile(data))
            .catch(() => setProfile(null));
    }, [userId]);


    return { profile };
}