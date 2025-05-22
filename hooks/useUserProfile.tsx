"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUserProfile() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<{ profileImage?: string } | null>(null);

    useEffect(() => {
        if (!session?.user) return;
        fetch(`/api/profile/${session.user.id}`)
            .then(res => res.json())
            .then(data => setProfile(data));
    }, [session?.user?.id]);

    return profile;
}