import { ProfileGame } from "@/src/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useProfileGame() : { profile : ProfileGame[] } {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<ProfileGame[]>([]);

    useEffect(() => {
        if (!session?.user) return;
        fetch(`/api/profileGame/${session.user.id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setProfile(data));
    }, [session?.user?.id]);

    return {profile};
}