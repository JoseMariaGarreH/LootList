"use client"

// Hooks
import updateProfileGame from "@/src/actions/post-updateProfileGame-action";

// Hook personalizado para actualizar el estado de un juego en el perfil
export function useUpdateProfileGame(): {
    changeProfileGame: (
        profileId: string,
        gameId: number,
        data: {
            rating?: number;
            played?: boolean;
            playing?: boolean;
            wishlist?: boolean;
            liked?: boolean;
        }
    ) => Promise<boolean>;
} {
    // Función para cambiar el estado de un juego en un perfil
    const changeProfileGame = async (
        profileId: string,
        gameId: number,
        data: {
            rating?: number;
            played?: boolean;
            playing?: boolean;
            wishlist?: boolean;
            liked?: boolean;
        }
    ) => {
        try {
            await updateProfileGame(profileId, gameId, data);
            return true;
        } catch {
            return false;
        }
    };

    // Devuelve la función changeProfileGame para usarla en el componente
    return { changeProfileGame };
}