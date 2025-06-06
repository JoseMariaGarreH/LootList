"use client"

// Hooks
import updateProfile from "@/src/actions/put-updateProfile-action";

// Hook personalizado para actualizar el perfil de un usuario
export function useUpdateProfile() : {
    changeProfile: (
        userId: string,
        profileData: {
            name: string;
            firstSurname: string;
            secondSurname: string;
            bio: string;
            location: string;
            pronoun: string;
            username: string;
            email: string;
        }
    ) => Promise<boolean>;
}  {
    // Función para cambiar el perfil de un usuario
    const changeProfile = async (
        userId: string,
        profileData: {
            name: string;
            firstSurname: string;
            secondSurname: string;
            bio: string;
            location: string;
            pronoun: string;
            username: string;
            email: string;
        }
    ) => {
        // Actualiza el perfil del usuario utilizando la acción updateProfile
        const result = await updateProfile(userId, profileData); 
        return result; // Devuelve true si la actualización fue exitosa, false en caso contrario
    };
    // Devuelve la función changeProfile para usarla en el componente, y verificar el resultado de la actualización
    return { changeProfile };
}