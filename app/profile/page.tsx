"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const { data: session } = useSession();
        const router = useRouter();
    
        if (!session){
            router.push("/login");
            return;
        }

    return(
        <div>
            Profile Page
        </div>
    )
}