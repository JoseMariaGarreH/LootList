"use client"

import { useEffect, useState } from "react";
import getUserById from "@/src/actions/get-usersById-action";
import { User } from "@/src/types";

export function useUserById(userId: string) : { user: User | null } {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!userId) return;
        getUserById(userId)
            .then(data => setUser(data.user))
            .catch(() => setUser(null));
    }, [userId]);

    return { user };
}