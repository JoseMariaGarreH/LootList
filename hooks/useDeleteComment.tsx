"use client";

// Hooks
import { useState } from "react";
// Acciones
import { deleteComment } from "@/src/actions/delete-comment-action";

// Hook personalizado para manejar la lógica de borrado de comentarios
export function useDeleteComment(commentId : number) {
    // Estado para indicar si se está realizando una operación de carga
    const [loading, setLoading] = useState(false);

    // Función para borrar un comentario
    const handleDelete = async () => {
        setLoading(true); // Indica que la operación está en curso
        try {
            // Llama a la acción que realiza la petición para borrar el comentario
            await deleteComment(commentId);
        } catch (error) { // Maneja el error en caso de que falle la petición
            console.error("Error al eliminar comentario:", error);
        } finally {
            setLoading(false); // Finaliza la operación de carga
        }
    };

    return { deleteComment: handleDelete, loading };
}