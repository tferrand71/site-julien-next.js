'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const PastSeasonSchema = z.object({
  year: z.string().min(1).max(20),
  title_fr: z.string().min(1).max(300),
  title_en: z.string().min(1).max(300),
  title_de: z.string().min(1).max(300),
  title_es: z.string().min(1).max(300),
  desc_fr: z.string().max(5000),
  desc_en: z.string().max(5000),
  desc_de: z.string().max(5000),
  desc_es: z.string().max(5000),
});

export async function getPastSeasons() {
  return await prisma.pastSeason.findMany({
    orderBy: { year: 'desc' }
  });
}

export async function addPastSeason(data: z.infer<typeof PastSeasonSchema>) {
  await requireAdmin();
  const validated = PastSeasonSchema.parse(data);
  return await prisma.pastSeason.create({ data: validated });
}

export async function deletePastSeason(id: string) {
  await requireAdmin();
  const validatedId = z.string().uuid().parse(id);
  return await prisma.pastSeason.delete({ where: { id: validatedId } });
}
