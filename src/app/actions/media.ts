'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

const VideoConfigSchema = z.object({
  youtubeId: z.string().min(1).max(50),
  isHidden: z.boolean(),
  order: z.number().int().min(0),
});

const VideoConfigArraySchema = z.array(VideoConfigSchema);

export async function getVideoConfigs() {
  return await prisma.videoConfig.findMany();
}

export async function updateVideoConfig(youtubeId: string, isHidden: boolean, order: number) {
  await requireAdmin();
  const validated = VideoConfigSchema.parse({ youtubeId, isHidden, order });

  await prisma.videoConfig.upsert({
    where: { youtubeId: validated.youtubeId },
    update: { isHidden: validated.isHidden, order: validated.order },
    create: { youtubeId: validated.youtubeId, isHidden: validated.isHidden, order: validated.order }
  });
  revalidatePath('/', 'layout');
}

export async function updateAllVideoConfigs(configs: z.infer<typeof VideoConfigArraySchema>) {
  await requireAdmin();
  const validated = VideoConfigArraySchema.parse(configs);

  const ops = validated.map(config => 
    prisma.videoConfig.upsert({
      where: { youtubeId: config.youtubeId },
      update: { isHidden: config.isHidden, order: config.order },
      create: { youtubeId: config.youtubeId, isHidden: config.isHidden, order: config.order }
    })
  );
  
  await prisma.$transaction(ops);
  revalidatePath('/', 'layout');
}

export async function getYouTubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const playlistId = 'UUXRy-PANUy0MjohzMk6s6Bg';
  
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!data.items) return [];

    const allVideos = data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || ''
    }));

    return allVideos.slice(0, -3);
  } catch (error) {
    return [];
  }
}
