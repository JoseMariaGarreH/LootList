"use client"

import React from "react";
import { Star } from "lucide-react";
import { Comment } from "@/src/types";

export function CommentGame({ comment, rating }: { comment: Comment, rating: number }) {
    return (
        <li className="bg-[#264470] rounded-lg px-4 py-3 shadow-md flex items-start gap-4">
            <img
                src={comment.profile?.profileImage || "/default-avatar.png"}
                alt={comment.profile?.user?.username || "Usuario"}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-white/80 font-semibold">
                        {comment.profile?.user?.username || "Usuario"}
                    </span>
                    <span className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const filled = rating >= star;
                            const halfFilled = !filled && rating >= star - 0.5;
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
        </li>
    );
}