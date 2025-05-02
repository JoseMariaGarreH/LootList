"use client"

import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";
import Image from "next/image";
import { roboto } from "@/components/ui/font";
import { Heart, Eye, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="relative w-full h-[500px]">
        <Image
          src="/img/img_juego1.jpeg"
          alt="Imagen portada del juego Split Fiction"
          fill
          className="object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className={`${roboto.className} text-[#e63946] text-[26px] font-semibold drop-shadow border p-2`}>
            Haz un seguimiento de los Juegos que te has pasado. <br />
            Registra tus juegos favoritos. <br />
            Y disfruta de una experiencia única.
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap">

        <div className="w-full md:w-1/2  md:order-1 px-4 py-4">
          <h2 className="text-[#a8dadc] text-[18px] font-semibold mb-2">Reseñas</h2>
          <p className="text-justify text-black text-[14px]">
            En esta sección encontrarás opiniones detalladas y valoraciones de los usuarios sobre una amplia variedad de videojuegos, tanto clásicos como actuales. Las reseñas permiten conocer de primera mano cómo ha sido la experiencia de otros jugadores, lo que resulta fundamental a la hora de decidir si vale la pena probar un título o no.

            Cada reseña incluye comentarios sobre aspectos clave como la jugabilidad, la calidad gráfica, la narrativa, la dificultad, el rendimiento técnico y la originalidad del juego. Además, muchas veces los usuarios comparten consejos, trucos, o detalles que no suelen aparecer en descripciones oficiales, lo que enriquece aún más la visión general del juego.

            Nuestro objetivo es que esta sección funcione como una comunidad abierta, donde los jugadores puedan expresar sus puntos de vista con libertad y respeto, creando un espacio de intercambio que beneficie tanto a jugadores ocasionales como a gamers más exigentes. Ya sea que estés buscando una nueva experiencia inmersiva o simplemente evitando una compra que no cumpla tus expectativas, las reseñas son una herramienta esencial para tomar decisiones informadas.
          </p>
        </div>

        <div className="w-full md:w-1/2  md:order-2 px-4 py-4">
          <Image
            src="/img/img_juego2.jpg"
            alt="Portada de juego de Batman Arkham Knight"
            className="w-full h-auto rounded-lg shadow-md object-cover"
            width={600}
            height={600}
          />
        </div>

        <div className="w-full md:w-1/2 md:order-4 px-4 py-4">
          <h2 className=" text-[#a8dadc] text-[18px] font-semibold mb-2">Juegos</h2>
          <p className="text-justify text-black text-[14px]">
            Aquí se presenta una cuidada selección de juegos destacados disponibles en nuestra plataforma. Cada título ha sido elegido no solo por su calidad técnica, sino también por la experiencia que ofrece al jugador. Nos enfocamos en incluir juegos que se destaquen por su jugabilidad fluida, historias envolventes, diseños visuales atractivos y, por supuesto, su impacto positivo dentro de la comunidad gamer.
            Encontrarás desde títulos populares que marcan tendencia en el mundo del gaming, hasta joyas ocultas que sorprenden por su innovación o profundidad narrativa. Esta sección es ideal para quienes buscan inspiración, recomendaciones o simplemente descubrir nuevas propuestas que se ajusten a sus gustos personales.
            Ya sea que prefieras aventuras épicas de mundo abierto, desafiantes juegos de estrategia, experiencias cooperativas o títulos casuales para jugar en tus ratos libres, aquí hay algo para todos. La variedad está pensada para abarcar distintos géneros, estilos artísticos y niveles de dificultad, asegurando que cada jugador pueda encontrar algo que lo atrape y le deje una impresión duradera.
            Te invitamos a explorar, leer detalles, mirar imágenes, y dejarte llevar por el entusiasmo de encontrar tu próxima aventura favorita.
          </p>
        </div>

        <div className="w-full md:w-1/2 md:order-3 px-4 py-4">
          <Image
            src="/img/img_juego3.jpg"
            alt="Portada de juego de Zelda Breath of the Wild"
            className="w-full h-auto rounded-lg shadow-md object-cover"
            width={600}
            height={600}
          />
        </div>

        <div className="w-full md:w-1/2 md:order-5 px-4 py-4">
          <h2 className=" text-[#a8dadc] text-[18px] font-semibold mb-2">Listar Juegos</h2>
          <p className="text-justify text-black text-[14px]">
            En esta sección tienes acceso al catálogo completo de juegos disponibles en nuestra plataforma. Es el lugar ideal para explorar todo lo que ofrecemos, ya sea que tengas algo específico en mente o simplemente quieras navegar con libertad hasta encontrar una opción que te llame la atención.
            El listado está pensado para ofrecerte una experiencia de navegación clara, dinámica y personalizable. Podés aplicar distintos filtros para afinar tu búsqueda: por categoría (como aventura, acción, simulación, etc.), por género (shooter, RPG, indie, multijugador, entre otros), por nivel de dificultad, o incluso por popularidad y puntuación de los usuarios.
            También incluimos herramientas de ordenamiento para que puedas ver los juegos más recientes, los mejor valorados o aquellos que más tiempo llevan en la plataforma. Todo esto pensado para que no pierdas tiempo y encuentres lo que buscás de forma rápida y eficiente.
            Además, cada juego del listado incluye una pequeña descripción, su imagen representativa y accesos rápidos para ver más detalles, leer reseñas o comenzar a jugar si ya lo tenés disponible.
            Esta sección es esencial para quienes quieren tener una visión general del catálogo y aprovechar al máximo todo el contenido que hemos reunido en un solo lugar.
          </p>
        </div>

        <div className="w-full md:w-1/2 md:order-6 px-4 py-4">
          <Image
            src="/img/img_juego4.jpg"
            alt="Portada de juego de Bioshock Infinite"
            className="w-full h-auto rounded-lg shadow-md object-cover"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="w-full max-w-[1870px] mx-auto bg-[#1d3557] m-6 rounded">
        <h1 className="text-center text-[#e63946] text-[26px] font-semibold mb-2">Funciones</h1>
        <div className="flex flex-wrap justify-center">

          <div className="w-full md:w-1/3 order-1 md:order-1 p-4 flex justify-center">
            <Heart
              className="text-[#a8dadc]"
              width={200}
              height={200}
            >
            </Heart>
          </div>

          <div className="w-full md:w-1/3 order-2 md:order-4 p-4">
            <h4 className="text-center text-[16px] text-[#f1faee]">
              Muestra un poco de amor por tus juegos favoritos con un "me gusta".
            </h4>
          </div>

          <div className="w-full md:w-1/3 order-3 md:order-2 p-4 flex justify-center">
            <Eye
              className="text-[#a8dadc]"
              width={200}
              height={200}
            >
            </Eye>
          </div>

          <div className="w-full md:w-1/3 order-4 md:order-5 p-4">
            <h4 className="text-center text-[16px] text-[#f1faee]">
            Lleva la cuenta de todos los juegos que has jugado. Asignando en cada juego una etiqueta los juegos que has jugado.
            </h4>
          </div>

          <div className="w-full md:w-1/3 order-5 md:order-3 p-4 flex justify-center">
            <Star
              className="text-[#a8dadc]"
              width={200}
              height={200}
            >
            </Star>
          </div>

          <div className="w-full md:w-1/3 order-6 md:order-6 p-4">
            <h4 className="text-center text-[16px] text-[#f1faee]">
              Puntúa cada juego en una escala de cinco estrellas (con mitades) para registrar y compartir tu reacción.
            </h4>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

