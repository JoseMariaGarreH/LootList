"use client"

// Acciones
import updateProfileGame from "@/src/actions/post-updateProfileGame-action";

// Hook personalizado para actualizar el estado de un juego en el perfil de un usuario
export function useUpdateProfileGame(userId: string, currentState?: {
    played?: boolean;
    playing?: boolean;
    wishlist?: boolean;
    liked?: boolean;
    rating?: number;
}) {
    // Actualiza el estado actual del juego en el perfil del usuario, especificamente el rating
    const setRating = async (gameId: number, rating: number) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            rating,
        });
    };

    // Actualiza el estado actual del juego en el perfil del usuario, especificamente si ha jugado
    const setPlayed = async (gameId: number, played: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            played,
        });
    };

    // Actualiza el estado actual del juego en el perfil del usuario, especificamente si está jugando
    const setPlaying = async (gameId: number, playing: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            playing,
        });
    };

    // Actualiza el estado actual del juego en el perfil del usuario, especificamente si está en la lista de deseos
    const setWishlist = async (gameId: number, wishlist: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            wishlist,
        });
    };

    // Actualiza el estado actual del juego en el perfil del usuario, especificamente si le gusta
    const setLike = async (gameId: number, liked: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            liked,
        });
    };

    // Devuelve las funciones para actualizar el estado del juego en el perfil del usuario
    return { setRating, setPlayed, setPlaying, setWishlist, setLike };
}