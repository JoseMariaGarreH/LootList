"use server";

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function updateComment(id: number, content: string) {

    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/comments/[id]/route.ts
        const response = await fetch(`${baseUrl}/api/comments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Failed to update comment");
        }
        // Si lo es, devolvemos los datos en formato JSON
        return await response.json();
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [updateComment]:", error);
        throw error;
    }
}