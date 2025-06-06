"use client"

// Componentes
import UserProfileLayout from "@/components/profile/UserProfileLayout";
import ProfileInformation from "@/components/profile/ProfileInformation";
import AjaxLoader from "@/components/ui/AjaxLoader";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
// Hooks
import { useProfileById } from "@/hooks/useProfileById";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useSession } from "next-auth/react";

// Página para mostrar la información del perfil del usuario
export default function UsernamePage() {
    // Obtener la sesión del usuario actual
    const { data: session } = useSession();
    // Obtener el perfil del usuario
    const { profile } = useProfileById(session?.user?.id || "");
    // Los juegos con los que el usuario ha interactuado
    const { profileGames } = useProfileGame(session?.user?.id || "");

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileInformation profile={profile} profileGames={profileGames} />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}