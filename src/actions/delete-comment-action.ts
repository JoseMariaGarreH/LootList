"use server";

 // URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function deleteComment(commentId: number) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/comments/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Verificamos si la respuesta es exitosa
        console.log("Respuesta del servidor:", res); // Log de la respuesta para depuración
        // Si no es exitosa, lanzamos un error
        if (!res.ok) throw new Error("Error al borrar el comentario");
        return await res.json(); // Retornamos los datos en formato JSON
    } catch (error) {
        console.error("Error en [deleteComment]:", error);
        throw error;
    }
}