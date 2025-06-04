"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function postComment(profileId: string, gameId: string, content: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/comments/route.ts
        // Con los datos necesarios para crear un nuevo comentario
        const res = await fetch(`${baseUrl}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ profileId: Number(profileId), gameId: Number(gameId), content }),
        });
        // Verificamos si la respuesta es exitosa
        if (!res.ok) throw new Error("Error al añadir comentario");
        return await res.json(); // Retornamos los datos del comentario creado en formato JSON
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [postComment]:", error);
        throw error;
    }
}