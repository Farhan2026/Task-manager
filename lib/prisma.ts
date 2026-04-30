import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // In Prisma 7, it automatically picks up the config
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;