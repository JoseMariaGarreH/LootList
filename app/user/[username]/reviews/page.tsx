"use client"

import UserProfileLayout from "@/components/profile/UserProfileLayout";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { useProfileById } from "@/hooks/useProfileById";
import { useSession } from "next-auth/react";
import AjaxLoader from "@/components/ui/AjaxLoader";
import ProfileReviews from "@/components/profile/ProfileReviews";

export default function WishlistPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);

    return (
        <>
            <Navbar />
            {profile ? (
                <UserProfileLayout profile={profile} session={session}>
                    <ProfileReviews profileId={profile.id} />
                </UserProfileLayout>
            ) : (
                <AjaxLoader />
            )}
            <Footer />
        </>
    );
}