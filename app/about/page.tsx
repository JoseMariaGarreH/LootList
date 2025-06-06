"use client"

// Componentes
import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
// Iconos
import { GraduationCap, Info, MessageCircleQuestion, Pin } from "lucide-react";

// Página de "Sobre Nosotros", para informar al usuario sobre el proyecto y su creador
export default function AboutPage() {
    return (
        <>  
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <section className="w-full max-w-3xl mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-2">
                        <Info size={32} />  Sobre Nosotros
                    </h1>
                    <p className="text-lg text-white text-center">
                        Bienvenido a nuestra página. Aquí te contamos quién está detrás de este proyecto y cómo se ha desarrollado.
                    </p>
                </section>
                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white flex items-center gap-2">
                        <MessageCircleQuestion size={32} /> ¿Quién soy?
                    </h2>
                    <p className="text-white">
                        Soy un alumno en prácticas procedente del Carlos III de Cartagena, que ha finalizado con éxito un módulo de Formación Profesional de Grado Superior en Desarrollo de Aplicaciones Web.
                    </p>
                </section>
                <section className="w-full max-w-3xl mb-8 bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white flex items-center gap-2">
                        <GraduationCap size={32} />  Formación y Experiencia
                    </h2>
                    <ul className="list-disc list-inside text-white">
                        <li>Programación en distintos lenguajes y entornos.</li>
                        <li>Diseño web moderno y adaptativo.</li>
                        <li>Desarrollo de software y aplicaciones prácticas.</li>
                        <li>Participación en proyectos reales como este sitio web.</li>
                    </ul>
                </section>
                <section className="w-full max-w-3xl bg-gray-800 bg-opacity-70 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2 text-white flex items-center gap-2">
                        <Pin size={32} /> Objetivos
                    </h2>
                    <p className="text-white">
                        Mi meta es seguir formándome y aportar valor al sector tecnológico mediante soluciones innovadoras y creativas, creciendo profesionalmente en el mundo del desarrollo.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    )
}