"use client"

// Hooks
import { useState } from "react";
// Acciones
import putAvatarAction from "@/src/actions/put-avatar-action";
// Librerías
import toast from "react-hot-toast";

// Hook personalizado para manejar la lógica de actualización y borrado de avatar de usuario
export function useAvatar(userId: string) {
    // Estado para indicar si se está realizando una operación de carga
    const [loading, setLoading] = useState(false);

    // Función para actualizar el avatar del usuario
    const updateAvatar = async (image: File | string) => {
        setLoading(true); // Indica que la operación está en curso
        try {
            // Prepara los datos a enviar al action para actualizar el avatar
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("image", image);

            // Llama a la acción que realiza la petición
            const url = await putAvatarAction(formData);
            if (url) {
                return url; // Devuelve la URL del nuevo avatar
            }
        } catch {
            toast.error("Error al actualizar el avatar"); // Notifica error
            return null;
        } finally {
            setLoading(false); // Finaliza la operación de carga
        }
    };

    // Función para borrar el avatar, usando la URL por defecto
    const deleteAvatar = async (defaultUrl: string) => {
        return updateAvatar(defaultUrl);
    };

    // Devuelve las funciones y el estado de carga para usar en el componente
    return { updateAvatar, deleteAvatar, loading };
}