import { useState } from "react";
import verifyPassword from "@/src/actions/post-verifyPassword-action";

export function useVerifyPassword() {
    const [loading, setLoading] = useState(false);

    const checkPassword = async (email: string, password: string) => {
        setLoading(true);
        const result = await verifyPassword(email, password);
        setLoading(false);
        return result;
    };

    return { checkPassword, loading };
}