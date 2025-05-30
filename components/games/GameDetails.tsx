import useGames from "@/hooks/useGames";
import { useGlobalProfileGames } from "@/hooks/useGlobalProfileGames";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useUpdateProfileGame } from "@/hooks/useUpdateProfileGame";
import { Games, ProfileGame } from "@/src/types";
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
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GameDetails({ id }: { id: string }) {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";

    const { games } = useGames();
    const { profileGames } = useProfileGame(userId);
    const { globalProfileGames } = useGlobalProfileGames(id);

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

    // Calcula estadísticas globales usando globalProfileGames
    const totalLikes = globalProfileGames.filter((pg) => pg.liked).length;
    const ratings = globalProfileGames
        .map((pg) => pg.rating)
        .filter((r): r is number => typeof r === "number" && !isNaN(r));
    const avgRating =
        ratings.length > 0
            ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2)
            : "N/A";
    const totalPlayed = globalProfileGames.filter((pg) => pg.played).length;

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

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div>
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-4 left-4 flex items-center bg-[#1d3557] text-white text-sm px-2 py-3 rounded-xl shadow-md hover:bg-[#264470] transition-all duration-200"
                >
                    <ArrowLeftCircle className="inline-block mr-2 w-5 h-5" />
                    Volver
                </button>
            </div>
            <div className="bg-gradient-to-br from-[#1d3557] to-[#264470] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#a8dadc]/20 max-w-6xl mx-auto">

                <div className="flex-shrink-0 flex flex-col items-center bg-[#355f7a] p-6 md:p-10 text-white w-full md:w-[380px] gap-6">
                    <Image
                        src={game.imageUrl || ""}
                        alt={game.title}
                        width={500}
                        height={300}
                        className="rounded-xl object-cover w-full h-[200px] md:h-[280px] border border-[#a8dadc]/10 shadow-lg"
                        priority
                    />

                    {/* Rating */}
                    <div className="text-center space-y-2">
                        <p className="text-xl font-bold">Calificación: {hover || rating}</p>
                        <div className="flex justify-center gap-1">
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
                                            setRatingState(newRating);
                                            handleSetRating(newRating);
                                        }}
                                    >
                                        <Star className="absolute w-8 h-8 text-white opacity-40" />
                                        {filled && (
                                            <Star
                                                className="absolute w-8 h-8 text-yellow-400"
                                                fill="#facc15"
                                            />
                                        )}
                                        {halfFilled && (
                                            <div className="absolute w-8 h-8 overflow-hidden">
                                                <div className="w-4 h-8 overflow-hidden">
                                                    <Star className="w-8 h-8 text-yellow-400" fill="#facc15" />
                                                </div>
                                            </div>
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Estado del usuario */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {userStatusButtons.map(({ active, onClick, icon, label, color }, idx) => (
                            <button
                                key={idx}
                                onClick={onClick}
                                style={active ? { backgroundColor: color, color: "#fff" } : {}}
                                className={`px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 shadow-sm ${active
                                        ? ""
                                        : "bg-white/10 text-white hover:bg-white/20"
                                    }`}
                            >
                                {icon}
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Derecha: Info del juego */}
                <div className="flex-1 p-6 md:p-10 text-[#f1faee] space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold">{game.title}</h1>

                    {/* Estadísticas globales */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <ThumbsUp className="w-4 h-4" />
                            {totalLikes} Me gusta
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <Star className="w-4 h-4" />
                            Media: {avgRating}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <Users className="w-4 h-4" />
                            {totalPlayed === 1 ? "1 persona lo ha jugado" : `${totalPlayed} personas lo han jugado`}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <Gamepad2 className="w-5 h-5" />
                            {game.platform || "Desconocida"}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <Calendar className="w-5 h-5" />
                            {game.releaseDate
                                ? new Date(game.releaseDate).getFullYear()
                                : "Desconocido"}
                        </span>
                        <span className="flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            <Gamepad className="w-5 h-5" />
                            {game.genre || "Desconocido"}
                        </span>
                    </div>

                    <div>
                        <p className="text-lg font-semibold mb-2">Descripción:</p>
                        <p className="text-[#f1faee]/90 leading-relaxed text-base">
                            {game.description || "Sin descripción disponible."}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}