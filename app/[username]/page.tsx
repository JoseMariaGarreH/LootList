"use client"

import UserProfileLayout from "@/components/profile/UserProfileLayout";
import ProfileInformation from "@/components/profile/ProfileInformation";
import AjaxLoader from "@/components/ui/AjaxLoader";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { useProfileById } from "@/hooks/useProfileById";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useSession } from "next-auth/react";

export default function UsernamePage() {
    const { data: session } = useSession();
    const { profile } = useProfileById(session?.user?.id || "");
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