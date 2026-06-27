'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getEvents() {
  return await prisma.event.findMany({ orderBy: { startDate: 'asc' } });
}

export async function addEvent(data: any) {
  await prisma.event.create({ data });
  revalidatePath('/', 'layout');
}

export async function updateEvent(id: string, data: any) {
  await prisma.event.update({ where: { id }, data });
  revalidatePath('/', 'layout');
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath('/', 'layout');
}
