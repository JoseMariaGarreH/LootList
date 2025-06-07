import { PrismaClient } from '@prisma/client'

// Este código es para evitar que Prisma cree una nueva instancia en cada recarga de módulo durante el desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Si esta en un entorno de producción, crea una nueva instancia de PrismaClient
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    })

// Asigna la instancia de Prisma al objeto global para que se reutilice en lugar de crear una nueva
// Esto es útil en entornos de desarrollo para evitar problemas de conexión
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma