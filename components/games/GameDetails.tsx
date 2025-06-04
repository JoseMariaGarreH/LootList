import { useComments } from "@/hooks/useComments";
import useGames from "@/hooks/useGames";
import { useGlobalProfileGames } from "@/hooks/useGlobalProfileGames";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useUpdateProfileGame } from "@/hooks/useUpdateProfileGame";
import { Comment, Games, ProfileGame } from "@/src/types";
import {
    ArrowLeftCircle,
    Calendar,
    Gamepad,
    Gamepad2,
    Gift,
    Heart,
    Play,
    Star,
    ThumbsUp,
    Users,
    X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import GamePopUp from "./GamePopUp";
import { CommentGame } from "./CommentGame";
import AjaxLoader from "../ui/AjaxLoader";
import { useProfileById } from "@/hooks/useProfileById";
import updateProfileGame from "@/src/actions/post-updateProfileGame-action";
import { updateComment } from "@/src/actions/put-comments-action";

export default function GameDetails({ id }: { id: string }) {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { profile } = useProfileById(userId);

    const { games = [], loading } = useGames();
    const { profileGames = [], refetch } = useProfileGame(userId);
    const { globalProfileGames } = useGlobalProfileGames(id);
    const { comments, loading: loadingComments, addOrUpdateComment, userComment } = useComments(id, userId);

    const { setRating, setPlayed, setPlaying, setWishlist, setLike } =
        useUpdateProfileGame(userId);

    const game: Games | undefined = games.find((g) => g.id.toString() === id);
    const profileGame: ProfileGame | undefined = profileGames.find(
        (pg) => pg.gameId.toString() === id
    );

    const [rating, setRatingState] = useState(0);
    const [hover, setHover] = useState(0);
    const [played, setPlayedState] = useState(false);
    const [playing, setPlayingState] = useState(false);
    const [wishlist, setWishlistState] = useState(false);
    const [liked, setLikedState] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showClear, setShowClear] = useState(false);

    const handleUpdateStates = (states: { rating: number; liked: boolean; played: boolean; playing: boolean; wishlist: boolean; }) => {
        setRatingState(states.rating);
        setPlayedState(states.played);
        setPlayingState(states.playing);
        setWishlistState(states.wishlist);
        setLikedState(states.liked);
    };

    useEffect(() => {
        if (profileGame) {
            setRatingState(profileGame.rating || 0);
            setPlayedState(!!profileGame.played);
            setPlayingState(!!profileGame.playing);
            setWishlistState(!!profileGame.wishlist);
            setLikedState(!!profileGame.liked);
        } else {
            setRatingState(0);
            setPlayedState(false);
            setPlayingState(false);
            setWishlistState(false);
            setLikedState(false);
        }
    }, [profileGame, id]);

    // Calculando estadísticas globales usando globalProfileGames
    const totalLikes = globalProfileGames.filter((pg) => pg.liked).length;
    const ratings = globalProfileGames
        .map((pg) => pg.rating)
        .filter((r): r is number => typeof r === "number" && !isNaN(r));
    const avgRating =
        ratings.length > 0
            ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2)
            : "N/A";
    const totalPlayed = globalProfileGames.filter((pg) => pg.played).length;

    if (loading) {
        return <AjaxLoader />
    }

    if (!game) {
        return <p className="text-center text-[#f1faee]">Juego no encontrado.</p>;
    }

    const handleSetRating = async (newRating: number) => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para valorar un juego.");
            return;
        }
        setRatingState(newRating);
        await setRating(game.id, newRating);

        // Marca como jugado automáticamente si la valoración es mayor que 0
        if (newRating > 0 && !played) {
            setPlayedState(true);
            await setPlayed(game.id, true);
        }
    };

    const handleTogglePlayed = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para marcar como jugado.");
            return;
        }
        const newValue = !played;
        setPlayedState(newValue);
        await setPlayed(game.id, newValue);
    };

    const handleTogglePlaying = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para marcar como jugando.");
            return;
        }
        const newValue = !playing;
        setPlayingState(newValue);
        await setPlaying(game.id, newValue);
    };

    const handleToggleWishlist = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para añadir a la lista de deseos.");
            return;
        }
        const newValue = !wishlist;
        setWishlistState(newValue);
        await setWishlist(game.id, newValue);
    };

    const handleToggleLike = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para dar me gusta a un juego.");
            return;
        }
        const newValue = !liked;
        setLikedState(newValue);
        await setLike(game.id, newValue);
    };

    // Nueva función para guardar comentario y estados
    const handleAddOrUpdateComment = async (
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
            // Busca si ya existe un comentario del usuario
            if (userComment) {
                await updateComment(userComment.id, content);
            } else {
                await addOrUpdateComment(profileId, content);
            }
            // Actualiza los estados del juego
            await updateProfileGame(profileId, Number(id), {
                rating: states.rating,
                liked: states.liked,
                played: states.played,
                playing: states.playing,
                wishlist: states.wishlist,
            });
        } catch {
            toast.error("Error al guardar el comentario o los estados.");
        }
    };

    const userStatusButtons = [
        {
            active: played,
            onClick: handleTogglePlayed,
            icon: <Gamepad2 className="w-5 h-5" />,
            label: "Jugado",
            color: "#06d6a0",
        },
        {
            active: playing,
            onClick: handleTogglePlaying,
            icon: <Play className="w-5 h-5" />,
            label: "Jugando",
            color: "#118ab2",
        },
        {
            active: wishlist,
            onClick: handleToggleWishlist,
            icon: <Gift className="w-5 h-5" />,
            label: "Wishlist",
            color: "#8338ec",
        },
        {
            active: liked,
            onClick: handleToggleLike,
            icon: <Heart className="w-5 h-5" />,
            label: "Me gusta",
            color: "#ef476f",
        },
    ];

    const handleOpenModal = async () => {
        if (typeof refetch === "function") {
            await refetch(); // Recarga los datos del juego de perfil
        }
        // Busca el juego actualizado
        const updatedProfileGame = profileGames.find(pg => pg.gameId.toString() === id);
        setRatingState(updatedProfileGame?.rating || 0);
        setPlayedState(!!updatedProfileGame?.played);
        setPlayingState(!!updatedProfileGame?.playing);
        setWishlistState(!!updatedProfileGame?.wishlist);
        setLikedState(!!updatedProfileGame?.liked);
        setModalOpen(true);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />

            {/* Botón Volver */}
            <button
                onClick={() => window.history.back()}
                className="fixed top-6 left-6 z-10 flex items-center gap-2 bg-[#1d3557] text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-[#264470] transition-all"
            >
                <ArrowLeftCircle className="w-5 h-5" />
                Volver
            </button>

            {/* Card principal del juego */}
            <div className="bg-gradient-to-br from-[#1d3557] to-[#264470] rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-[#a8dadc]/20 max-w-6xl mx-auto mt-20">
                {/* Columna izquierda */}
                <div className="flex-shrink-0 flex flex-col items-center bg-[#355f7a] p-8 md:p-10 text-white w-full md:w-[380px] gap-6">
                    <Image
                        src={game.imageUrl || ""}
                        alt={game.title}
                        width={500}
                        height={300}
                        className="rounded-2xl object-cover w-full h-[200px] md:h-[280px] border border-[#a8dadc]/10 shadow-lg"
                        priority
                    />

                    <button
                        className="mt-0.5 py-2 px-4 w-52 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                        onClick={() =>handleOpenModal()}
                    >
                        {userComment ? "Editar tu registro" : "Registrar o Reseñar"}
                    </button>

                    {/* Rating */}
                    <div className="text-center space-y-2">
                        {/* Botón para abrir el modal */}
                        <div
                            className="relative w-full flex items-center justify-center mb-2"
                            style={{ minHeight: 40 }}
                            onMouseEnter={() => setShowClear(true)}
                            onMouseLeave={() => { setShowClear(false); setHover(0); }}
                        >
                            <div
                                className="flex justify-center items-center gap-1 mx-auto relative mr-5"
                                style={{ width: "fit-content" }}
                            >
                                <button
                                    type="button"
                                    style={{ visibility: showClear ? "visible" : "hidden" }}
                                    tabIndex={showClear ? 0 : -1}
                                    onClick={() => {
                                        setRatingState(0);
                                        handleSetRating(0);
                                    }}
                                    onMouseEnter={() => setShowClear(true)}
                                    onMouseLeave={() => setShowClear(false)}
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
                                            className="relative w-8 h-8 cursor-pointer"
                                            onMouseMove={(e) => {
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                setHover(x < width / 2 ? star - 0.5 : star);
                                            }}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={(e) => {
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                const newRating = x < width / 2 ? star - 0.5 : star;
                                                handleSetRating(newRating);
                                            }}
                                        >
                                            <Star className="absolute w-8 h-8 text-white opacity-30" />
                                            {filled && (
                                                <Star className="absolute w-8 h-8 text-[#e63946]" fill="#e63946" />
                                            )}
                                            {halfFilled && (
                                                <div className="absolute w-8 h-8 overflow-hidden">
                                                    <div className="w-4 h-8 overflow-hidden">
                                                        <Star className="w-8 h-8 text-[#e63946]" fill="#e63946" />
                                                    </div>
                                                </div>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Estado del usuario */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {userStatusButtons.map(({ active, onClick, icon, label, color }, idx) => (
                            <button
                                key={idx}
                                onClick={onClick}
                                style={active ? { backgroundColor: color, color: "#fff" } : {}}
                                className={`px-4 py-2 rounded-md inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-sm 
                                    ${active ? "" : "bg-white/10 text-white hover:bg-white/20"}`}
                            >
                                {icon}
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="flex-1 p-8 md:p-10 text-[#f1faee] space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{game.title}</h1>

                    {/* Estadísticas */}
                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                            <ThumbsUp className="w-4 h-4" />
                            {totalLikes} Me gusta
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                            <Star className="w-4 h-4" />
                            Media: {avgRating}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                            <Users className="w-4 h-4" />
                            {totalPlayed === 1 ? "1 persona lo ha jugado" : `${totalPlayed} personas lo han jugado`}
                        </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-medium shadow-sm">
                            <Gamepad2 className="w-5 h-5" />
                            {game.platform || "Desconocida"}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-medium shadow-sm">
                            <Calendar className="w-5 h-5" />
                            {game.releaseDate ? new Date(game.releaseDate).getFullYear() : "Desconocido"}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-medium shadow-sm">
                            <Gamepad className="w-5 h-5" />
                            {game.genre || "Desconocido"}
                        </span>
                    </div>

                    {/* Descripción */}
                    <div>
                        <p className="text-2xl font-semibold mb-1">Descripción:</p>
                        <p className="text-white/90 leading-relaxed text-base">{game.description || "Sin descripción disponible."}</p>
                    </div>
                </div>
            </div>

            {/* Comentarios debajo de la card */}
            <div className="max-w-6xl mx-auto mt-10 bg-[#355f7a] rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2 text-white">Comentarios</h2>
                {loadingComments ? (
                    <p className="text-white/80">Cargando comentarios...</p>
                ) : comments.length === 0 ? (
                    <p className="text-white/50 italic">Sé el primero en comentar este juego.</p>
                ) : (
                    <ul className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                        {comments.map((comment: Comment, idx: number) => {
                            // Convertimos los IDs a número para evitar problemas de tipo
                            const commentProfileId = Number(comment.profileId);
                            const commentGameId = Number(comment.gameId);

                            // Buscamos el profileGame correspondiente a este comentario
                            const profileGame = globalProfileGames.find(pg =>
                                Number(pg.profileId) === commentProfileId &&
                                Number(pg.gameId) === commentGameId
                            );

                            // Obtenemos el rating, si existe
                            const rating = typeof profileGame?.rating === "number" ? profileGame.rating : 0;

                            return (
                                <CommentGame
                                    key={idx}
                                    comment={comment}
                                    rating={rating}
                                />
                            );
                        })}
                    </ul>
                )}

                {/* Modal */}
                {modalOpen && (
                    <GamePopUp
                        setModalOpen={setModalOpen}
                        addOrUpdateComment={handleAddOrUpdateComment}
                        profileId={String(profile?.id) ?? null}
                        userComment={userComment?.content ?? ""}
                        initialStates={{
                            rating: profileGames.find(pg => pg.gameId.toString() === id)?.rating ?? 0,
                            liked: profileGames.find(pg => pg.gameId.toString() === id)?.liked ?? false,
                            played: profileGames.find(pg => pg.gameId.toString() === id)?.played ?? false,
                            playing: profileGames.find(pg => pg.gameId.toString() === id)?.playing ?? false,
                            wishlist: profileGames.find(pg => pg.gameId.toString() === id)?.wishlist ?? false,
                        }}
                        onUpdateStates={handleUpdateStates}
                    />
                )}
            </div>
        </>

    );
}