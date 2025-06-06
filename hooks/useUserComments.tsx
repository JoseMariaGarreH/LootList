"use client"

// Hooks
import { useEffect, useState } from "react";
// Acciones
import getUserComments from "@/src/actions/get-userComments-action"
// Tipos
import { Comment } from "@/src/types";

// Hook personalizado para obtener los comentarios de un usuario por su ID de perfil
export function useUserComments(profileId: number) : { comments: Comment[], loading: boolean } {
    // Estados para manejar los comentarios y el estado de carga
    const [comments, setComments] = useState([]);
    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los comentarios cuando cambia el profileId
    useEffect(() => { 
        // Si no hay profileId, no hace nada
        if (!profileId) return;
        getUserComments(profileId) // Llama a la acción para obtener los comentarios del usuario
            .then(data => setComments(data)) // Si hay datos, los guarda en el estado
            .finally(() => setLoading(false)); // Cuando termina la carga, actualiza el estado de carga a false
    }, [profileId]);

    // Devuelve los comentarios del usuario y el estado de carga
    return { comments, loading };
}