"use client"

// Hooks
import { useEffect, useState } from "react";
// Acciones
import getUserById from "@/src/actions/get-usersById-action";
// Tipos
import { Consumer } from "@/src/types";

// Hook personalizado para obtener un usuario por su ID
export function useUserById(userId: string) : { user: Consumer | null } {
    const [user, setUser] = useState<Consumer | null>(null);

    // useEffect para cargar el usuario cuando cambia el userId
    useEffect(() => {
        if (!userId) return; // Si no hay userId, no hace nada
        getUserById(userId)
            .then(data => setUser(data.user)) // Si hay datos, los guarda en el estado
            .catch(() => setUser(null)); // Si hay un error, deja el usuario como null
    }, [userId]);

    // Devuelve el usuario encontrado o null en caso de error
    return { user };
}