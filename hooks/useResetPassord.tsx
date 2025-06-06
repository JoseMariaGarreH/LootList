import { useState } from "react";
import { resetPasswordWithToken } from "@/src/actions/post-resetPasswordWithToken-action";

export function useResetPassword() {

    const resetPassword = async (token: string, password: string) => {
        const result = await resetPasswordWithToken(token, password);
        return result;
    };

    return { resetPassword };
}