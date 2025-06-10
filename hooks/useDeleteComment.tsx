"use client";

import { useState } from "react";
import { deleteComment } from "@/src/actions/delete-comment-action";

export function useDeleteComment() {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (commentId: number) => {
        setLoading(true);
        try {
            await deleteComment(commentId);
        } finally {
            setLoading(false);
        }
    };

    return { deleteComment: handleDelete, loading };
}