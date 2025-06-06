"use client"

// Hooks
import { useEffect, useState } from "react";
// Tipos
import { ProfileGame } from "@/src/types";
// Acciones
import getGlobalProfileGames from "@/src/actions/get-globalProfileGames-action";

// Hook personalizado para obtener los datos globales de profileGame asociados a un gameId específico
export function useGlobalProfileGames(gameId: string): { globalProfileGames: ProfileGame[] } {
    // Estado para almacenar los datos globales de profileGame
    const [globalProfileGames, setGlobalProfileGames] = useState<ProfileGame[]>([]);

    // useEffect para cargar los datos cuando cambia el gameId
    useEffect(() => {
        // Si no hay gameId, no hace nada
        if (!gameId) return;
        // Llama a la acción para obtener los datos globales de profileGame
        getGlobalProfileGames(gameId)
            .then(data => setGlobalProfileGames(data || [])) // Si hay datos, los guarda en el estado
            .catch(() => setGlobalProfileGames([])); // Si hay error, deja el array vacío
    }, [gameId]);

    // Devuelve los datos globales de profileGame
    return { globalProfileGames };
}