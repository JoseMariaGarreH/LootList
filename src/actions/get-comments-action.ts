"use server"

 // URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function getComments(gameId: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/comments/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/comments/${gameId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Verificamos si la respuesta es exitosa
        if (!res.ok) throw new Error("Error al obtener comentarios");
        // Retornamos los datos en formato JSON
        return await res.json();
    } catch (error) {
        console.error("Error en el action [getComments]:", error); // Log del error para depuración
        throw error;
    }
}

