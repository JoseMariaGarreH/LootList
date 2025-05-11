"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function UserForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const {
            username,
            email,
            password,
            confirmPassword
        } = data;

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const respuesta = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })

        if (respuesta.ok) {
            router.push("/auth/login");
        } else {
            toast.error("Error al registrarse, el nombre de usuario o el correo ya están en uso");
        }

        console.log(respuesta);
    })


    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form onSubmit={onSubmit} className="space-y-4 border rounded border-[#a8dadc] shadow-lg p-5">
                <div>
                    <label htmlFor="username_label" className="block text-sm font-semibold text-white">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 rounded transition-all
                    bg-[#1d3557] text-[#F1FAEE]
                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-username"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "El nombre de usuario es obligatorio"
                            }
                        })}

                    />

                    {
                        errors.username && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.username?.message === "string" && errors.username.message}
                            </span>
                        )
                    }
                </div>

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
                    <label htmlFor="password_label" className="block text-sm font-semibold text-white">
                        Contraseña
                    </label>
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
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message: "Debes tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
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
                    <label htmlFor="confirmPassword_label" className="block text-sm font-semibold text-white">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 rounded transition-all
                    bg-[#1d3557] text-[#F1FAEE]
                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                        autoComplete="new-confirmPassword"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "La confirmación de contraseña es obligatoria"
                            }
                        })}
                    />
                    {
                        errors.confirmPassword && (
                            <span className="text-red-800 text-xs font-semibold mt-2">
                                {typeof errors.confirmPassword?.message === "string" && errors.confirmPassword.message}
                            </span>
                        )
                    }
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </>
    )
}