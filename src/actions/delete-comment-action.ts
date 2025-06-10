"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function deleteComment(commentId: number) {
    try {
        const res = await fetch(`${baseUrl}/api/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Respuesta del servidor:", res); // Log de la respuesta para depuración
        if (!res.ok) throw new Error("Error al borrar el comentario");
        return await res.json();
    } catch (error) {
        console.error("Error en [deleteComment]:", error);
        throw error;
    }
}