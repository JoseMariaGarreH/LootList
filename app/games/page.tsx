"use client"

import GameList from "@/components/games/GameList";
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";

export default function GamesPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-[#e63946]">Juegos</h1>
                <GameList />
            </div>
            <Footer />
        </>
    )
}