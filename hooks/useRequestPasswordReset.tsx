"use client"

// Hooks
import { useState, useTransition } from "react";
// Acciones
import { requestPasswordReset } from "@/src/actions/post-requestPasswordReset-action";

// Hook personalizado para solicitar un restablecimiento de contraseña
export function useRequestResetPassword() : {
    sendResetEmail: (email: string) => void;
    isPending: boolean;
    message: string;
    isError: boolean;
} {
    // Estados para manejar el envío del correo, el estado de carga y los mensajes de éxito o error
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Función para enviar el correo de restablecimiento de contraseña
    const sendResetEmail = (email: string) => {
        // Cuando se llama a esta función, se reinician los mensajes y el estado de error
        setMessage('');
        setIsError(false);
        // Inicia una promesa para enviar el correo de restablecimiento de contraseña
        startTransition(async () => {
            try {
                // Llama a la acción que realiza la petición para solicitar el restablecimiento de contraseña
                const res = await requestPasswordReset(email);
                // Si la respuesta es exitosa, actualiza el mensaje de éxito
                if (res) {
                    setMessage("Correo enviado con éxito");
                } else { // Si no hay respuesta, actualiza el mensaje de error
                    setMessage("No se pudo enviar el correo");
                    setIsError(true);
                }
            } catch (error: any) { // Captura cualquier error que ocurra durante la petición
                setMessage(error.message || "No se pudo enviar el correo"); // Actualiza el mensaje de error con el mensaje del error capturado
                setIsError(true); // Marca el estado como error
            }
        });
    };

    // Devuelve las funciones y estados necesarios para usar en el componente
    return { sendResetEmail, isPending, message, isError };
}