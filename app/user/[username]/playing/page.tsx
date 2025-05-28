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
import { useState } from "react";
import Pagination from "@/components/games/Pagination";

export default function PlayingPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);
    const { profileGames } = useProfileGame(userId);
    const { games } = useGames();

    const [page, setPage] = useState(1);
    const pageSize = 20;

    const playingGameIds = profileGames.filter(pg => pg.playing).map(pg => pg.gameId);
    const playingGames = games.filter(game => playingGameIds.includes(game.id));

    const countPlayingGames = playingGames.length;

    const totalPages = Math.ceil(playingGames.length / pageSize);
    const displayedGames = playingGames.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={displayedGames}
                        emptyText="No tienes juegos marcados como jugando."
                        title={`${countPlayingGames} juego${countPlayingGames !== 1 ? "s" : ""} que estás jugando`}
                    />
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}