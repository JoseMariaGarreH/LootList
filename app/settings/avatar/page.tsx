"use client"

import Footer from "@/components/menu/Footer"
import Navbar from "@/components/menu/Navbar"
import AvatarUploader from "@/components/settings/avatar/AvatarUploader"
import NavbarSettings from "@/components/settings/NavbarSettings"

export default function AvatarPage() {
    return (
        <>  
            <Navbar />
            <NavbarSettings />
            <AvatarUploader />
            <Footer />
        </>
    )
}