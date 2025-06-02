"use client"

import { useProfileGame } from "@/hooks/useProfileGame";
import { useUserComments } from "@/hooks/useUserComments";
import { Star, Heart, Gamepad2, Play, Gift } from "lucide-react";
import AjaxLoader from "../ui/AjaxLoader";
import Link from "next/link";
import Pagination from "../games/Pagination";
import { useState, useEffect } from "react";
import GamePopUp from "@/components/games/CommentPopUp";
import toast from "react-hot-toast";
import { postComment } from "@/src/actions/post-comments-action";
import { updateComment } from "@/src/actions/put-comments-action";

function StatusIcons({ liked, played, playing, wishlist }: { liked: boolean, played: boolean, playing: boolean, wishlist: boolean }) {
    return (
        <div className="flex items-center gap-3 mb-2">
            {liked && <Heart className="w-5 h-5 text-[#e63946]" aria-label="Me gusta" />}
            {played && <Gamepad2 className="w-5 h-5 text-[#06d6a0]" aria-label="Jugado" />}
            {playing && <Play className="w-5 h-5 text-[#118ab2]" aria-label="Jugando" />}
            {wishlist && <Gift className="w-5 h-5 text-[#8338ec]" aria-label="Wishlist" />}
        </div>
    );
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = rating >= star;
                const halfFilled = !filled && rating >= star - 0.5;
                return (
                    <span key={star} className="relative w-5 h-5 mr-1 inline-block">
                        <Star
                            className={`w-5 h-5 ${filled || halfFilled ? "text-[#e63946]" : "text-gray-400"}`}
                            fill={filled ? "#e63946" : "none"}
                            color={filled || halfFilled ? "#e63946" : "#9ca3af"}
                            strokeWidth={2}
                        />
                        {halfFilled && (
                            <span className="absolute left-0 top-0 w-2.5 h-5 overflow-hidden">
                                <Star
                                    className="w-5 h-5 text-[#e63946]"
                                    fill="#e63946"
                                    color="#e63946"
                                    strokeWidth={2}
                                />
                            </span>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

export default function ProfileReviews({ profileId }: { profileId: number }) {
    const { comments, loading } = useUserComments(profileId);
    const { profileGames } = useProfileGame(String(profileId));

    const [page, setPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(comments.length / pageSize);
    const displayedComments = comments.slice((page - 1) * pageSize, page * pageSize);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingComment, setEditingComment] = useState<any>(null);

    // Función para editar comentario
    const handleEditComment = (comment: any) => {
        setEditingComment(comment);
        setModalOpen(true);
    };

    // Función para guardar cambios
    const addOrUpdateComment = async (profileId: string, content: string) => {
        try {
            if (editingComment) {
                await updateComment(editingComment.id, content);
                toast.success("Comentario actualizado.");
            } else {
                await postComment(profileId, editingComment.gameId, content);
                toast.success("Comentario añadido.");
            }
            setModalOpen(false);
            setEditingComment(null);
            window.location.reload();
        } catch {
            toast.error("Error al guardar el comentario.");
        }
    };

    if (loading) return <AjaxLoader />;
    if (!comments.length) return <p className="text-center text-white">No has escrito ninguna reseña</p>;

    return (
        <>
            <div className="w-full mt-8 mb-8 space-y-10 max-w-4xl mx-auto">
                {displayedComments.map((comment: any) => {
                    const profileGame = profileGames.find(pg => pg.gameId === comment.gameId);
                    const rating = profileGame?.rating ?? 0;
                    const liked = profileGame?.liked ?? false;
                    const played = profileGame?.played ?? false;
                    const playing = profileGame?.playing ?? false;
                    const wishlist = profileGame?.wishlist ?? false;

                    return (

                        <div
                            key={comment.id}
                            className="flex flex-col bg-[#1d3557] sm:flex-row w-full gap-6 border-b border-white/10 p-4 rounded-lg shadow-lg"
                        >
                            {/* Imagen del juego como enlace */}
                            <Link href={`/games/${comment.game.id}`} className="block">
                                <img
                                    src={comment.game.imageUrl}
                                    alt={comment.game.title}
                                    className="w-32 h-44 object-cover rounded-lg shadow-md border border-white/20 hover:scale-105 transition-transform"
                                />
                            </Link>

                            {/* Contenido */}
                            <div className="flex flex-col justify-between flex-1 text-white">
                                <div>
                                    {/* Título y año como enlace */}
                                    <div className="flex flex-col sm:flex-row sm:items-center mb-1">
                                        <Link href={`/games/${comment.game.id}`} className="hover:text-[#e63946] transition-colors">
                                            <h3 className="text-2xl font-bold">{comment.game.title}</h3>
                                        </Link>
                                        <span className="text-sm text-black ml-3 mt-1.5">
                                            {comment.game.releaseDate ? new Date(comment.game.releaseDate).getFullYear() : ""}
                                        </span>
                                    </div>

                                    <StatusIcons liked={liked} played={played} playing={playing} wishlist={wishlist} />
                                    <p className="text-white/90 mt-2">{comment.content}</p>
                                </div>

                                {/* Rating y acciones */}
                                <div className="flex items-center justify-start gap-6 mt-4 text-sm text-white/80">
                                    <RatingStars rating={rating} />
                                    <button
                                        className="ml-4 px-3 py-1 rounded bg-[#e63946] hover:bg-[#a62633] text-white"
                                        onClick={() => handleEditComment(comment)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>

                        </div>
                    );
                })}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
                {/* Modal para editar comentario */}

            </div>
            {modalOpen && editingComment && (
                <GamePopUp
                    setModalOpen={setModalOpen}
                    addOrUpdateComment={addOrUpdateComment}
                    profileId={String(profileId)}
                    userComment={editingComment.content}
                />
            )}
        </>
    );
}
