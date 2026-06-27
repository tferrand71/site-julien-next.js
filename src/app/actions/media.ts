'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getVideoConfigs() {
  return await prisma.videoConfig.findMany();
}

export async function updateVideoConfig(youtubeId: string, isHidden: boolean, order: number) {
  await prisma.videoConfig.upsert({
    where: { youtubeId },
    update: { isHidden, order },
    create: { youtubeId, isHidden, order }
  });
  revalidatePath('/', 'layout');
}

export async function updateAllVideoConfigs(configs: { youtubeId: string, isHidden: boolean, order: number }[]) {
  // We use a transaction to update all at once
  const ops = configs.map(config => 
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
