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

// Página para mostrar los juegos que le gustaron al usuario
export default function LikesPage() {
    // Obtener la sesión del usuario actual
    const { data: session } = useSession();
    const userId = session?.user?.id || ""; // Obtener el ID del usuario de la sesión

    // Obtener el perfil del usuario 
    const { profile } = useProfileById(userId);
    // Los juegos con los que el usuario ha interactuado
    const { profileGames } = useProfileGame(userId);
    // Obtener la lista de juegos disponibles
    const { games } = useGames();

    // Estado para manejar la paginación de los juegos que le gustaron al usuario
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // Filtrar los juegos que le gustaron al usuario
    const likedGameIds = profileGames.filter(pg => pg.liked).map(pg => pg.gameId);
    const likedGames = games.filter(game => likedGameIds.includes(game.id));

    // Contar la cantidad de juegos que le gustaron al usuario
    const countLikedGames = likedGames.length;

    // Calcular la cantidad total de páginas y los juegos que se mostrarán en la página actual
    const totalPages = Math.ceil(likedGames.length / pageSize);
    const displayedGames = likedGames.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={displayedGames}
                        emptyText="No tienes juegos marcados como te gustaron."
                        title={`${countLikedGames} juego${countLikedGames !== 1 ? "s" : ""} que le gustó a ${session?.user?.username}`}
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