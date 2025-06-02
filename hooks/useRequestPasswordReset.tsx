"use client"

import { useState, useTransition } from "react";
import { requestPasswordReset } from "@/src/actions/post-requestPasswordReset-action";

export function useRequestResetPassword() : {
    sendResetEmail: (email: string) => void;
    isPending: boolean;
    message: string;
    isError: boolean;
} {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const sendResetEmail = (email: string) => {
        setMessage('');
        setIsError(false);
        startTransition(async () => {
            try {
                const res = await requestPasswordReset(email);
                if (res.success) {
                    setMessage("Correo enviado con éxito");
                } else {
                    setMessage("No se pudo enviar el correo");
                    setIsError(true);
                }
            } catch (error: any) {
                setMessage(error.message || "No se pudo enviar el correo");
                setIsError(true);
            }
        });
    };

    return { sendResetEmail, isPending, message, isError };
}