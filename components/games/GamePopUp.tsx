"use client"

// Componentes
import { useForm } from "react-hook-form";
// Hooks
import { useEffect, useState } from "react";
import { useDeleteComment } from "@/hooks/useDeleteComment";
// Iconos
import { X, Star, Heart, Gamepad2, Play, Gift, Trash2, Eraser } from "lucide-react";
// Librerías
import toast from "react-hot-toast";
// Next.js
import Image from "next/image";

// Definición de las props para el componente GamePopUp
interface GamePopUpProps {
    profileId: string | null;
    userComment: string | null;
    setModalOpen: (open: boolean) => void;
    addOrUpdateComment: (
        profileId: string,
        comment: string,
        states: {
            rating: number;
            liked: boolean;
            played: boolean;
            playing: boolean;
            wishlist: boolean;
        }
    ) => Promise<void>;
    initialStates?: {
        rating?: number;
        liked?: boolean;
        played?: boolean;
        playing?: boolean;
        wishlist?: boolean;
    };
    onUpdateStates?: (states: {
        rating: number;
        liked: boolean;
        played: boolean;
        playing: boolean;
        wishlist: boolean;
    }) => void;
    gameImageUrl: string | null;
    commentId?: number;
}

export default function GamePopUp({
    profileId,
    userComment,
    setModalOpen,
    addOrUpdateComment,
    initialStates = {},
    onUpdateStates = () => { },
    gameImageUrl,
    commentId,
}: GamePopUpProps) {
    // Hook de formulario para manejar el comentario del usuario
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<{ comment: string }>({
        defaultValues: { comment: userComment || "" }
    });

    // Estados para manejar distintas propiedades del comentario
    const [rating, setRating] = useState(initialStates.rating ?? 0);
    const [liked, setLiked] = useState(initialStates.liked ?? false);
    const [played, setPlayed] = useState(initialStates.played ?? false);
    const [playing, setPlaying] = useState(initialStates.playing ?? false);
    const [wishlist, setWishlist] = useState(initialStates.wishlist ?? false);

    // Estado para manejar las estrellas de valoración y el hover de las estrellas
    const [hover, setHover] = useState(0);
    const [showClear, setShowClear] = useState(false);

    // Hook para eliminar comentarios
    const { deleteComment, loading: deleteLoading } = useDeleteComment(commentId || 0);

    // Efecto para inicializar los valores del formulario y estados
    useEffect(() => {
        setValue("comment", userComment || "");
        setRating(initialStates.rating ?? 0);
        setLiked(initialStates.liked ?? false);
        setPlayed(initialStates.played ?? false);
        setPlaying(initialStates.playing ?? false);
        setWishlist(initialStates.wishlist ?? false);
    }, [userComment, setValue, initialStates]);

    // Función para manejar el envío del formulario
    const onSubmit = async (data: { comment: string }) => {
        if (!profileId) {
            toast.error("Debes iniciar sesión para guardar.");
            return;
        }

        // Solo borra si comentario Y TODOS los estados están vacíos
        const isAllEmpty =
            (data.comment?.trim() === "" || !data.comment) &&
            rating === 0 &&
            !liked &&
            !played &&
            !playing &&
            !wishlist;

        if (isAllEmpty && commentId) {
            await handleDelete();
            return;
        }

        try {
            // Guardamos o actualizamos el comentario del usuario
            await addOrUpdateComment(profileId, data.comment?.trim() ?? "", {
                rating,
                liked,
                played,
                playing,
                wishlist,
            });
            
            setModalOpen(false);
            onUpdateStates({ rating, liked, played, playing, wishlist });
            
            setTimeout(() => {
                if (
                    typeof profileId === "string" &&
                    profileId.trim() !== "" &&
                    profileId !== "null" &&
                    profileId !== "undefined"
                ) {
                    window.location.reload();
                }
            }, 200);
        } catch {
            toast.error("Error al guardar los datos.");
        }
    };

    // Función para manejar la eliminación del comentario
    const handleDelete = async () => {
        if (!commentId) return;
        
        try {
            // Ahora usamos la función del hook, no el hook directamente
            await deleteComment();
            toast.success("Comentario eliminado correctamente.");
            setModalOpen(false);
            setTimeout(() => window.location.reload(), 200);
        } catch {
            toast.error("Error al borrar el comentario.");
        }
    };

    // Comprobamos si hay algún dato que mostrar en el modal
    const hasAnyData =
        (userComment?.trim() !== "" && userComment !== null && userComment !== undefined) ||
        (initialStates.rating ?? 0) > 0 ||
        initialStates.liked ||
        initialStates.played ||
        initialStates.wishlist;

    // Si no se debe mostrar el modal, no mostramos nada
    if (!setModalOpen) return "";

    return (
        <>
            {/* Mostramos el toaster para notificaciones */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6 relative">
                    {/* Imagen del juego */}
                    {gameImageUrl && (
                        <div className="relative flex justify-center mb-4">
                            <Image
                                src={gameImageUrl}
                                alt="Imagen del juego"
                                width={500}
                                height={208}
                                className="w-full h-52 object-cover rounded-md shadow border border-[#a8dadc]/30"
                            />
                            {/* Botón de cerrar la pestaña modal */}
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-[#a8dadc]/80 transition"
                                aria-label="Cerrar"
                            >
                                <X className="w-6 h-6 text-[#f1faee]" />
                            </button>
                        </div>
                    )}

                    {/* Cabecera con título y botón de cerrar */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-white font-bold">
                            {(userComment && userComment.trim() !== "") ||
                                (initialStates.rating ?? 0) > 0 ||
                                initialStates.liked ||
                                initialStates.played ||
                                initialStates.wishlist
                                ? "Editar tu comentario"
                                : "Nuevo comentario"}
                        </h2>
                        {/* Botón limpiar campos */}
                        <button
                            type="button"
                            title="Limpiar campos"
                            className="ml-2 p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition flex items-center justify-center"
                            onClick={() => {
                                setValue("comment", "");
                                setRating(0);
                                setLiked(false);
                                setPlayed(false);
                                setPlaying(false);
                                setWishlist(false);
                            }}
                        >
                            <Eraser className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    
                    {/* Formulario para agregar o editar el comentario */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Valoración */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-white font-semibold mr-2">Valoración:</span>
                            <div
                                onMouseEnter={() => setShowClear(true)}
                                onMouseLeave={() => setShowClear(false)}
                                className="flex items-center gap-1"
                            >
                                {/* Botón que borra la valoración y la pone a cero */}
                                <button
                                    type="button"
                                    style={{ visibility: showClear ? "visible" : "hidden" }}
                                    tabIndex={showClear ? 0 : -1}
                                    onClick={() => setRating(0)}
                                    title="Quitar valoración"
                                >
                                    <X className="w-5 h-5 text-[#e63946] transition-transform duration-150" />
                                </button>
                                
                                {/* Mapeamos las estrellas para mostrar la valoración */}
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const filled = (hover || rating) >= star;
                                    const halfFilled = !filled && (hover || rating) >= star - 0.5;

                                    return (
                                        <span
                                            key={star}
                                            className="relative w-7 h-7 cursor-pointer"
                                            onMouseMove={e => {
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                setHover(x < width / 2 ? star - 0.5 : star);
                                            }}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={e => {
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                const newRating = x < width / 2 ? star - 0.5 : star;
                                                setRating(newRating);
                                                if (newRating > 0) setPlayed(true);
                                            }}
                                        >
                                            <Star className="absolute w-7 h-7 text-white opacity-30" />
                                            {filled && (
                                                <Star className="absolute w-7 h-7 text-[#e63946]" fill="#e63946" />
                                            )}
                                            {halfFilled && (
                                                <div className="absolute w-7 h-7 overflow-hidden">
                                                    <div className="w-3.5 h-7 overflow-hidden">
                                                        <Star className="w-7 h-7 text-[#e63946]" fill="#e63946" />
                                                    </div>
                                                </div>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* Estados */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {/* Estado de juego completado */}
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${played ? "bg-[#06d6a0] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setPlayed(v => !v)}
                            >
                                <Gamepad2 className="w-5 h-5" />
                                Jugado
                            </button>
                            {/* Estado de juego en progreso */}
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${playing ? "bg-[#118ab2] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setPlaying(v => !v)}
                            >
                                <Play className="w-5 h-5" />
                                Jugando
                            </button>
                            {/* Estado de juego en la lista de deseos */}
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${wishlist ? "bg-[#8338ec] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setWishlist(v => !v)}
                            >
                                <Gift className="w-5 h-5" />
                                Wishlist
                            </button>
                            {/* Estado de me gusta */}
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${liked ? "bg-[#ef476f] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setLiked(v => !v)}
                            >
                                <Heart className="w-5 h-5" />
                                Me gusta
                            </button>
                        </div>
                        
                        {/* Comentario */}
                        <textarea
                            className="w-full h-32 p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#e63946] resize-none mb-4"
                            placeholder="Escribe tu comentario..."
                            maxLength={500}
                            {...register("comment")}
                        />
                        {errors.comment && (
                            <span className="text-red-800 text-xs font-semibold mt-2 block">
                                {errors.comment.message}
                            </span>
                        )}
                        
                        {/* Botones de acción */}
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="py-2 px-4 w-full text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                                disabled={isSubmitting || deleteLoading}
                            >
                                Confirmar
                            </button>
                            {hasAnyData && (
                                <button
                                    type="button"
                                    className="py-2 px-4 w-full flex items-center justify-center gap-2 text-white rounded-md bg-gray-600 hover:bg-gray-700 transition"
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Borrar todo
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}