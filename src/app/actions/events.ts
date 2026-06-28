'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const EventSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  location: z.string().max(500).nullable().optional(),
  isUpcoming: z.boolean().optional(),
  title_fr: z.string().min(1).max(300),
  title_en: z.string().min(1).max(300),
  title_de: z.string().min(1).max(300),
  title_es: z.string().min(1).max(300),
  desc_fr: z.string().max(2000),
  desc_en: z.string().max(2000),
  desc_de: z.string().max(2000),
  desc_es: z.string().max(2000),
});

const EventUpdateSchema = EventSchema.partial();

export async function getEvents() {
  return await prisma.event.findMany({ orderBy: { startDate: 'asc' } });
}

export async function addEvent(data: z.infer<typeof EventSchema>) {
  await requireAdmin();
  const validated = EventSchema.parse(data);
  await prisma.event.create({ data: validated });
  revalidatePath('/', 'layout');
}

export async function updateEvent(id: string, data: z.infer<typeof EventUpdateSchema>) {
  await requireAdmin();
  const validatedId = z.string().uuid().parse(id);
  const validated = EventUpdateSchema.parse(data);
  await prisma.event.update({ where: { id: validatedId }, data: validated });
  revalidatePath('/', 'layout');
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  const validatedId = z.string().uuid().parse(id);
  await prisma.event.delete({ where: { id: validatedId } });
  revalidatePath('/', 'layout');
}
