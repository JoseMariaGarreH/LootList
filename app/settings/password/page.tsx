"use client"

import PasswordForm from "@/components/settings/password/PasswordForm";
import NavbarSettings from "@/components/settings/NavbarSettings";

export default function NavbarProfile() {
    return (
        <>
            <NavbarSettings></NavbarSettings>
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Cambiar contraseña</h1>
                <PasswordForm></PasswordForm>
            </div>
        </>
    );
}