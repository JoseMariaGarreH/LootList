"use client"

// Componentes
import AjaxLoader from "../ui/AjaxLoader";
import { CommentGame } from "./CommentGame";
import GamePopUp from "./GamePopUp";
// Hooks
import { useComments } from "@/hooks/useComments";
import useGames from "@/hooks/useGames";
import { useGlobalProfileGames } from "@/hooks/useGlobalProfileGames";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useProfileById } from "@/hooks/useProfileById";
import updateProfileGame from "@/src/actions/post-updateProfileGame-action";
// Tipos
import { Comment, Games, ProfileGame } from "@/src/types";
// Iconos
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
// Librerías
import toast, { Toaster } from "react-hot-toast";
// Next.js
import Image from "next/image";


// Componente principal que muestra los detalles de un juego
export default function GameDetails({ id }: { id: string }) {
    // Obtiene la sesión del usuario
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    // Obtiene el perfil del usuario
    const { profile } = useProfileById(userId);

    // Obtiene la lista de juegos y el estado de carga
    const { games = [], loading } = useGames();
    // Obtiene los juegos del perfil y función para refrescar los datos 
    const { profileGames = [], refetch } = useProfileGame(userId);
    // Obtiene los datos globales de los juegos de todos los perfiles registrados
    const { globalProfileGames } = useGlobalProfileGames(id);
    // Obtiene los comentarios, función para añadir/actualizar y el comentario del usuario
    const { comments, loading: loadingComments, addOrUpdateComment, userComment } = useComments(id, String(profile?.id || ""));

    // Busca el juego actual y el estado del juego en el perfil del usuario
    const game: Games | undefined = games.find((g) => g.id.toString() === id);
    const profileGame: ProfileGame | undefined = profileGames.find(
        (pg) => pg.gameId.toString() === id
    );

    // Estados locales para rating y flags de usuario
    const [rating, setRatingState] = useState(0);
    const [hover, setHover] = useState(0);
    const [played, setPlayedState] = useState(false);
    const [playing, setPlayingState] = useState(false);
    const [wishlist, setWishlistState] = useState(false);
    const [liked, setLikedState] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showClear, setShowClear] = useState(false);

    // Función para actualizar los estados locales desde el popup
    const handleUpdateStates = (states: { rating: number; liked: boolean; played: boolean; playing: boolean; wishlist: boolean; }) => {
        setRatingState(states.rating);
        setPlayedState(states.played);
        setPlayingState(states.playing);
        setWishlistState(states.wishlist);
        setLikedState(states.liked);
    };

    // Sincroniza los estados locales con el estado del juego en el perfil
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

    // Calcula estadísticas globales del juego
    const totalLikes = globalProfileGames.filter((pg) => pg.liked).length;
    const ratings = globalProfileGames
        .map((pg) => pg.rating)
        .filter((r): r is number => typeof r === "number" && !isNaN(r));
    const avgRating =
        ratings.length > 0
            ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2)
            : "N/A";
    const totalPlayed = globalProfileGames.filter((pg) => pg.played).length;
    const totalPlaying = globalProfileGames.filter((pg) => pg.playing).length;
    const totalWishlist = globalProfileGames.filter((pg) => pg.wishlist).length;

    // Muestra loader si los datos están cargando
    if (loading) {
        return <AjaxLoader />
    }

    // Si no se encuentra el juego, muestra mensaje
    if (!game) {
        return <p className="text-center text-[#f1faee]">Juego no encontrado.</p>;
    }

    // Función para actualizar todos los estados del juego en el perfil
    const updateAllStates = async (states: Partial<{ rating: number; liked: boolean; played: boolean; playing: boolean; wishlist: boolean; }>) => {
        if (!profile?.id) return;
        await updateProfileGame(String(profile.id), Number(id), {
            rating,
            liked,
            played,
            playing,
            wishlist,
            ...states,
        });
        await refetch();
    };

    // Función para actualizar la valoración del juego
    const handleSetRating = async (newRating: number) => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para valorar un juego.");
            return;
        }
        setRatingState(newRating);
        await updateAllStates({ rating: newRating });

        // Marca como jugado automáticamente si la valoración es mayor que 0
        if (newRating > 0 && !played) {
            setPlayedState(true);
            await updateAllStates({ rating: newRating, played: true });
        }
    };

    // Funciones para alternar los estados de jugado, jugando, wishlist y like
    const handleTogglePlayed = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para marcar como jugado.");
            return;
        }
        const newValue = !played;
        setPlayedState(newValue);
        await updateAllStates({ played: newValue });
    };

    const handleTogglePlaying = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para marcar como jugando.");
            return;
        }
        const newValue = !playing;
        setPlayingState(newValue);
        await updateAllStates({ playing: newValue });
    };

    const handleToggleWishlist = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para añadir a la lista de deseos.");
            return;
        }
        const newValue = !wishlist;
        setWishlistState(newValue);
        await updateAllStates({ wishlist: newValue });
    };

    const handleToggleLike = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para dar me gusta a un juego.");
            return;
        }
        const newValue = !liked;
        setLikedState(newValue);
        await updateAllStates({ liked: newValue });
    };

    // Función para guardar comentario y estados desde el popup
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
            // Solo usa el hook, él decide si crea o actualiza
            await addOrUpdateComment(profileId, content);

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

    // Botones de estado del usuario
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

    // Función para abrir el popup de reseña
    const handleOpenModal = async () => {
        if (!session?.user?.id) {
            toast.error("Debes iniciar sesión para registrar o reseñar.");
            return;
        }
        setModalOpen(true);
        await refetch(); // Refresca los datos del perfil del usuario
    };

    // Renderizado del componente
    return (
        <>
            {/* Notificaciones */}
            <Toaster position="top-right" reverseOrder={false} />

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
                {/* Columna izquierda: imagen y acciones */}
                <div className="flex-shrink-0 flex flex-col items-center bg-[#355f7a] p-8 md:p-10 text-white w-full md:w-[380px] gap-6">
                    <Image
                        src={game.imageUrl || ""}
                        alt={game.title}
                        width={500}
                        height={300}
                        className="rounded-2xl object-cover w-full h-[200px] md:h-[280px] border border-[#a8dadc]/10 shadow-lg"
                        priority
                    />

                    {/* Botón para abrir el popup de reseña */}
                    <button
                        className="mt-0.5 py-2 px-4 w-52 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                        onClick={() => handleOpenModal()}
                    >
                        {userComment ? "Editar tu registro" : "Registrar o Reseñar"}
                    </button>

                    {/* Rating */}
                    <div className="text-center space-y-2">
                        {/* Estrellas de valoración */}
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
                                {/* Botón para quitar valoración */}
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
                                {/* Mapeo de estrellas */}
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

                {/* Columna derecha: información y estadísticas */}
                <div className="flex-1 p-8 md:p-10 text-[#f1faee] space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{game.title}</h1>

                    {/* Estadísticas globales de la gente */}
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
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                            <Play className="w-4 h-4" />
                            {totalPlaying === 1 ? "1 persona está jugando" : `${totalPlaying} personas están jugando`}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-md text-sm font-semibold shadow">
                            <Gift className="w-4 h-4" />
                            {totalWishlist === 1 ? "1 persona lo tiene en su lista de deseos" : `${totalWishlist} personas lo tienen en su lista de deseos`}
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
                ) : comments.length === 0 || comments.every(comment => !comment.content || comment.content.trim() === "") ? (
                    <p className="text-white/80">No hay comentarios para este juego.</p>
                ) : (
                    <ul className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                        {/* Mapeamos los comentarios, para mostrar los comentarios mas recientes y luego cargamos el componente commentGame */}
                        {comments
                            .filter(comment => comment.content && comment.content.trim() !== "")
                            .slice()
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((comment: Comment, idx: number) => {
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
                                        liked={profileGame?.liked ?? false}
                                    />
                                );
                            })}
                    </ul>
                )}

                {/* Modal para registrar o editar reseña */}
                {modalOpen && (
                    <GamePopUp
                        setModalOpen={setModalOpen}
                        addOrUpdateComment={handleAddOrUpdateComment}
                        profileId={String(profile?.id) ?? null}
                        userComment={userComment?.content ?? ""}
                        initialStates={{
                            rating,
                            liked,
                            played,
                            playing,
                            wishlist,
                        }}
                        onUpdateStates={handleUpdateStates}
                        gameImageUrl={game.imageUrl}
                        commentId={userComment?.id}
                    />
                )}
            </div>
        </>
    );
}