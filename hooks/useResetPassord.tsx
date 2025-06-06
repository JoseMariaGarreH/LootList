"use client";

// Acciones
import { resetPasswordWithToken } from "@/src/actions/post-resetPasswordWithToken-action";

// Hook personalizado para restablecer la contraseña
export function useResetPassword() {

    // Función para restablecer la contraseña utilizando un token y una nueva contraseña
    const resetPassword = async (token: string, password: string) => {
        // Actualiza la contraseña del usuario utilizando la acción resetPasswordWithToken
        const result = await resetPasswordWithToken(token, password);
        return result; // Devuelve true si la actualización fue exitosa, false en caso contrario
    };

    // Devuelve la función de restablecimiento de contraseña para usarla en el componente
    // y verificar el resultado de la actualización
    return { resetPassword };
}