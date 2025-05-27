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

    const wishlistGameIds = profileGames.filter(pg => pg.wishlist).map(pg => pg.gameId);
    const wishlistGames = games.filter(game => wishlistGameIds.includes(game.id));

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={wishlistGames}
                        emptyText="No tienes juegos marcados como en tu lista de deseos."
                        title="Juegos en tu lista de deseos"
                    />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}