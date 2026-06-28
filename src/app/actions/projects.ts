'use server';

import { prisma } from '@/lib/prisma';

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function addProject(data: any) {
  return await prisma.project.create({ data });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({ where: { id } });
}
