"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function verifyPassword(email: string, password: string) {
    try {
        // Generamos la URL completa para la API, con la que llamaremos al endpoint
        const res = await fetch(`${baseUrl}/api/users/verify-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Verificamos si la respuesta es exitosa
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al verificar la contraseña");
        }

        return {success: true}; // Retornamos un objeto indicando éxito
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [verifyPassword]:", error);
        return {success: false};
    }
}