'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const ProjectSchema = z.object({
  status: z.enum(['CURRENT', 'PAST']).optional(),
  title_fr: z.string().min(1).max(300),
  title_en: z.string().min(1).max(300),
  title_de: z.string().min(1).max(300),
  title_es: z.string().min(1).max(300),
  desc_fr: z.string().max(5000),
  desc_en: z.string().max(5000),
  desc_de: z.string().max(5000),
  desc_es: z.string().max(5000),
});

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function addProject(formData: FormData) {
  await requireAdmin();

  const rawData = {
    status: formData.get('status') as string || 'CURRENT',
    title_fr: formData.get('title_fr') as string,
    title_en: formData.get('title_en') as string,
    title_de: formData.get('title_de') as string,
    title_es: formData.get('title_es') as string,
    desc_fr: formData.get('desc_fr') as string,
    desc_en: formData.get('desc_en') as string,
    desc_de: formData.get('desc_de') as string,
    desc_es: formData.get('desc_es') as string,
  };

  const validated = ProjectSchema.parse(rawData);

  // Handle image upload via Vercel Blob
  const imageFile = formData.get('image') as File | null;
  let imageData: string | null = null;

  if (imageFile && imageFile.size > 0) {
    // Validate file size (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error('Image too large (max 5MB)');
    }
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error('Invalid image type. Allowed: JPEG, PNG, WebP, GIF');
    }

    const filename = `project-${Date.now()}.${imageFile.name.split('.').pop()}`;
    const blob = await put(filename, imageFile, { access: 'public' });
    imageData = blob.url;
  }

  return await prisma.project.create({
    data: {
      ...validated,
      imageData,
    }
  });
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const validatedId = z.string().uuid().parse(id);
  return await prisma.project.delete({ where: { id: validatedId } });
}
