"use client"

import GameList from "@/components/games/GameList";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";

export default function GamesPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto py-8">
                <GameList />
            </div>
            <Footer />
        </>
    )
}