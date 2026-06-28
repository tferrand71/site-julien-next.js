'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const RepertoireItemSchema = z.object({
  category: z.string().min(1).max(200),
  composer: z.string().min(1).max(300),
  piece: z.string().min(1).max(500),
});

export async function getRepertoire() {
  return await prisma.repertoire.findMany({
    orderBy: [
      { category: 'asc' },
      { composer: 'asc' }
    ]
  });
}

export async function addRepertoireItem(data: z.infer<typeof RepertoireItemSchema>) {
  await requireAdmin();
  const validated = RepertoireItemSchema.parse(data);
  return await prisma.repertoire.create({ data: validated });
}

export async function deleteRepertoireItem(id: string) {
  await requireAdmin();
  const validatedId = z.string().uuid().parse(id);
  return await prisma.repertoire.delete({ where: { id: validatedId } });
}
