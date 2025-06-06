"use client"

// Icono
import { Star } from "lucide-react";
// Tipos
import { Comment } from "@/src/types";

export function CommentGame({ comment, rating }: { comment: Comment, rating: number }) {
    return (
        <div className="bg-[#264470] rounded-lg px-4 py-3 shadow-md flex items-start gap-4">
            {/* Imagen del usuario que hay registrado en ese momento en la página*/}
            <img
                src={comment.profile?.profileImage || "/default-avatar.png"}
                alt={comment.profile?.user?.username || "Usuario"}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div className="flex-1">
                {/* Nombre del usuario y estrellas de valoración */}
                <div className="flex items-center gap-2 mb-1">
                    {/* Nombre del usuario que esta registrado en ese momento */}
                    <span className="text-sm text-white/80 font-semibold">
                        {comment.profile?.user?.username || "Usuario"}
                    </span>
                    {/* Estrellas de valoración */}
                    <span className="flex items-center">
                        {/* Mapeamos las estrellas para mostrar la valoración */}
                        {[1, 2, 3, 4, 5].map((star) => {
                            // Comprobamos si la estrella está llena o medio llena
                            const filled = rating >= star;
                            // Comprobamos si la estrella está medio llena
                            const halfFilled = !filled && rating >= star - 0.5;
                            // Retornamos el componente de estrellas 
                            // y el color de la estrella según si está llena, medio llena o vacía
                            return (
                                <span key={star} className="relative w-4 h-4">
                                    <Star
                                        className={`w-4 h-4 ${filled || halfFilled ? "text-[#e63946]" : "text-gray-400"}`}
                                        fill={filled ? "#e63946" : "none"}
                                        strokeWidth={2}
                                    />
                                    {halfFilled && (
                                        <span className="absolute left-0 top-0 w-2 h-4 overflow-hidden">
                                            <Star
                                                className="w-4 h-4 text-[#e63946]"
                                                fill="#e63946"
                                                strokeWidth={2}
                                            />
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </span>
                </div>
                <p className="text-white">{comment.content}</p>
            </div>
        </div>
    );
}