"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function getProfileById(userId: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/profile/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            throw new Error("Error al obtener el perfil");
        }

        // Si lo es, devolvemos los datos en formato JSON
        const data = await res.json();
        return data; // Retornamos los datos del perfil
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [getProfileById]:", error);
        throw error;
    }
}