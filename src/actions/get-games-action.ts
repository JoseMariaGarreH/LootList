"use server"

export default async function getGames() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/games`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los juegos");
        }

        return await res.json();
    } catch (error) {
        console.error("Error en el action [getGames]:", error);
        throw error;
    }
}