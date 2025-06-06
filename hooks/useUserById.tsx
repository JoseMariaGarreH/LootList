"use client"

// Hooks
import { useEffect, useState } from "react";
// Acciones
import getUserById from "@/src/actions/get-usersById-action";
// Tipos
import { User } from "@/src/types";

// Hook personalizado para obtener un usuario por su ID
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