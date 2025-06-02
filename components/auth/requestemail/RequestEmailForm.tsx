import { useRequestResetPassword } from "@/hooks/useRequestPasswordReset";
import Link from "next/link";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

type RequestEmailFormData = {
    email: string;
};

export default function RequestEmailForm() {
    const { sendResetEmail, isPending, message, isError } = useRequestResetPassword();

    const { register, handleSubmit, formState: { errors } } = useForm<RequestEmailFormData>();

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message);
            } else {
                toast.success(message);
            }
        }
    }, [message, isError]);

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