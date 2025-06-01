"use server"

export default async function getGlobalProfileGamesByGameId(gameId: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/profileGame/game/${gameId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Error al obtener los datos globales del juego");
        }

        return await res.json();
    } catch (error) {
        console.error("Error en el action [getGlobalProfileGamesByGameId]:", error);
        return [];
    }
}