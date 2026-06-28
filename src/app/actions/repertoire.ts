'use server';

import prisma from '@/lib/prisma';

export async function getRepertoire() {
  return await prisma.repertoire.findMany({
    orderBy: [
      { category: 'asc' },
      { composer: 'asc' }
    ]
  });
}

export async function addRepertoireItem(data: {
  category: string;
  composer: string;
  piece: string;
}) {
  return await prisma.repertoire.create({ data });
}

export async function deleteRepertoireItem(id: string) {
  return await prisma.repertoire.delete({ where: { id } });
}
