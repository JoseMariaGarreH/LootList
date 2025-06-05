"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function updateProfile(
    userId: string,
    profileData: {
        name: string;
        firstSurname: string;
        secondSurname: string;
        bio: string;
        location: string;
        pronoun: string;
    }
) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/profile/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar el perfil");
        }

        // Si lo es, retornamos verdadero
        return true;
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [updateProfile]:", error);
        // Retornamos false en caso de error
        return false;
    }
}