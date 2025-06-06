"use client"

// Hooks
import { useEffect, useState } from "react";
// Acciones
import getGames from "@/src/actions/get-games-action";
// Tipos
import { Games } from "@/src/types";


// Hook personalizado para obtener la lista de juegos
export default function useGames(): { games: Games[]; loading: boolean } {
    // Estados para manejar la lista de juegos y el estado de carga
    const [games, setGames] = useState<Games[]>([]);
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los juegos al montar el componente
    useEffect(() => {
        // Llama a la acción getGames para obtener la lista de juegos
        getGames()
            .then((data) => {
                setGames(data);
                setLoading(false); // Cuando los juegos se han cargado, actualiza el estado de carga
            })
            .catch((error) => {
                console.error("Error al cargar los juegos:", error); // Muestra el error en la consola si ocurre un problema al obtener los juegos
                setLoading(false); // Si hay un error, también actualiza el estado de carga
            });
    }, []);

    // Devuelve la lista de juegos y el estado de carga para que puedan ser utilizados en el componente
    return { games, loading };
}