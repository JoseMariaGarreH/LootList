"use client"

// Hooks
import { useState, useEffect, useCallback } from "react";
// Acciones
import getProfileGameById from "@/src/actions/get-profileGameById-action";
// Tipos
import { ProfileGame } from "@/src/types";

// Hook personalizado para obtener los juegos de perfil de un usuario por su ID
export function useProfileGame(userId: string): { profileGames: ProfileGame[]; loading: boolean; refetch: () => Promise<void> } {
    // Estados para manejar los juegos de perfil, su carga y la función de refetch
    const [profileGames, setProfileGames] = useState<ProfileGame[]>([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los juegos de perfil del usuario por su ID
    const fetchProfileGames = useCallback(async () => {
        // Si no hay userId, no hace nada
        setLoading(true);
        try {
            // Llama a la acción getProfileGameById para obtener los juegos de perfil del usuario
            const data = await getProfileGameById(userId);
            setProfileGames(data || []); // Si hay datos, los guarda en el estado, si no, deja el array vacío
        } catch (error) {
            setProfileGames([]); // Si hay un error, deja el array vacío
        } finally {
            setLoading(false);  // Actualiza el estado de carga a false cuando termina la operación
        }
    }, [userId]);

    // useEffect para cargar los juegos del perfil al montar el componente o cuando cambia el userId
    useEffect(() => {
        if (userId) {
            fetchProfileGames();
        }
    }, [userId, fetchProfileGames]);

    // Devuelve los juegos de perfil, el estado de carga y la función de refetch para volver a cargar los datos
    return { profileGames, loading, refetch: fetchProfileGames };
}