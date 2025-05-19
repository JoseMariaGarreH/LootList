import { useEffect, useState } from "react";

export default function useGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("/api/games")
            .then((res) => res.json())
            .then((data) => {
                setGames(data);
            })
            .catch((error) => {
                console.error("Error fetching games:", error);
            });
    }, []);

    return { games };
}