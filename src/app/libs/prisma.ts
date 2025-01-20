import { PrismaClient } from "@prisma/client";
import { glob } from "fs";

const globalPrisma = global as unknown as { prisma: PrismaClient }; // This is a hack to avoid multiple instances of Prisma Client in development, global object persist between module reloads

export const prisma = globalPrisma.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

if(process.env.NODE_ENV === 'development') globalPrisma.prisma = prisma;