"use client"

// Hooks
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "@/hooks/useResetPassord";
// Librerías
import toast, { Toaster } from "react-hot-toast";

// Definimos la estructura de los datos del formulario de restablecimiento de contraseña
type ResetPasswordFormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordForm() {
    // El hook useSearchParams nos permite acceder a los parámetros de búsqueda de la URL
    const searchParams = useSearchParams();
    // Obtenemos el token de los parámetros de búsqueda, que genera el backend al enviar el correo de restablecimiento de contraseña
    const token = searchParams.get("token");
    // El hook useRouter nos permite navegar a otras páginas de la aplicación
    const router = useRouter()
    // Importamos el hook useForm de react-hook-form para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>();
    // Estado para manejar el estado de carga del formulario
    const [isPending, setIsPending] = useState(false);
    // Importamos el hook useResetPassword que maneja la lógica de restablecimiento de contraseña
    const { resetPassword } = useResetPassword();

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async (data: ResetPasswordFormData) => {
        // Validamos que haya un token
        if (!token) {
            toast.error("Token no válido");
            return;
        }
        // Validamos que las contraseñas coincidan
        if (data.password !== data.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        // Mostramos un mensaje de carga mientras se procesa la solicitud
        setIsPending(true);
        try {
            // Llamamos a la función resetPassword que se encarga de enviar la solicitud al backend
            const result = await resetPassword(token, data.password);
            if (result) {
                // Si la solicitud es exitosa, mostramos un mensaje de éxito
                router.push("/auth/login");
            } else {
                toast.error("El enlace de restablecimiento es inválido o ya ha sido utilizado.");
            }
        } catch (e: any) {
            toast.error(e?.message || "Error al cambiar la contraseña");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
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