import { useEffect, useState } from "react";
import { X, Star, Heart, Gamepad2, Play, Gift } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

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
}

export default function GamePopUp({
    profileId,
    userComment,
    setModalOpen,
    addOrUpdateComment,
    initialStates = {},
    onUpdateStates = () => {},
}: GamePopUpProps) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<{ comment: string }>({
        defaultValues: { comment: userComment || "" }
    });

    // Estados para rating y otros flags
    const [rating, setRating] = useState(initialStates.rating ?? 0);
    const [hover, setHover] = useState(0);
    const [liked, setLiked] = useState(initialStates.liked ?? false);
    const [played, setPlayed] = useState(initialStates.played ?? false);
    const [playing, setPlaying] = useState(initialStates.playing ?? false);
    const [wishlist, setWishlist] = useState(initialStates.wishlist ?? false);
    const [showClear, setShowClear] = useState(false);

    useEffect(() => {
        setValue("comment", userComment || "");
        setRating(initialStates.rating ?? 0);
        setLiked(initialStates.liked ?? false);
        setPlayed(initialStates.played ?? false);
        setPlaying(initialStates.playing ?? false);
        setWishlist(initialStates.wishlist ?? false);
    }, [userComment, setValue, initialStates]);

    const onSubmit = async (data: { comment: string }) => {
        if (!profileId) {
            toast.error("Debes iniciar sesión para comentar.");
            return;
        }
        if (!data.comment.trim()) {
            toast.error("El comentario no puede estar vacío.");
            return;
        }
        try {
            await addOrUpdateComment(profileId, data.comment.trim(), {
                rating,
                liked,
                played,
                playing,
                wishlist,
            });
            setModalOpen(false)
            onUpdateStates({ rating, liked, played, playing, wishlist });
            toast.success("Comentario guardado con éxito.", {
                duration: 1500,
            });
        } catch {
            toast.error("Error al guardar el comentario.", {
                duration: 1500,
            });
        }
    };

    if (!setModalOpen) return null;

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-white font-bold">
                            {userComment ? "Editar tu comentario" : "Nuevo comentario"}
                        </h2>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6 text-[#d9d9d9]" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Valoración */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-white font-semibold mr-2">Valoración:</span>
                            <div
                                onMouseEnter={() => setShowClear(true)}
                                onMouseLeave={() => setShowClear(false)}
                                className="flex items-center gap-1"
                            >
                                <button
                                    type="button"
                                    style={{ visibility: showClear ? "visible" : "hidden" }}
                                    tabIndex={showClear ? 0 : -1}
                                    onClick={() => setRating(0)}
                                    title="Quitar valoración"
                                >
                                    <X className="w-5 h-5 text-[#e63946] transition-transform duration-150" />
                                </button>
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
                                                if (newRating > 0) setPlayed(true); // <-- Marca "Jugado" automáticamente
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
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${played ? "bg-[#06d6a0] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setPlayed(v => !v)}
                            >
                                <Gamepad2 className="w-5 h-5" />
                                Jugado
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${playing ? "bg-[#118ab2] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setPlaying(v => !v)}
                            >
                                <Play className="w-5 h-5" />
                                Jugando
                            </button>
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm ${wishlist ? "bg-[#8338ec] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                                onClick={() => setWishlist(v => !v)}
                            >
                                <Gift className="w-5 h-5" />
                                Wishlist
                            </button>
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
                            {...register("comment", { required: "El comentario no puede estar vacío" })}
                        />
                        {errors.comment && (
                            <span className="text-red-800 text-xs font-semibold mt-2 block">
                                {errors.comment.message}
                            </span>
                        )}
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="py-2 px-4 w-full text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                                disabled={isSubmitting}
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}