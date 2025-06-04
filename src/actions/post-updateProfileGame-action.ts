"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function updateProfileGame(
    userId: string,
    gameId: number,
    data: {
        rating?: number;
        played?: boolean;
        playing?: boolean;
        wishlist?: boolean;
        liked?: boolean;
    }
) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/profileGame/[userId]/route.ts
        const res = await fetch(`${baseUrl}/api/profileGame/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, ...data }),
        });
        
        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar el juego del perfil");
        }
        // Si lo es, devolvemos los datos en formato JSON
        return await res.json();
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [updateProfileGame]:", error);
        throw error;
    }
}