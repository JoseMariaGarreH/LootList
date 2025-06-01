import { useState, useEffect } from "react";
import { getComments } from "@/src/actions/get-comments-action";
import { postComment } from "@/src/actions/post-comments-action";
import { updateComment } from "@/src/actions/put-comments-action";



export function useComments(gameId: string, userId?: string) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getComments(gameId);
            const mapped = data.map((comment: any) => ({
                ...comment,
                authorName: comment.profile?.username || "Usuario",
            }));
            setComments(mapped);
        } finally {
            setLoading(false);
        }
    };

    const addOrUpdateComment = async (profileId: string, content: string) => {
        const existing = comments.find(c => c.profileId === Number(profileId));
        if (existing) {
            // Actualiza el comentario existente
            await updateComment(existing.id, content);
        } else {
            // Crea uno nuevo
            await postComment(profileId, gameId, content);
        }
        await fetchComments();
    };

    // ...existing code...
    useEffect(() => {
        if (gameId) fetchComments();
    }, [gameId]);

    const userComment = userId
        ? comments.find(c => c.profileId === Number(userId))
        : undefined;

    return { comments, loading, addOrUpdateComment, userComment };
}
