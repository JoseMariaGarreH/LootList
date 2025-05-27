"use client"

import UserProfileLayout from "@/components/profile/UserProfileLayout";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { useProfileById } from "@/hooks/useProfileById";
import { useProfileGame } from "@/hooks/useProfileGame";
import useGames from "@/hooks/useGames";
import { useSession } from "next-auth/react";
import AjaxLoader from "@/components/ui/AjaxLoader";
import ProfileGameListSection from "@/components/profile/ProfileGameListSection";

export default function PlayingPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);
    const { profileGames } = useProfileGame(userId);
    const { games } = useGames();

    const playingGameIds = profileGames.filter(pg => pg.playing).map(pg => pg.gameId);
    const playingGames = games.filter(game => playingGameIds.includes(game.id));

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={playingGames}
                        emptyText="No tienes juegos marcados como jugando."
                        title="Juegos que estás jugando"
                    />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}