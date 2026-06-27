'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

export async function getBiography() {
  let bio = await prisma.biography.findFirst();
  if (!bio) {
    bio = await prisma.biography.create({ data: {} });
  }
  return bio;
}

export async function updateBiographyText(data: any) {
  const bio = await prisma.biography.findFirst();
  if (bio) {
    await prisma.biography.update({
      where: { id: bio.id },
      data: {
        content_fr: data.content_fr,
        content_en: data.content_en,
        content_de: data.content_de,
        content_es: data.content_es,
      },
    });
    revalidatePath('/', 'layout');
  }
}

export async function uploadDocument(formData: FormData, type: 'cv' | 'bio') {
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

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
