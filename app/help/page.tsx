"use client"

import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import { HelpCircle, Compass, Star, Info } from "lucide-react";

export default function HelpPage() {
    return (
        <>  
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
                <section className="w-full max-w-3xl mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-2">
                        <HelpCircle size={32} /> Ayuda
                    </h1>
                    <p className="text-lg text-white">
                        Esta aplicación te permite llevar un registro de los videojuegos que has jugado, descubrir nuevos títulos y compartir tus opiniones con la comunidad.
                    </p>
                </section>

                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Compass size={22} /> ¿Cómo navegar?
                    </h2>
                    <p className="text-white">
                        Usa la barra de navegación superior para explorar juegos, gestionar tu perfil o leer reseñas. Todo está diseñado para que accedas fácilmente a las funcionalidades que necesitas.
                    </p>
                </section>

                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Star size={22} /> Funcionalidades principales
                    </h2>
                    <ul className="list-disc list-inside text-white space-y-2">
                        <li>Registra los videojuegos que has jugado, estás jugando o planeas jugar.</li>
                        <li>Lee y escribe reseñas para ayudar a otros jugadores.</li>
                        <li>Descubre nuevos títulos mediante recomendaciones y tendencias.</li>
                    </ul>
                </section>

                <section className="w-full max-w-3xl bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Info size={22} /> Nota importante
                    </h2>
                    <p className="text-white">
                        Esta aplicación ha sido desarrollada como parte de un Trabajo de Fin de Grado (TFG). Actualmente no está habilitada la opción de soporte o contacto.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}
