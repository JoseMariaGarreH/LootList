"use server"

export default async function updateProfileGame(
    userId: string,
    gameId: number,
    data: {
        rating?: number;
        played?: boolean;
        playing?: boolean;
        whishlist?: boolean;
        liked?: boolean;
    }
) {
    try {
        console.log("Actualizando juego del perfil:", { userId, gameId, data });
        const baseUrl = process.env.NEXTAUTH_URL;
        const res = await fetch(`${baseUrl}/api/profileGame/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, ...data }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar el juego del perfil");
        }

        return await res.json();
    } catch (error) {
        console.error("Error en el action [updateProfileGame]:", error);
        throw error;
    }
}