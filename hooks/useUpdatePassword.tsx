import { useState } from "react";
import updatePassword from "@/src/actions/put-updatePassword-action";

export function useUpdatePassword() {
    const [loading, setLoading] = useState(false);

    const changePassword = async (userId: string, newPassword: string) => {
        setLoading(true);
        const result = await updatePassword(userId, newPassword);
        setLoading(false);
        return result;
    };

    return { changePassword, loading };
}