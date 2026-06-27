import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { _prisma?: PrismaClient };

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!globalForPrisma._prisma) {
      globalForPrisma._prisma = new PrismaClient();
    }
    return (globalForPrisma._prisma as any)[prop];
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma._prisma = prisma;
}
