"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        
        const respuesta = await signIn("credentials",{
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (respuesta?.error) {
            toast.error("Error al iniciar sesión");
        } else {
            router.push("/");
        }

        console.log(respuesta);
    })

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form onSubmit={onSubmit} className="space-y-4 border rounded border-[#a8dadc] shadow-lg p-5">
                <div>
                    <label htmlFor="email_label" className="block text-sm font-semibold text-white">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded transition-all
                                bg-[#1d3557] text-[#F1FAEE]
                                focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El correo electrónico es obligatorio"
                            }
                        })}
                    />

                    {
                        errors.email && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.email?.message === "string" && errors.email.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="password_label" className="block text-sm font-semibold text-white">
                            Contraseña
                        </label>
                        <Link href="/settings/password" className="text-[#a8dadc] text-sm">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 rounded transition-all
                                bg-[#1d3557] text-[#F1FAEE]
                                focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña es obligatoria"
                            }
                        })}
                    />

                    {
                        errors.password && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.password?.message === "string" && errors.password.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </>
    )
}