"use client"

import putAvatarAction from "@/src/actions/put-avatar-action";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAvatar(userId: string) {
    const [loading, setLoading] = useState(false);

    const updateAvatar = async (image: File | string) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("image", image);

            const url = await putAvatarAction(formData);
            if (url) {
                toast.success("Avatar actualizado con éxito");
                return url;
            }
        } catch {
            toast.error("Error al actualizar el avatar");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteAvatar = async (defaultUrl: string) => {
        return updateAvatar(defaultUrl);
    };

    return { updateAvatar, deleteAvatar, loading };
}