"use server"

// URL base de la aplicación, se usa para construir la URL completa de la API
const baseUrl = process.env.NEXT_PUBLIC_URL;

export async function resetPasswordWithToken(token: string, newPassword: string) {
    try {
        // Validamos que el token y la nueva contraseña no estén vacíos
        const res = await fetch(`${baseUrl}/api/auth/resetpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password: newPassword }),
        });

        // Verificamos si la respuesta es exitosa
        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "No se pudo cambiar la contraseña");
        }
        return true  // Retornamos el resultado de la operación
    } catch (error) {
        // Log del error para depuración
        console.error("Error en el action [resetPasswordWithToken]:", error);
        return false;  // Retornamos false en caso de error
    }
}