import { useEffect, useState } from "react";
import getProfileById from "@/src/actions/get-profilesById-action";
import { Profile } from "@/src/types";

type UseProfileByIdResult = {
    profile: Profile;
    loading: boolean;
};

export function useProfileById(userId: string): UseProfileByIdResult {
    const [profile, setProfile] = useState({} as Profile);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProfileById(userId)
            .then(data => setProfile(data))
            .catch(() => setProfile({} as Profile))
            .finally(() => setLoading(false));
    }, [userId]);

    return { profile, loading };
}