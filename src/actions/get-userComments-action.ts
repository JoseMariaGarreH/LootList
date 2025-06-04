"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function getUserComments(profileId: number) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/comments/profile/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/comments/profile/${profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Verificamos si la respuesta es exitosa
        if (!res.ok) throw new Error("Error al obtener comentarios");
        return await res.json(); // Retornamos los datos en formato JSON
    } catch (error) {
        // Log del error para depuración
        console.error("Error en [getUserComments]:", error);
        throw error;
    }
}