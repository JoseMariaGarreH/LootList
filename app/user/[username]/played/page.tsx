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
import { Gamepad2 } from "lucide-react";

// Página para mostrar los juegos que el usuario ha jugado
export default function PlayedPage() {
    // Obtener la sesión del usuario actual
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    // Obtener el perfil del usuario
    const { profile } = useProfileById(userId);
    // Los juegos con los que el usuario ha interactuado
    const { profileGames } = useProfileGame(userId);
    // Obtener la lista de juegos disponibles
    const { games } = useGames();

    // Estado para manejar la paginación de los juegos que el usuario ha jugado
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // Filtrar los juegos que el usuario ha jugado
    const playedGameIds = profileGames.filter(pg => pg.played).map(pg => pg.gameId);
    const playedGames = games.filter(game => playedGameIds.includes(game.id));

    // Contar la cantidad de juegos que el usuario ha jugado
    const countPlayedGames = playedGames.length;

    // Calcular la cantidad total de páginas y los juegos que se mostrarán en la página actual
    const totalPages = Math.ceil(playedGames.length / pageSize);
    const displayedGames = playedGames.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileGameListSection
                        games={displayedGames}
                        emptyText="No tienes juegos marcados como jugados"
                        title={`${countPlayedGames} juego${countPlayedGames !== 1 ? "s" : ""} que has jugado`}
                        icon={<Gamepad2 className="mr-2" size={50} />}
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