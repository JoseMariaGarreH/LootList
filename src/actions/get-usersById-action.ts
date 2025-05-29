"use server"

export default async function getUserById(userId: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener el usuario");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en el action [getUserById]:", error);
        throw error;
    }
}
