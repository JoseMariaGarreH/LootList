"use client"

// Hooks
import verifyPassword from "@/src/actions/post-verifyPassword-action";

// Hook personalizado para verificar la contraseña de un usuario
export function useVerifyPassword() : { checkPassword: (email: string, password: string) => Promise<boolean> } {

    // Función para verificar la contraseña de un usuario
    const checkPassword = async (email: string, password: string) => {
        // Verifica la contraseña del usuario utilizando la acción verifyPassword
        const result = await verifyPassword(email, password);
        return result; // Devuelve true si la contraseña es correcta, false en caso contrario
    };

    // Devuelve la función checkPassword para usarla en el componente
    return { checkPassword };
}