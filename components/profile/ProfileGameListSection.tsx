import GameCard from "@/components/games/GameCard";

interface ProfileGameListSectionProps {
    games: any[];
    emptyText: string;
    title: string;
}

export default function ProfileGameListSection({ games, emptyText, title }: ProfileGameListSectionProps) {
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 pb-10">
                {games.length === 0 ? (
                    <p className="text-center text-[#f1faee] w-full col-span-full">
                        {emptyText}
                    </p>
                ) : (
                    games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))
                )}
            </div>
        </div>
    );
}