"use client"

// Componentes
import UserProfileLayout from "@/components/profile/UserProfileLayout";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import Pagination from "@/components/games/Pagination";
import AjaxLoader from "@/components/ui/AjaxLoader";
import ProfileGameListSection from "@/components/profile/ProfileGameListSection";
// Hooks
import { useProfileById } from "@/hooks/useProfileById";
import { useProfileGame } from "@/hooks/useProfileGame";
import useGames from "@/hooks/useGames";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Gift } from "lucide-react";

// Página para mostrar los juegos que el usuario ha quiere jugar en algún momento
export default function WishlistPage() {
    // Obtener la sesión del usuario actual
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    // Obtener el perfil del usuario
    const { profile } = useProfileById(userId);
    // Los juegos con los que el usuario ha interactuado
    const { profileGames } = useProfileGame(userId);
    // Obtener la lista de juegos disponibles
    const { games } = useGames();

    // Estado para manejar la paginación de los juegos en la lista de deseos
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // Filtrar los juegos que están en la lista de deseos del usuario
    const wishlistGameIds = profileGames.filter(pg => pg.wishlist).map(pg => pg.gameId);
    const wishlistGames = games.filter(game => wishlistGameIds.includes(game.id));

    // Contar la cantidad de juegos en la lista de deseos del usuario
    const countWishlistGames = wishlistGames.length;

    // Calcular la cantidad total de páginas y los juegos que se mostrarán en la página actual
    const totalPages = Math.ceil(wishlistGames.length / pageSize);
    const displayedGames = wishlistGames.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={displayedGames}
                        emptyText="No tienes juegos marcados como en tu lista de deseos"
                        title={`${countWishlistGames} juego${countWishlistGames !== 1 ? "s" : ""} en tu lista de deseos`}
                        icon={<Gift className="mr-2" size={50} />}
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