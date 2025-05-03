"use client"

import AjaxLoader from "@/components/ui/AjaxLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {

    const { data: session, status } = useSession();
    const router = useRouter();    

    useEffect(() => {
        if (!session) {
            router.push("/auth/login");
        }
    }, [session]);

    if (!session) return null;

    return (
        <div>
            Profile Page
        </div>
    )
}