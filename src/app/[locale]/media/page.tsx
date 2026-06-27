import { getTranslations } from 'next-intl/server';
import MediaGallery, { VideoItem } from '@/components/MediaGallery';

async function getYouTubeVideos(): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  // YouTube Channel ID: UCXRy-PANUy0MjohzMk6s6Bg
  // The 'Uploads' playlist ID is the Channel ID with UU instead of UC
  const playlistId = 'UUXRy-PANUy0MjohzMk6s6Bg';
  
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) {
      console.error('YouTube API Error:', await res.text());
      return [];
    }
    
    const data = await res.json();
    
    if (!data.items) return [];

    const allVideos = data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || ''
    }));

    // Exclure les 3 vidéos les plus anciennes (situées à la fin du tableau puisque le tri par défaut est du plus récent au plus ancien)
    return allVideos.slice(0, -3);
    
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    return [];
  }
}

export default async function MediaPage() {
  const t = await getTranslations('Media');
  const videos = await getYouTubeVideos();

  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-6xl pb-24 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest mb-6">{t('title')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <MediaGallery videos={videos} />
      </div>
    </main>
  );
}
