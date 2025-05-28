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

export default function WishlistPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);
    const { profileGames } = useProfileGame(userId);
    const { games } = useGames();

    const [page, setPage] = useState(1);
    const pageSize = 20;

    const wishlistGameIds = profileGames.filter(pg => pg.wishlist).map(pg => pg.gameId);
    const wishlistGames = games.filter(game => wishlistGameIds.includes(game.id));

    const countWishlistGames = wishlistGames.length;

    const totalPages = Math.ceil(wishlistGames.length / pageSize);
    const displayedGames = wishlistGames.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={displayedGames}
                        emptyText="No tienes juegos marcados como en tu lista de deseos."
                        title={`${countWishlistGames} juego${countWishlistGames !== 1 ? "s" : ""} en tu lista de deseos`}
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