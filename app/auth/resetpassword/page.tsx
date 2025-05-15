"use client"

import ResetPasswordForm from "@/components/auth/resetpassword/ResetPasswordForm"
import Footer from "@/components/menu/Footer"
import Navbar from "@/components/menu/Navbar"

export default function ResetPasswordPage() {

    
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-3xl font-bold text-[#f1faee]">
                    Cambia tu contraseña
                </h1>
                <p className="m-4 text-base md:text-md text-[#f1faee]">
                    Cambiar la contraseña de LootList para {"username"}...
                </p>
                <ResetPasswordForm />
            </div>
            <Footer />
        </>
    )
}