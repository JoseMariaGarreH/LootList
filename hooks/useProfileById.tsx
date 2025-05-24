"use client"

import { useEffect, useState } from "react";
import getProfileById from "@/src/actions/get-profilesById-action";
import { Profile } from "@/src/types";

export function useProfileById(userId: string) : { profile: Profile } {
    const [profile, setProfile] = useState({} as Profile);

    useEffect(() => {
        getProfileById(userId)
            .then(data => setProfile(data))
            .catch(() => setProfile({} as Profile));
    }, [userId]);

    return { profile };
}