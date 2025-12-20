"use client"

// Componentes
import AjaxLoader from "../ui/AjaxLoader";
import Pagination from "../games/Pagination";
import GamePopUp from "@/components/games/GamePopUp";
// Hooks
import { useEffect, useState } from "react";
import { useUserComments } from "@/hooks/useUserComments";
import { useComments } from "@/hooks/useComments";
import { useProfileGame } from "@/hooks/useProfileGame";
// Tipos 
import { Comment } from "@/src/types";
// Iconos
import { Star, Heart, Gamepad2, Play, Gift, NotebookPen } from "lucide-react";
// Next.js
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateProfileGame } from "@/hooks/useUpdateProfileGame";

// Función que se utiliza en el componente para mostrar los iconos de estado del juego
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

// Componente que muestra las estrellas de valoración
function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center">
            {/* Estrellas de valoración */}
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

export default function ProfileReviews({ profileId, userId }: { profileId: string, userId: string }) {
    // Hooks personalizados para obtener los comentarios del usuario y los juegos del perfil
    const { comments: initialComments, loading } = useUserComments(Number(profileId));
    const { profileGames } = useProfileGame(userId);
    const { changeProfileGame } = useUpdateProfileGame();
    
    // No hook needed, use updateProfileGame directly

    // Estados locales para manejar los comentarios, la paginación y el modal de edición
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // Efecto para actualizar los comentarios cuando cambian los comentarios iniciales
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    // Calcula la cantidad total de páginas y los comentarios a mostrar en la página actual
    const totalPages = Math.ceil(comments.length / pageSize);
    const displayedComments = comments
        .filter(comment => comment.content && comment.content.trim() !== "") // Solo comentarios con texto
        .slice((page - 1) * pageSize, page * pageSize);

    // Estados para manejar la apertura de la ventana emergente y el comentario que se está editando
    const [modalOpen, setModalOpen] = useState(false);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);

    // Hook para añadir o actualizar un comentario, pasando el ID del juego si está disponible
    const { addOrUpdateComment: addOrUpdateGameComment } = useComments(
        editingComment?.gameId ? String(editingComment.gameId) : "",
        String(profileId)
    );

    // Función para manejar la edición de un comentario
    const handleEditComment = (comment: Comment) => {
        setEditingComment(comment);
        setModalOpen(true);
    };

    // Función para añadir o actualizar un comentario
    const addOrUpdateComment = async (
        profileId: string,
        content: string,
        states: {
            rating: number;
            liked: boolean;
            played: boolean;
            playing: boolean;
            wishlist: boolean;
        }
    ) => {
        try {
            if (editingComment) {
                // Actualiza el comentario
                await addOrUpdateGameComment(profileId, content);

                // Actualiza todos los estados juntos usando la función del hook
                await changeProfileGame(profileId, editingComment.gameId, {
                    rating: states.rating,
                    liked: states.liked,
                    played: states.played,
                    playing: states.playing,
                    wishlist: states.wishlist,
                });
            } else {
                toast.error("No se puede añadir comentario sin juego asociado.");
                return;
            }
            setModalOpen(false);
            setEditingComment(null);
        } catch {
            toast.error("Error al guardar el comentario o los estados.");
        }
    };

    // Si los comentarios están cargando, muestra un loader
    if (loading) return <AjaxLoader />;
    // Si no hay comentarios, muestra un mensaje indicando que no se han escrito reseñas
    if (
        !comments.length ||
        comments.every(comment => !comment.content || comment.content.trim() === "")
    ) {
        return (
            <div className="w-full mt-8 mb-8 max-w-4xl mx-auto px-2">
                <p className="text-center text-white">No has escrito ninguna reseña</p>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            
            <div className="w-full mt-8 mb-8 space-y-10 max-w-4xl mx-auto px-2">
                {displayedComments.map((comment: Comment) => {
                    const profileGame = profileGames.find(pg => pg.gameId === comment.gameId);
                    const rating = profileGame?.rating ?? 0;
                    const liked = profileGame?.liked ?? false;
                    const played = profileGame?.played ?? false;
                    const playing = profileGame?.playing ?? false;
                    const wishlist = profileGame?.wishlist ?? false;

                    const gameTitle = comment.game?.title || "Juego";
                    const gameHref = `/games/${comment.game?.id}`;
                    const gameYear = comment.game?.releaseDate ? new Date(comment.game.releaseDate).getFullYear() : null;
                    const gameImageSrc = comment.game?.imageUrl || "/assets/logo.svg";

                    return (
                        <article
                            key={comment.id}
                            className="group bg-[#1d3557] border border-white/10 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="p-4 sm:p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <Link
                                            href={gameHref}
                                            className="block text-white hover:text-[#e63946] transition-colors duration-200"
                                        >
                                            <h3 className="text-lg sm:text-2xl font-semibold leading-snug truncate">
                                                {gameTitle}
                                            </h3>
                                        </Link>
                                        {gameYear && (
                                            <div className="mt-1 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-[#a8dadc]">
                                                {gameYear}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="shrink-0 px-3 py-2 rounded-md bg-[#e63946] hover:bg-[#d62839] text-white text-sm font-medium shadow-sm transition"
                                        onClick={() => handleEditComment(comment)}
                                        type="button"
                                    >
                                        <span className="flex items-center gap-2">
                                            <NotebookPen size={16} />
                                            Editar
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={gameHref}
                                        className="relative shrink-0 w-full sm:w-28 h-44 sm:h-40 rounded-xl overflow-hidden border border-white/20 bg-black/20"
                                        aria-label={`Ver detalles de ${gameTitle}`}
                                    >
                                        <Image
                                            src={gameImageSrc}
                                            alt={gameTitle}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 112px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </Link>

                                    <div className="flex-1 min-w-0 text-white">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center justify-between sm:justify-start gap-3">
                                                <StatusIcons liked={liked} played={played} playing={playing} wishlist={wishlist} />
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-white/80">
                                                <span className="whitespace-nowrap">Tu valoración</span>
                                                <RatingStars rating={rating} />
                                            </div>
                                        </div>

                                        <div className="mt-3 border-t border-white/10 pt-3">
                                            <p className="text-white/90 text-base leading-relaxed break-words">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
                {/* Componente de paginación */}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>

            {/* Componente de ventana emergente para editar comentarios */}
            {modalOpen && editingComment && (
                <GamePopUp
                    setModalOpen={setModalOpen}
                    addOrUpdateComment={addOrUpdateComment}
                    profileId={String(profileId)}
                    userComment={editingComment.content}
                    initialStates={{
                        rating: profileGames.find(pg => pg.gameId === editingComment.gameId)?.rating ?? 0,
                        liked: profileGames.find(pg => pg.gameId === editingComment.gameId)?.liked ?? false,
                        played: profileGames.find(pg => pg.gameId === editingComment.gameId)?.played ?? false,
                        playing: profileGames.find(pg => pg.gameId === editingComment.gameId)?.playing ?? false,
                        wishlist: profileGames.find(pg => pg.gameId === editingComment.gameId)?.wishlist ?? false,
                    }}
                    gameImageUrl={editingComment.game?.imageUrl || ""}
                    commentId={editingComment.id}
                />
            )}
        </>
    );
}
