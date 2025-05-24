"use client"

import { useEffect, useState } from "react";
import getUserById from "@/src/actions/get-usersById-action";
import { User } from "@/src/types";

export function useUserById(userId: string) : { user: User} {
    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        getUserById(userId)
            .then(data => setUser(data.user))
            .catch(() => setUser({} as User));
    }, [userId]);

    return { user };
}