"use client"

// Componentes
import UserProfileLayout from "@/components/profile/UserProfileLayout";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import AjaxLoader from "@/components/ui/AjaxLoader";
import ProfileReviews from "@/components/profile/ProfileReviews";
// Hooks
import { useProfileById } from "@/hooks/useProfileById";
import { useSession } from "next-auth/react";
// Iconos
import { Quote } from "lucide-react";

// Página para mostrar las reseñas del usuario
export default function ReviewsPage() {
    // Obtener la sesión del usuario actual
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    // Obtener el perfil del usuario
    const { profile } = useProfileById(userId);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <div className="max-w-7xl mx-auto mt-8 px-2 sm:px-4">
                        <h1 className="text-2xl font-bold mb-4 flex items-center"> <Quote className="mr-2" size={50} /> Reseñas de {session?.user.username}</h1>
                    </div>
                        <ProfileReviews profileId={profile.id} />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}