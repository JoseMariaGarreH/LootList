"use server"

// Constante que define la URL base de la aplicación, 
// se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function getGames() {
    try {     
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/games/route.ts
        const res = await fetch(`${baseUrl}/api/games`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            throw new Error("Error al obtener los juegos");
        }

        // Si lo es, devolvemos los datos en formato JSON
        const data = await res.json();
        return data;
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [getGames]:", error);
        throw error; // Lanzamos el error para que pueda ser manejado por el componente que lo llama
    }
}