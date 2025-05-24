"use client"

import updatePassword from "@/src/actions/put-updatePassword-action";

export function useUpdatePassword() : {
    changePassword: (userId: string, newPassword: string) => Promise<boolean>;
} {
    const changePassword = async (userId: string, newPassword: string) => {
        const result = await updatePassword(userId, newPassword);
        return result;
    };

    return { changePassword };
}