"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [error, setError] = useState("");    

    const onSubmit = handleSubmit(async (data) => {

        const respuesta = await signIn("credentials",{
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (respuesta?.error) {
            setError(respuesta.error);
        } else {
            router.push("/profile");
        }

        console.log(respuesta);
    })

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4 border rounded border-[#a8dadc] shadow-lg p-5">

                {
                    error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )
                }

                <div>
                    <label htmlFor="email_label" className="block text-sm font-light text-black">
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
                            <span className="text-red-500 text-xs mt-1">
                                {typeof errors.email?.message === "string" && errors.email.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="password_label" className="block text-sm font-light text-black">
                            Contraseña
                        </label>
                        <Link href="#" className="text-[#a8dadc] text-sm">
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
                            <span className="text-red-500 text-xs mt-1">
                                {typeof errors.password?.message === "string" && errors.password.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </>
    )
}