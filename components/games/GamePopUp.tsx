import { useEffect } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

interface GamePopUpProps {
    profileId: string | null;
    userComment: string | null;
    setModalOpen: (open: boolean) => void;
    addOrUpdateComment: (profileId: string, comment: string) => Promise<void>;
}

export default function GamePopUp({
    profileId,
    userComment,
    setModalOpen,
    addOrUpdateComment,
}: GamePopUpProps) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<{ comment: string }>({
        defaultValues: { comment: userComment || "" }
    });

    useEffect(() => {
        setValue("comment", userComment || "");
    }, [userComment, setValue]);

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
            await addOrUpdateComment(profileId, data.comment.trim());
            toast.success(userComment ? "Comentario actualizado." : "Comentario añadido.");
            setModalOpen(false);
        } catch {
            toast.error("Error al guardar el comentario.");
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
                            {userComment ? "Guardar cambios" : "Comentar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}