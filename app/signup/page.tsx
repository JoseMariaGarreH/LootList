"use client"

import SignUpForm from "@/components/signup/SignUpForm";
import Logo from "@/components/ui/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {

    const { data: session } = useSession();
    const router = useRouter();

    if (session){
        router.push("/profile");
        return;
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#457b9d]">
                <div className="w-full max-w-md p-8 space-y-6">
                    <div className="flex justify-center">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>

                    <h2 className="text-center text-xl font-semibold text-[#e63946] text-[26px]">
                        Crear una cuenta
                    </h2>

                    <SignUpForm></SignUpForm>

                    <div className="flex justify-center text-sm border rounded border-[#a8dadc] shadow-lg p-5">
                        <p className="mr-2 text-black font-light">¿Ya tienes una cuenta?</p>
                        <Link href="/login" className="text-[#a8dadc] hover:underline">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}