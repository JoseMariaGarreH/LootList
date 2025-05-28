import { prisma } from "../lib/prisma";
import { getAllVideojuegos } from "../actions/rawg";

async function importGames() {
    try {
        const rawgGames = await getAllVideojuegos(""); // Puedes pasar una query si quieres filtrar

        for (const game of rawgGames) {
            // Mapea los campos de RAWG a tu modelo
            await prisma.games.upsert({
                where: { id: game.id }, // Si RAWG id es único y quieres evitar duplicados
                update: {
                    title: game.name,
                    description: game.description_raw || "",
                    platform: game.platforms?.map((p: any) => p.platform?.name).join(", ") || "",
                    releaseDate: game.released ? new Date(game.released) : null,
                    imageUrl: game.background_image || "",
                },
                create: {
                    title: game.name,
                    description: game.description_raw || "",
                    platform: game.platforms?.map((p: any) => p.platform?.name).join(", ") || "",
                    releaseDate: game.released ? new Date(game.released) : null,
                    imageUrl: game.background_image || "",
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