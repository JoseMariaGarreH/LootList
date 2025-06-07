"use client"

// Componentes
import { useForm } from "react-hook-form";
// Hooks
import { useEffect, useState } from "react";
// Iconos
import { X, Star, Heart, Gamepad2, Play, Gift } from "lucide-react";
// Librerías
import toast, { Toaster } from "react-hot-toast";


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
}

export default function GamePopUp({
    profileId,
    userComment,
    setModalOpen,
    addOrUpdateComment,
    initialStates = {},
    onUpdateStates = () => { },
}: GamePopUpProps) {
    // Hook de formulario para manejar el comentario del usuario
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<{ comment: string }>({
        defaultValues: { comment: userComment || "" }
    });

    // Estados para manejar distintas propiedades del comentario, que se le asignarán al perfil del usuario
    const [rating, setRating] = useState(initialStates.rating ?? 0);
    const [liked, setLiked] = useState(initialStates.liked ?? false);
    const [played, setPlayed] = useState(initialStates.played ?? false);
    const [playing, setPlaying] = useState(initialStates.playing ?? false);
    const [wishlist, setWishlist] = useState(initialStates.wishlist ?? false);

    // Estado para manejar las estrellas de valoración y el hover de las estrellas
    const [hover, setHover] = useState(0);
    const [showClear, setShowClear] = useState(false);

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
        // Comprobamos que el usuario esté autenticado
        if (!profileId) {
            toast.error("Debes iniciar sesión para comentar.");
            return;
        }
        // Comprobamos que el comentario no esté vacío
        if (!data.comment.trim()) {
            toast.error("El comentario no puede estar vacío.");
            return;
        }

        try {
            // Llamamos a la función para agregar o actualizar el comentario
            await addOrUpdateComment(profileId, data.comment.trim(), {
                rating,
                liked,
                played,
                playing,
                wishlist,
            });
            // Mostramos un mensaje de éxito
            setModalOpen(false)
            // Actualizamos los estados en el componente padre
            onUpdateStates({ rating, liked, played, playing, wishlist });
            // Actualizamos lá página después de un breve retraso
            // Esto es para asegurarnos de que el estado se haya actualizado correctamente
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
            // Si ocurre un error, mostramos un mensaje de error
            toast.error("Error al guardar el comentario.");
        }
    };

    // Si no se debe mostrar el modal, no mostramos nada
    if (!setModalOpen) return "";

    return (
        <>
            {/* Mostramos el toaster para notificaciones */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-[#457b9d] rounded-lg shadow-lg w-[500px] p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                        {/* Título de la ventana emergente */}
                        <h2 className="text-xl text-white font-bold">
                            {userComment ? "Editar tu comentario" : "Nuevo comentario"}
                        </h2>
                        {/* Botón para cerrar la ventana emergente */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6 text-[#d9d9d9]" />
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
                                {/* Botón que borra la valoración y la pone a cero, visualmente es una equis */}
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
                                {/* Cada estrella tiene un evento onMouseMove para cambiar el hover y onClick para cambiar el rating */}
                                {[1, 2, 3, 4, 5].map((star) => {
                                    // Comprobamos si la estrella está llena o medio llena
                                    const filled = (hover || rating) >= star;
                                    // Comprobamos si la estrella está medio llena
                                    const halfFilled = !filled && (hover || rating) >= star - 0.5;

                                    // Devolvemos el componente de estrellas
                                    // y el color de la estrella según si está llena, medio llena o vacía
                                    return (
                                        <span
                                            key={star}
                                            className="relative w-7 h-7 cursor-pointer"
                                            onMouseMove={e => {
                                                // Calculamos la posición del ratón dentro del elemento
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                // Y actualizamos el hover según la posición del ratón
                                                setHover(x < width / 2 ? star - 0.5 : star);
                                            }}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={e => {
                                                // Al hacer click, calculamos la posición del ratón dentro del elemento
                                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - left;
                                                // Y actualizamos el rating según la posición del ratón
                                                const newRating = x < width / 2 ? star - 0.5 : star;
                                                // Actualizamos el estado del rating y si se ha jugado
                                                setRating(newRating);
                                                if (newRating > 0) setPlayed(true); // Esto marca el juego como jugado si se le da una valoración al juego
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
                            {...register("comment", { required: "El comentario no puede estar vacío" })}
                        />
                        {errors.comment && (
                            <span className="text-red-800 text-xs font-semibold mt-2 block">
                                {errors.comment.message}
                            </span>
                        )}
                        {/* Botón para confirmar los datos del formulario */}
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