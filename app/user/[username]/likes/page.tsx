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

export default function WishlistPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);
    const { profileGames } = useProfileGame(userId);
    const { games } = useGames();

    const likedGameIds = profileGames.filter(pg => pg.liked).map(pg => pg.gameId);
    const likedGames = games.filter(game => likedGameIds.includes(game.id));

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={likedGames}
                        emptyText="No tienes juegos marcados como te gustaron."
                        title="Juegos que te gustaron"
                    />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}