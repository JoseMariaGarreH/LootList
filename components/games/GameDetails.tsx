import useGames from "@/hooks/useGames";
import { useProfileGame } from "@/hooks/useProfileGame";
import { useUpdateProfileGame } from "@/hooks/useUpdateProfileGame";
import { Games, ProfileGame } from "@/src/types";
import { Calendar, Gamepad2, Gift, Heart, Play, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GameDetails({ id }: { id: string }) {

    const { data: session } = useSession();
    const userId = session?.user?.id || "";

    const { games } = useGames();
    const { profileGames } = useProfileGame(userId);

    const { setRating, setPlayed, setPlaying, setWishlist, setLike } = useUpdateProfileGame(userId);

    const game: Games | undefined = games.find((g) => g.id.toString() === id);
    const profileGame: ProfileGame | undefined = profileGames.find((pg) => pg.gameId.toString() === id);

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

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div className="bg-[#1d3557] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#a8dadc]/20 max-w-6xl mx-auto">

                {/* Izquierda: imagen, rating y botones */}
                <div className="flex-shrink-0 flex flex-col items-center justify-start bg-[#457b9d] p-8 md:p-10 text-white w-full md:w-[360px]">
                    <Image
                        src={game.imageUrl || ""}
                        alt={game.title}
                        width={280}
                        height={280}
                        className="rounded-xl object-cover shadow-lg border border-[#a8dadc]/10"
                        priority
                    />

                    {/* Estrellas de rating */}
                    <div className="flex items-center mt-6 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled = (hover || rating) >= star;
                            const halfFilled = !filled && (hover || rating) >= star - 0.5;

                            return (
                                <span
                                    key={star}
                                    className="relative w-8 h-8 inline-block cursor-pointer"
                                    onMouseMove={(e) => {
                                        const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                        const x = e.clientX - left;
                                        setHover(x < width / 2 ? star - 0.5 : star);
                                    }}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={(e) => {
                                        const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                        const x = e.clientX - left;
                                        const newRating = x < width / 2 ? star - 0.5 : star;
                                        setRatingState(newRating);
                                        handleSetRating(newRating);
                                    }}
                                >
                                    <Star className="absolute w-8 h-8 text-[#f1faee]" fill="none" />
                                    {filled && (
                                        <Star className="absolute w-8 h-8 text-yellow-400" fill="#facc15" />
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

                    {/* Botones de estado */}
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        <button
                            onClick={handleTogglePlayed}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm transition shadow-md ${played
                                    ? "bg-[#06d6a0] text-[#073b4c] font-semibold"
                                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                                }`}
                        >
                            <Gamepad2 className="w-5 h-5" />
                            Jugado
                        </button>

                        <button
                            onClick={handleTogglePlaying}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm transition shadow-md ${playing
                                    ? "bg-[#118ab2] text-white font-semibold"
                                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                                }`}
                        >
                            <Play className="w-5 h-5" />
                            Jugando
                        </button>

                        <button
                            onClick={handleToggleWishlist}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm transition shadow-md ${wishlist
                                    ? "bg-[#8338ec] text-white font-semibold"
                                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                                }`}
                        >
                            <Gift className="w-5 h-5" /> 
                            Lista de deseos
                        </button>

                        <button
                            onClick={handleToggleLike}
                            className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm transition shadow-md ${liked
                                    ? "bg-[#ef476f] text-white font-semibold"
                                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                                }`}
                        >
                            <Heart className="w-5 h-5" />
                            Me gusta
                        </button>
                    </div>

                </div>

                {/* Derecha: Información */}
                <div className="flex-1 p-8 md:p-12 text-[#f1faee]">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{game.title}</h1>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
                            <Gamepad2 className="w-6 h-6" />
                            {game.platform || "Desconocida"}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
                            <Calendar className="w-6 h-6" />
                            {game.releaseDate ? new Date(game.releaseDate).getFullYear() : "Desconocido"}
                        </span>
                    </div>

                    <div className="space-y-2 text-base leading-relaxed text-[#f1faee]/90">
                        <p className="font-semibold text-lg">Descripción:</p>
                        <p>{game.description || "Sin descripción."}</p>
                    </div>
                </div>
            </div>
        </>
    );
}