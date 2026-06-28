'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const HeroContentSchema = z.object({
  title_fr: z.string().max(200).optional(),
  title_en: z.string().max(200).optional(),
  title_de: z.string().max(200).optional(),
  title_es: z.string().max(200).optional(),
  subtitle_fr: z.string().max(500).optional(),
  subtitle_en: z.string().max(500).optional(),
  subtitle_de: z.string().max(500).optional(),
  subtitle_es: z.string().max(500).optional(),
});

export async function getHeroContent() {
  let content = await prisma.heroContent.findFirst();
  if (!content) {
    content = await prisma.heroContent.create({ data: {} });
  }
  return content;
}

export async function updateHeroContent(data: z.infer<typeof HeroContentSchema>) {
  await requireAdmin();
  const validated = HeroContentSchema.parse(data);

  const content = await prisma.heroContent.findFirst();
  if (content) {
    await prisma.heroContent.update({
      where: { id: content.id },
      data: validated,
    });
  }
  revalidatePath('/', 'layout');
}
