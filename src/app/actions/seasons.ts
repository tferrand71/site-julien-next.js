'use server';

import prisma from '@/lib/prisma';

export async function getPastSeasons() {
  return await prisma.pastSeason.findMany({
    orderBy: { year: 'desc' }
  });
}

export async function addPastSeason(data: any) {
  return await prisma.pastSeason.create({ data });
}

export async function deletePastSeason(id: string) {
  return await prisma.pastSeason.delete({ where: { id } });
}
