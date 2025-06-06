"use client"

// Componentes
import PasswordForm from "@/components/settings/password/PasswordForm";
import NavbarSettings from "@/components/settings/NavbarSettings";
import Navbar from "@/components/menu/Navbar";
import Footer from "@/components/menu/Footer";

// Página para cambiar la contraseña del usuario en la configuración de la cuenta
export default function PasswordPage() {
    return (
        <>
            <Navbar />
                <NavbarSettings></NavbarSettings>
                <div className="max-w-md mx-auto mt-14 mb-40 p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Cambiar contraseña</h1>
                    <PasswordForm />
                </div>
            <Footer />
        </>
    );
}