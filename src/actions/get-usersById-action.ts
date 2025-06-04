"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function getUserById(userId: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/users/[userId]/route.ts
        const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            throw new Error("Error al obtener el usuario");
        }

        // Si lo es, devolvemos los datos en formato JSON
        const data = await res.json();
        return data; // Retornamos los datos del usuario
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [getUserById]:", error);
        throw error;
    }
}
