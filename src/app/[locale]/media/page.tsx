import { getTranslations } from 'next-intl/server';
import MediaGallery, { VideoItem } from '@/components/MediaGallery';
import { getVideoConfigs, getYouTubeVideos } from '@/app/actions/media';

export default async function MediaPage() {
  const t = await getTranslations('Media');
  let videos = await getYouTubeVideos();
  const configs = await getVideoConfigs();

  // Merge videos with config
  const videosWithOrder = videos.map((v: any, i: number) => {
    const config = configs.find((c: any) => c.youtubeId === v.id);
    return { ...v, _order: config?.order || 0, _originalIndex: i, _isHidden: config?.isHidden || false };
  });

  // Filter and sort
  videos = videosWithOrder
    .filter((v: any) => !v._isHidden)
    .sort((a: any, b: any) => {
      if (a._order !== b._order) return a._order - b._order;
      return a._originalIndex - b._originalIndex;
    })
    .map(({ _order, _originalIndex, _isHidden, ...v }: any) => v);

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
