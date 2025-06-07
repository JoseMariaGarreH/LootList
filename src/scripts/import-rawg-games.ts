import { prisma } from "../lib/prisma";
import { getAllVideojuegos } from "../actions/rawg";

// Script para importar juegos desde la API externa llamada RAWG, se puede ejecutar con comandos como npx tsx src/scripts/import-rawg-games.ts
async function importGames() {
    try {
        const rawgGames = await getAllVideojuegos(""); // Puedes pasar una query si quieres filtrar

        console.log(`Importando ${rawgGames.length} juegos desde RAWG...`);

        for (const game of rawgGames) {
            // Mapea los campos de RAWG a tu modelo
            await prisma.games.upsert({
                where: { id: game.id }, 
                update: {
                    title: game.name,
                    description: game.description_raw || "",
                    platform: game.platforms?.map((p: any) => p.platform?.name).join(", ") || "",
                    releaseDate: game.released ? new Date(game.released) : null,
                    imageUrl: game.background_image || "",
                    genre: game.genres?.map((g: any) => g.name).join(", ") || "",
                },
                create: {
                    title: game.name,
                    description: game.description_raw || "",
                    platform: game.platforms?.map((p: any) => p.platform?.name).join(", ") || "",
                    releaseDate: game.released ? new Date(game.released) : null,
                    imageUrl: game.background_image || "",
                    genre: game.genres?.map((g: any) => g.name).join(", ") || "",
                },
            });
        }

        console.log("Importación completada.");
    } catch (error) {
        console.error("Error importando juegos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

importGames();