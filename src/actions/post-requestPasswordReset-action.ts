"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function requestPasswordReset(email: string) {
    try {
        // Validamos que el email no esté vacío
        if (!email) throw new Error("El email es requerido");

        const res = await fetch(`${baseUrl}/api/auth/requestreset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        // Error al pedir el reset de contraseña
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al pedir el reset de contraseña");
        }
        return true; // Retornamos los datos de la respuesta
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [requestPasswordReset]:", error);
        return false; // Retornamos false en caso de error
    }
}