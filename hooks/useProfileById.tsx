"use client"

// Hooks
import { useEffect, useState } from "react";
// Acciones
import getProfileById from "@/src/actions/get-profilesById-action";
// Tipos
import { Profile } from "@/src/types";

// Hook personalizado para obtener el perfil de un usuario por su ID
export function useProfileById(userId: string): { profile: Profile | null } {
    // Estado para almacenar el perfil del usuario
    const [profile, setProfile] = useState<Profile | null>(null);

    // useEffect para cargar el perfil cuando cambia el userId
    useEffect(() => {
        // Si no hay userId, no hace nada
        if (!userId) return;
        // Llama a la acción para obtener el perfil por ID
        getProfileById(userId)
            .then(data => setProfile(data)) // Si hay datos, los guarda en el estado
            .catch(() => setProfile(null)); // Si hay error, deja el perfil como null
    }, [userId]); 

    // Devuelve el perfil del usuario
    return { profile };
}