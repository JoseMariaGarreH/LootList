import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

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
    const [commentValue, setCommentValue] = useState(userComment || "");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setCommentValue(userComment || "");
    }, [userComment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profileId) {
            toast.error("Debes iniciar sesión para comentar.");
            return;
        }
        if (!commentValue.trim()) {
            toast.error("El comentario no puede estar vacío.");
            return;
        }
        setSubmitting(true);
        try {
            console.log("Enviando comentario:", commentValue.trim());
            console.log("Perfil ID:", profileId);
            await addOrUpdateComment(profileId, commentValue.trim());
            toast.success(userComment ? "Comentario actualizado." : "Comentario añadido.");
            setModalOpen(false);
        } catch {
            toast.error("Error al guardar el comentario.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!setModalOpen) return null;

    return (
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
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-32 p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#e63946] resize-none mb-4"
                        placeholder="Escribe tu comentario..."
                        value={commentValue}
                        onChange={e => setCommentValue(e.target.value)}
                        maxLength={500}
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="py-2 px-4 text-white rounded-md hover:bg-gray-600 bg-gray-500 transition"
                            onClick={() => setModalOpen(false)}
                            disabled={submitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 text-white rounded-md hover:bg-[#1d3557] bg-[#e63946] active:bg-[#a62633] transition"
                            disabled={submitting}
                        >
                            {userComment ? "Guardar cambios" : "Comentar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}