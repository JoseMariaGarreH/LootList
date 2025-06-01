"use server"

export async function getComments(gameId: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/comments/${gameId}`);
        if (!res.ok) throw new Error("Error al obtener comentarios");
        return await res.json();
    } catch (error) {
        console.error("Error en el action [getComments]:", error);
        throw error;
    }
}

