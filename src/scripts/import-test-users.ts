import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

// Script para crear usuarios de prueba en la base de datos
// Este script se puede ejecutar con `npx tsx src/scripts/import-test-users.ts`
// No recomiendo utilizarlo ya que es para propósitos de desarrollo y pruebas, no para producción. Y nos podrán probar funciones especiales de la aplicación
async function seedUsers() {
    try {
        // Hash de la contraseña de prueba
        // Asegúrate de que la contraseña sea la misma que se usa en el registro
        const password = await bcrypt.hash("", 10);

        // Crea varios usuarios de prueba en la base de datos
        await prisma.users.createMany({
            data: [
                {
                    email: "usuarioprueba1@lootlist.com",
                    username: "usuarioprueba1",
                    password,
                },
                {
                    email: "usuarioprueba2@lootlist.com",
                    username: "usuarioprueba2",
                    password,
                }
            ]
        });

        // Comentario de existo
        console.log("Usuarios de prueba creados.");
    } catch (error) { // Manejo de errores
        // Si ocurre un error, lo registramos en la consola
        console.error("Error creando usuarios de prueba:", error);
    } finally {
        // Desconectamos Prisma para cerrar la conexión a la base de datos
        await prisma.$disconnect();
    }
}

// Ejecutamos la función para crear los usuarios de prueba
seedUsers();