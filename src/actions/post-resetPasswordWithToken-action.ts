"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function resetPasswordWithToken(token: string, newPassword: string) {
    try {
        const res = await fetch(`${baseUrl}/api/auth/resetpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password: newPassword }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "No se pudo cambiar la contraseña");
        }
        return { success: data.success }; // Retornamos el resultado de la operación
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [resetPasswordWithToken]:", error);
        throw error; // Re-lanzamos el error para que pueda ser manejado por el componente que lo llama
    }
}