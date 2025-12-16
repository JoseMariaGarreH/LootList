"use client"

// Hooks
import { useState, useEffect } from "react";
// Acciones
import { getComments } from "@/src/actions/get-comments-action";
import { postComment } from "@/src/actions/post-comments-action";
import { updateComment } from "@/src/actions/put-comments-action";
// Tipos
import { Comment } from "@/src/types";


// Hook personalizado para manejar las acciones que puede tener un usuario sobre los comentarios de un juego
export function useComments(gameId: string, userId?: string): {
    comments: Comment[];
    loading: boolean;
    addOrUpdateComment: (profileId: string, content: string) => Promise<void>;
    userComment: Comment | undefined;
} {
    // Estados para manejar los comentarios, su carga y el usuario que los ha creado
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    // Función para obtener los comentarios del juego
    const fetchComments = async () => {
        // Carga los comentarios del juego, si no hay gameId, no hace nada
        setLoading(true);
        try {
            // Recupera los comentarios del juego usando la acción getComments
            const data = await getComments(gameId);
            console.log("Datos del comentario:", data);
            // Si no hay comentarios, inicializa un array vacío
            const safeData = Array.isArray(data) ? data : [];
            // Mapea los comentarios para añadir el nombre del autor, si no tiene, usa "Usuario"
            const mapped = safeData.map((comment: Comment) => ({
                ...comment,
                authorName: comment.profile?.consumer?.username || "Usuario",
            }));
            // Actualiza el estado de los comentarios con los datos obtenidos
            setComments(mapped);
        } finally {
            setLoading(false);
        }
    };
    // Función para añadir o actualizar un comentario
    const addOrUpdateComment = async (profileId: string, content: string) => {
        const existing = comments.find(c => c.profileId === Number(profileId));
        if (existing) {
            await updateComment(existing.id, content);
        } else {
            await postComment(profileId, gameId, content);
        }
        await fetchComments();
    };

    // useEffect para cargar los comentarios al montar el componente
    useEffect(() => {
        if (gameId) fetchComments();
    }, [gameId]);

    // Encuentra el comentario del usuario actual, si existe
    const userComment = userId
        ? comments.find(c => c.profileId === Number(userId))
        : undefined;

    // Devuelve los comentarios, el estado de carga, la función para añadir o actualizar comentarios y el comentario del usuario
    return { comments, loading, addOrUpdateComment, userComment };
}
