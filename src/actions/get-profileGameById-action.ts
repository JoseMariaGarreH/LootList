"use server"

export default async function getProfileGameById(userId: string) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL;
        const res = await fetch(`${baseUrl}/api/profileGame/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los juegos del perfil");
        }

        return await res.json();
    } catch (error) {
        console.error("Error en el action [getProfileGameById]:", error);
        return [];
    }
}