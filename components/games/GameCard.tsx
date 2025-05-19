import { Games } from "@/src/types";
import Image from "next/image";

export default function GameCard({ game }: { game: Games }) {
    return (
        <div className="p-1 flex flex-col items-center w-44">
            <Image
                src={game.imageUrl || "/img/default_game.jpg"}
                alt={game.title}
                width={200}
                height={200}
                className="rounded mb-2 object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>
    );
}