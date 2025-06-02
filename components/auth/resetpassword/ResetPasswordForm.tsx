"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordWithToken } from "@/src/actions/post-resetPasswordWithToken-action";
import toast, { Toaster } from "react-hot-toast";

type ResetPasswordFormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordForm() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>();
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (data: ResetPasswordFormData) => {
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
            router.push("/auth/login");
        } catch (e: any) {
            toast.error(e?.message || "Error al cambiar la contraseña");
        } finally {
            setIsPending(false);
        }
    };


    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
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
                    {
                        errors.password && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.password?.message === "string" && errors.password.message}
                            </span>
                        )
                    }
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
        </>
    )
}