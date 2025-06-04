"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API    
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function getGlobalProfileGamesByGameId(gameId: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/profileGame/game/[gameId]/route.ts
        const res = await fetch(`${baseUrl}/api/profileGame/game/${gameId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            throw new Error("Error al obtener los datos globales del juego");
        }
        // Si lo es devolvemos los datos en formato JSON
        return await res.json();
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [getGlobalProfileGamesByGameId]:", error); 
        throw error;
    }
}