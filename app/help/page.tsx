"use client"

import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";

export default function HelpPage() {
    return (
        <>  
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <section className="w-full max-w-3xl mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-white text-center">Ayuda</h1>
                    <p className="text-lg text-white text-center">
                        Esta aplicación te permite llevar un registro de los videojuegos que has jugado, descubrir nuevos títulos y compartir tus opiniones, al estilo de Letterboxd pero para videojuegos.
                    </p>
                </section>
                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white">¿Cómo navegar?</h2>
                    <p className="text-white">
                        Utiliza la barra de navegación superior para acceder a las secciones principales: explorar juegos, tu perfil, listas personalizadas y reseñas. Cada sección está pensada para que encuentres fácilmente lo que buscas.
                    </p>
                </section>
                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white">Funcionalidades principales</h2>
                    <ul className="list-disc list-inside text-white">
                        <li>Registra los videojuegos que has jugado, estás jugando o quieres jugar.</li>
                        <li>Escribe y lee reseñas de otros usuarios sobre los juegos.</li>
                        <li>Crea y gestiona listas personalizadas de tus juegos favoritos, pendientes, etc.</li>
                        <li>Descubre nuevos títulos a través de recomendaciones y tendencias de la comunidad.</li>
                        <li>Comparte tu perfil y listas con amigos.</li>
                    </ul>
                </section>
                <section className="w-full max-w-3xl bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white">Nota importante</h2>
                    <p className="text-white">
                        Esta aplicación ha sido desarrollada como parte de un Trabajo de Fin de Grado (TFG). 
                        No está habilitada la opción de soporte.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    )
}