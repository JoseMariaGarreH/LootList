import { useRequestResetPassword } from "@/hooks/useRequestPasswordReset";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RequestEmailForm() {

    const [email, setEmail] = useState('');
    const { sendResetEmail, isPending, message, isError } = useRequestResetPassword();

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message);
            } else {
                toast.success(message);
            }
        }
    }, [message, isError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendResetEmail(email);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded transition-all
                                    bg-[#1d3557] text-[#F1FAEE]
                                    focus:bg-white focus:text-black focus:border focus:border-black focus:outline-none
                                    disabled:bg-[#D9D9D9] disabled:text-[#A0A0A0]"
                    disabled={isPending || (!isError && !!message)}
                />
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