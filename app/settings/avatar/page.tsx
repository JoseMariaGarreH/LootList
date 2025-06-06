"use client"

// Componentes
import Footer from "@/components/menu/Footer"
import Navbar from "@/components/menu/Navbar"
import AvatarUploader from "@/components/settings/avatar/AvatarUploader"
import NavbarSettings from "@/components/settings/NavbarSettings"

// Página para subir y cambiar el avatar del usuario en la configuración de la cuenta
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