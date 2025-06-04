"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function updatePassword(
    userId: string,
    newPassword: string,
) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        // declarado en app/api/users/[id]/route.ts
        const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPassword }),
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar la contraseña");
        }
        // Si lo es, retornamos true
        return { success: true };
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [updatePassword]:", error);
        // Retornamos false en caso de error
        return { success: false };
    }
}