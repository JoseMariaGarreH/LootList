"use client"

// Hooks
import { useRequestResetPassword } from "@/hooks/useRequestPasswordReset";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// Librerías
import toast, { Toaster } from "react-hot-toast";
// Next.js
import Link from "next/link";



type RequestEmailFormData = {
    email: string;
};

export default function RequestEmailForm() {
    // Importamos el hook useRequestResetPassword que maneja la lógica de envío del correo de restablecimiento
    // y los estados de carga, mensaje y error
    const { sendResetEmail, isPending, message, isError } = useRequestResetPassword();
    // Importamos los hooks de react-hook-form para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm<RequestEmailFormData>();

    // useEffect para mostrar notificaciones de éxito o error al usuario
    useEffect(() => {
        // Si hay un mensaje, mostramos una notificación
        if (message) {
            if (isError) { // Si es un error, mostramos un mensaje de error
                toast.error(message);
            } else { // Si es un mensaje de éxito, mostramos un mensaje de éxito
                toast.success(message);
            }
        }
    }, [message, isError]); // Solo se ejecuta cuando cambia el mensaje o el estado de error

    // Función que se ejecuta al enviar el formulario
    const onSubmit = (data: RequestEmailFormData) => {
        sendResetEmail(data.email);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            // Expresión regular para validar, comprueba que tenga una @ y un dominio osea un .com, .es, etc...
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                            message: "Correo no válido"
                        }
                    })}
                    className="w-full px-4 py-2 rounded transition-all
                        bg-[#1d3557] text-[#F1FAEE]
                        focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                        disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                    disabled={isPending || (!isError && !!message)}
                />
                {errors.email && (
                    <span className="text-red-800 text-xs font-semibold mt-2 block">
                        {errors.email.message}
                    </span>
                )}
                {(!message || isError) ? (
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a8dadc] transition"
                    >
                        {isPending ? "Enviando..." : "Enviar enlace"}
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        className="w-full block py-2 px-4 text-white rounded-md text-center hover:bg-[#1d3557] bg-[#457b9d] active:bg-[#a8dadc] transition"
                    >
                        Ir a iniciar sesión
                    </Link>
                )}
            </form>
        </>
    );
}