"use server"

export default async function updateProfile(
    userId: string,
    profileData: {
        name: string;
        firstSurname: string;
        secondSurname: string;
        bio: string;
        location: string;
        pronoun: string;
    }
) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL;
        const res = await fetch(`${baseUrl}/api/profile/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al actualizar el perfil");
        }

        return true;
    } catch (error) {
        console.error("Error en el action [updateProfile]:", error);
        return false;
    }
}