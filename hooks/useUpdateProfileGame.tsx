"use client";

import updateProfileGame from "@/src/actions/post-updateProfileGame";

export function useUpdateProfileGame(userId: string, currentState?: {
    played?: boolean;
    playing?: boolean;
    whishlist?: boolean;
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

    const setWhishlist = async (gameId: number, whishlist: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            whishlist,
        });
    };

    const setLike = async (gameId: number, liked: boolean) => {
        await updateProfileGame(userId, gameId, {
            ...currentState,
            liked,
        });
    };

    return { setRating, setPlayed, setPlaying, setWhishlist, setLike };
}