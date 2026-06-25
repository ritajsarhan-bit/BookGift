/**
 * Prisma client singleton.
 * In development Next.js reloads modules on every change,
 * so we store the client on `globalThis` to avoid creating
 * a new database connection on every hot-reload.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
