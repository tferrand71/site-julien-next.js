'use server'; // Force IDE refresh

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';
import { put, del } from '@vercel/blob';

const reorderSchema = z.array(z.object({
  id: z.string(),
  order: z.number()
}));

export async function getPhotos() {
  return await prisma.photo.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function addPhoto(formData: FormData) {
  await requireAdmin();

  const file = formData.get('image') as File | null;
  if (!file) {
    throw new Error('Image requise');
  }

  // Count existing to append at the end
  const count = await prisma.photo.count();

  // Upload to Vercel Blob
  const blob = await put(`photos/${file.name}`, file, { access: 'public' });

  return await prisma.photo.create({
    data: {
      url: blob.url,
      order: count
    }
  });
}

export async function deletePhoto(id: string, url: string) {
  await requireAdmin();

  try {
    // Supprimer du cloud
    await del(url);
  } catch (e) {
    console.error("Failed to delete blob:", e);
  }

  // Supprimer de la BDD
  return await prisma.photo.delete({
    where: { id }
  });
}

export async function reorderPhotos(photos: { id: string; order: number }[]) {
  await requireAdmin();
  
  const parsed = reorderSchema.parse(photos);
  
  // Exécuter en transaction
  await prisma.$transaction(
    parsed.map(photo => 
      prisma.photo.update({
        where: { id: photo.id },
        data: { order: photo.order }
      })
    )
  );
}
