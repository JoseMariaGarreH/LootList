import { useState, useEffect, useCallback } from "react";
import getProfileGameById from "@/src/actions/get-profileGameById-action";
import { ProfileGame } from "@/src/types";

export function useProfileGame(userId: string): { profileGames: ProfileGame[]; loading: boolean; refetch: () => Promise<void> } {
    const [profileGames, setProfileGames] = useState<ProfileGame[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProfileGames = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProfileGameById(userId);
            setProfileGames(data || []);
        } catch (error) {
            setProfileGames([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchProfileGames();
        }
    }, [userId, fetchProfileGames]);

    // Esta es la función refetch que puedes usar desde fuera
    return { profileGames, loading, refetch: fetchProfileGames };
}