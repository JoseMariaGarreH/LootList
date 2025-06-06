"use client"

// Acciones
import updatePassword from "@/src/actions/put-updatePassword-action";

// Hook personalizado para actualizar la contraseña de un usuario
export function useUpdatePassword() : {
    changePassword: (userId: string, newPassword: string) => Promise<boolean>;
} {
    // Función para cambiar la contraseña de un usuario 
    const changePassword = async (userId: string, newPassword: string) => {
        // Actualiza la contraseña del usuario utilizando la acción updatePassword
        const result = await updatePassword(userId, newPassword);
        // Devuelve true si la actualización fue exitosa, false en caso contrario
        return result;
    };

    // Devuelve la función changePassword para usarla en el componente, y verificar el resultado de la actualización
    return { changePassword };
}