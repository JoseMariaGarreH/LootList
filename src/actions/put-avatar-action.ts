"use server"

// Variables de entorno para la URL base de la aplicación, para contruir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function putAvatarAction(formData: FormData){
    try {
        // Montamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/profile/avatar/route.ts 
        const res = await fetch(`${baseUrl}/api/profile/avatar`, {
            method: "PUT",
            body: formData,
        });

        // Comprobamos si la respuesta es correcta
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar el avatar");
        }

        // Si la respuesta es correcta, obtenemos la URL del nuevo avatar
        const data = await res.json();
        return data.url; // Retornamos la URL del nuevo avatar
    } catch (error) {
        // Log del error para depuración
        console.error("Error al actualizar el avatar:", error);
        throw error;
    }
}
