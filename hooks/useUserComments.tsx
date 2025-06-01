"use client"

import { useEffect, useState } from "react";
import getUserComments from "@/src/actions/get-userComments-action"

export function useUserComments(profileId: number) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!profileId) return;
        getUserComments(profileId)
            .then(data => setComments(data))
            .finally(() => setLoading(false));
    }, [profileId]);

    return { comments, loading };
}