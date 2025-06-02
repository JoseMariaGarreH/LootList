"use client"

import updateProfileGame from "@/src/actions/post-updateProfileGame-action";

export function useUpdateProfileGame(userId: string, currentState?: {
    played?: boolean;
    playing?: boolean;
    wishlist?: boolean;
    liked?: boolean;
    rating?: number;
}) {

    const setRating = async (gameId: number, rating: number) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            rating,
        });
    };

    const setPlayed = async (gameId: number, played: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            played,
        });
    };

    const setPlaying = async (gameId: number, playing: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            playing,
        });
    };

    const setWishlist = async (gameId: number, wishlist: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            wishlist,
        });
    };

    const setLike = async (gameId: number, liked: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            liked,
        });
    };

    return { setRating, setPlayed, setPlaying, setWishlist, setLike };
}