"use server"

export async function postComment(profileId: string, gameId: string, content: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profileId: Number(profileId), gameId: Number(gameId), content }),
        });
        if (!res.ok) throw new Error("Error al añadir comentario");
        return await res.json();
    } catch (error) {
        console.error("Error en el action [postComment]:", error);
        throw error;
    }
}