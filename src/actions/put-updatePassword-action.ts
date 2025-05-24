"use server"

export default async function updatePassword(
    userId: string,
    newPassword: string,
) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL;
        const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPassword }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar la contraseña");
        }

        return true;
    } catch (error) {
        console.error("Error en el action [updatePassword]:", error);
        return false;
    }
}