'use client'

import { Profile, ProfileGame } from "@/src/types";
import Graphic from "./Graphic";

interface ProfileInformationProps {
    profileGames: ProfileGame[];
    profile: Profile;
}

export default function ProfileInformation({ profileGames, profile }: ProfileInformationProps) {

    const gamesPlayed = profileGames.filter(game => game.played === true).length;
    const gamesPlaying = profileGames.filter(game => game.playing === true).length;
    const gamesLiked = profileGames.filter(game => game.liked === true).length;

    // Calcula el número de juegos por rating (1 a 5)
    const ratingsCount = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(
        (star) => profileGames.filter(g => g.rating === star).length
    );

    return (
        <>
            <div className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Biografía */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-2">Biografía</h3>
                        <hr className="border-t border-[#f1faee] mb-4" />
                        <p className="text-[#f1faee] italic">{profile.bio || "¡Nada por aquí!"}</p>
                    </div>

                    {/* Estadísticas */}
                    <div className="md:col-span-2 p-4 flex flex-col justify-center">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-7xl text-white">
                                    {(gamesPlayed || 0).toLocaleString("es-ES", { minimumIntegerDigits: 3, useGrouping: false })}
                                </p>
                                <p className="text-sm text-[#f1faee] mt-1">Juegos jugados</p>
                            </div>
                            <div>
                                <p className="text-7xl text-[#f1faee]">
                                    {(gamesPlaying || 0).toLocaleString("es-ES", { minimumIntegerDigits: 3, useGrouping: false })}
                                </p>
                                <p className="text-sm text-[#f1faee] mt-1">Juegos que estas jugando</p>
                            </div>
                            <div>
                                <p className="text-7xl text-[#f1faee]">
                                    {(gamesLiked || 0).toLocaleString("es-ES", { minimumIntegerDigits: 3, useGrouping: false })}
                                </p>
                                <p className="text-sm text-[#f1faee] mt-1">Juegos que te han gustado</p>
                            </div>
                            <hr className="col-span-3 border-t border-[#f1faee] my-4" />
                        </div>
                        {/* Añade el gráfico debajo de los contadores */}
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold text-white mb-2">Tus valoraciones</h4>
                            <Graphic ratingsCount={ratingsCount} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}