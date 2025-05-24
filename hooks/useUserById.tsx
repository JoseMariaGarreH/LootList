import { useEffect, useState } from "react";
import getUserById from "@/src/actions/get-usersById-action";
import { User } from "@/src/types";

export function useUserById(userId: string) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) {
            setUser({} as User);
            setLoading(false);
            return;
        }
        setLoading(true);
        getUserById(userId)
            .then(data => setUser(data.user))
            .catch(() => setUser({} as User))
            .finally(() => setLoading(false));
    }, [userId]);

    return { user, loading };
}