"use client"

import updateProfileGame from "@/src/actions/post-updateProfileGame-action";

export default async function useUpdateProfileGame(
    profileId: string,
    gameId: number,
    data: {
        rating?: number;
        played?: boolean;
        playing?: boolean;
        wishlist?: boolean;
        liked?: boolean;
    }
) {
    try{
        const result = await updateProfileGame(profileId, gameId, data);
        console.log("El perfil del juego ha sido actualizado:", result);
    } catch (error) {
        console.error("Error al actualizar el perfil del juego:", error);
    }
}