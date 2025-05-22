import useGames from "@/hooks/useGames";
import { useProfileGame } from "@/hooks/useProfileGame";
import { Games, ProfileGame } from "@/src/types";
import { Calendar, Gamepad2, Gift, Heart, Play, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GameDetails({ id }: { id: string }) {
    const { games } = useGames();
    const { profile } = useProfileGame();
    const game: Games | undefined = games.find((g) => g.id.toString() === id);

    // Busca el registro de ProfileGame para este juego
    const profileGame = profile.find((pg) => pg.gameId.toString() === id);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [status, setStatus] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();

    // Sincroniza el estado local con los datos del perfil
    useEffect(() => {
        if (profileGame) {
            setRating(profileGame.rating || 0);
            setStatus(profileGame.status || null);
            setLiked(!!profileGame.liked);
        } else {
            setRating(0);
            setStatus(null);
            setLiked(false);
        }
    }, [profileGame, id]);

    if (!game) {
        return <p className="text-center text-[#f1faee]">Juego no encontrado.</p>;
    }

    const handleSetRating = async (newRating: number) => {

        if (!session?.user) {
            toast.error("Debes iniciar sesión para valorar un juego.");
            return;
        }

        setRating(newRating);
        await fetch(`/api/profileGame/${session.user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: game.id, rating: newRating }),
        });
    };

    const handleSetStatus = async (status: string) => {

        if (!session?.user) {
            toast.error("Debes iniciar sesión para añadir un estado a un juego.");
            return;
        }

        await fetch(`/api/profileGame/${session.user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: game.id, status }),
        });
    };

    const handleLike = async () => {

        if (!session?.user) {
            toast.error("Debes iniciar sesión para dar me gusta a un juego.");
            return;
        }

        await fetch(`/api/profileGame/${session.user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: game.id, liked: true }),
        });
    };

    return (
        <>
            <Toaster  position="top-center" reverseOrder={false}/>
            <div className="bg-[#457b9d] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#a8dadc]/20">
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#1d3557] p-8 md:p-10">
                    <Image
                        src={game.imageUrl || ""}
                        alt={game.title}
                        width={280}
                        height={280}
                        className="object-cover shadow-lg border border-[#a8dadc]/10"
                        priority
                    />
                    {/* Rating de estrellas */}
                    <div className="flex items-center mt-6 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled = (hover || rating) >= star;
                            const halfFilled = !filled && (hover || rating) >= star - 0.5;

                            return (
                                <span
                                    key={star}
                                    className="relative w-8 h-8 inline-block cursor-pointer"
                                    onMouseMove={e => {
                                        const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                        const x = e.clientX - left;
                                        setHover(x < width / 2 ? star - 0.5 : star);
                                    }}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={e => {
                                        const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                        const x = e.clientX - left;
                                        const newRating = x < width / 2 ? star - 0.5 : star;
                                        setRating(newRating);
                                        handleSetRating(newRating);
                                    }}
                                >
                                    <Star className="absolute w-8 h-8 text-gray-400" fill="none" />
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
                    <hr className="border-t border-gray-300 w-96" />
                    <div className="flex flex-wrap p-2 rounded-xl">
                        <button onClick={() => handleSetStatus("jugado")} className="mx-2 my-1 inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
                            <Gamepad2 className="w-5 h-5" />
                            Jugado
                        </button>
                        <button onClick={() => handleSetStatus("jugando")} className="mx-2 my-1 inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
                            <Play className="w-5 h-5" />
                            Jugando
                        </button>
                        <button onClick={() => handleSetStatus("lista_deseos")} className="mx-2 my-1 inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
                            <Gift className="w-5 h-5" />
                            Lista de deseos
                        </button>
                        <button onClick={handleLike} className="mx-2 my-1 inline-flex items-center gap-2 text-gray-300 hover:text-white transition">
                            <Heart className="w-5 h-5" />
                            Me gusta
                        </button>
                    </div>

                </div>
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold mb-4 text-[#f1faee] flex items-center gap-2">
                        {game.title}
                    </h1>
                    <div className="mb-6 flex flex-wrap gap-4">
                        <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-base shadow">
                            <Gamepad2 className="w-9 h-9" />
                            {game.platform || "Desconocida"}
                        </span>
                        <span className="inline-flex items-center gap-2 bg-[#a8dadc] text-[#1d3557] px-4 py-2 rounded-full font-semibold text-base shadow">
                            <Calendar className="w-5 h-5" />
                            {game.releaseDate ? new Date(game.releaseDate).getFullYear() : "Desconocido"}
                        </span>
                    </div>
                    <div className="flex items-start gap-2 text-[#f1faee] text-lg p-4">
                        <div>
                            <p className="font-semibold">Descripción:</p>
                            <p>{game.description || "Sin descripción."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}