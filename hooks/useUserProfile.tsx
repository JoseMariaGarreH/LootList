"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUserProfile() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<{ profileImage?: string } | null>(null);

    useEffect(() => {
        if (!session?.user?.email) return;
        fetch(`/api/profile/${session.user.email}`)
            .then(res => res.json())
            .then(data => setProfile(data));
    }, [session?.user?.email]);

    return profile;
}