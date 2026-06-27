'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getHeroContent() {
  let content = await prisma.heroContent.findFirst();
  if (!content) {
    content = await prisma.heroContent.create({ data: {} });
  }
  return content;
}

export async function updateHeroContent(data: any) {
  const content = await prisma.heroContent.findFirst();
  if (content) {
    await prisma.heroContent.update({
      where: { id: content.id },
      data,
    });
  }
  revalidatePath('/', 'layout');
}
