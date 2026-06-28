'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const BiographyTextSchema = z.object({
  content_fr: z.string().max(10000),
  content_en: z.string().max(10000),
  content_de: z.string().max(10000),
  content_es: z.string().max(10000),
});

const DocumentTypeSchema = z.enum(['cv', 'bio']);

export async function getBiography() {
  let bio = await prisma.biography.findFirst();
  if (!bio) {
    bio = await prisma.biography.create({ data: {} });
  }
  return bio;
}

export async function updateBiographyText(data: z.infer<typeof BiographyTextSchema>) {
  await requireAdmin();
  const validated = BiographyTextSchema.parse(data);

  const bio = await prisma.biography.findFirst();
  if (bio) {
    await prisma.biography.update({
      where: { id: bio.id },
      data: {
        content_fr: validated.content_fr,
        content_en: validated.content_en,
        content_de: validated.content_de,
        content_es: validated.content_es,
      },
    });
    revalidatePath('/', 'layout');
  }
}

export async function uploadDocument(formData: FormData, type: 'cv' | 'bio') {
  await requireAdmin();
  DocumentTypeSchema.parse(type);

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File too large (max 10MB)');
  }

  // Validate file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Allowed: PDF, JPEG, PNG, WebP');
  }

  const filename = `${type}-julien-jacquemart-${Date.now()}.${file.name.split('.').pop()}`;
  
  const blob = await put(filename, file, {
    access: 'public',
  });

  const bio = await prisma.biography.findFirst();
  if (bio) {
    await prisma.biography.update({
      where: { id: bio.id },
      data: type === 'cv' ? { cvUrl: blob.url } : { bioUrl: blob.url },
    });
    revalidatePath('/', 'layout');
  }
  
  return blob.url;
}
