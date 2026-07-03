import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { _prisma?: PrismaClient };

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!globalForPrisma._prisma) {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgres://dummy:dummy@dummy:5432/dummy" });
      const adapter = new PrismaPg(pool);
      globalForPrisma._prisma = new PrismaClient({ adapter });
    }
    return (globalForPrisma._prisma as any)[prop];
  }
});

