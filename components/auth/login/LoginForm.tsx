"use client"

// Hooks
import { useForm } from "react-hook-form";
// Librerías
import toast, { Toaster } from "react-hot-toast";
// Next.js
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {

    // Importamos los hooks necesarios de react-hook-form, para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Importamos el hook useRouter de next navigation, para redirigir al usuario después de iniciar sesión
    const router = useRouter();

    // Definimos la función onSubmit que se ejecutará al enviar el formulario
    const onSubmit = handleSubmit(async (data) => {
        // Mostramos un mensaje de carga mientras se procesa la solicitud
        const respuesta = await signIn("credentials",{
            email: data.email,
            password: data.password,
            redirect: false
        })

        // Si la respuesta contiene un error, mostramos un mensaje de error
        if (respuesta?.error) {
            toast.error("Error al iniciar sesión");
        } else { // Si no hay error, mostramos un mensaje de éxito
            router.push("/"); // Y redirigimos al usuario a la página principal
        }

        console.log(respuesta); // Log de la respuesta para depuración
    })

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <form onSubmit={onSubmit} className="space-y-4 border rounded border-[#a8dadc] bg-[#355f7a] shadow-lg p-5">
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
                        <Link href="/auth/requestemail" className="text-[#a8dadc] hover:underline text-sm">
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