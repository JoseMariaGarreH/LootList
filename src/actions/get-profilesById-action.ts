"use server"

export default async function getProfileById(userId: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (!res.ok) {
            throw new Error("Error al obtener el perfil");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error en el action [getProfileById]:", error);
        throw error;
    }
}