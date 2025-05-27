"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPasswordWithToken } from "@/src/actions/post-resetPasswordWithToken-action";
import toast, { Toaster } from "react-hot-toast";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isPending, setIsPending] = useState(false);
    const router = useRouter()

    const onSubmit = async (data: any) => {
        if (!token) {
            toast.error("Token no válido");
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        setIsPending(true);
        try {
            await resetPasswordWithToken(token, data.password);
            toast.success("Contraseña cambiada correctamente");
        } catch (e: any) {
            toast.error(e?.message || "Error al cambiar la contraseña");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="bg-[#457b9d] rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-[#a8dadc]/30">
                    <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-[#f1faee]">Cambiar contraseña</h1>
                    <p className="text-sm text-[#f1faee] mb-6">
                        Introduce tu nueva contraseña a continuación.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="text-left">
                            <label htmlFor="password" className="block text-sm font-semibold text-white mb-1">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 rounded transition-all
                            bg-[#1d3557] text-[#F1FAEE]
                            focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                            disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                                autoComplete="new-password"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: "Debes tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
                                    }
                                })}
                                disabled={isPending}
                            />
                        </div>
                        <div className="text-left">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-1">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-4 py-2 rounded transition-all
                            bg-[#1d3557] text-[#F1FAEE]
                            focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                            disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                                autoComplete="new-password"
                                {...register("confirmPassword", {
                                    required: "La confirmación de contraseña es obligatoria"
                                })}
                                disabled={isPending}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                        >
                            {isPending ? "Cambiando..." : "Cambiar contraseña"}
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
}