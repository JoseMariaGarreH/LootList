"use server"

export default async function getUserComments(profileId: number) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/comments/profile/${profileId}`);
        if (!res.ok) throw new Error("Error al obtener comentarios");
        return await res.json();
    } catch (error) {
        console.error("Error en [getUserComments]:", error);
        throw error;
    }
}