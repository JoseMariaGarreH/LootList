"use server"

export default async function verifyPassword(email: string, password: string) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL;
        const res = await fetch(`${baseUrl}/api/users/verify-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al verificar la contraseña");
        }

        return true;
    } catch (error) {
        console.error("Error en el action [verifyPassword]:", error);
        return false;
    }
}