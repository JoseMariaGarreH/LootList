"use client"

import UserProfileLayout from "@/components/profile/UserProfileLayout";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { useProfileById } from "@/hooks/useProfileById";
import { useProfileGame } from "@/hooks/useProfileGame";
import useGames from "@/hooks/useGames";
import { useSession } from "next-auth/react";
import GameCard from "@/components/games/GameCard";
import AjaxLoader from "@/components/ui/AjaxLoader";

export default function PlayedPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);
    const { profileGames } = useProfileGame(userId);
    const { games } = useGames();

    const playedGameIds = profileGames.filter(pg => pg.played).map(pg => pg.gameId);
    const playedGames = games.filter(game => playedGameIds.includes(game.id));

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <div className="max-w-7xl mx-auto mt-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-2 px-12 pb-10 max-w-7xl mx-auto">
                            {playedGames.length === 0 ? (
                                <p className="text-center text-[#f1faee] w-full col-span-full">
                                    No tienes juegos marcados como jugados.
                                </p>
                            ) : (
                                playedGames.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))
                            )}
                        </div>
                    </div>
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}