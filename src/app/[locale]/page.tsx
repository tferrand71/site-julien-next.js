import Hero from '@/components/Hero';
import HomePreview from '@/components/HomePreview';
import { getHeroContent } from '@/app/actions/hero';
import { getEvents } from '@/app/actions/events';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getHeroContent();
  const events = await getEvents();
  
  const title = (content as any)[`title_${locale}`] || 'CHEF D\'ORCHESTRE';
  const subtitle = (content as any)[`subtitle_${locale}`] || 'Tromboniste & Pédagogue';
  
  const nextEvent = events.find(e => e.isUpcoming) || null;

  return (
    <main className="min-h-screen flex flex-col">
      <Hero title={title} subtitle={subtitle} />
      <HomePreview nextEvent={nextEvent} locale={locale} />
    </main>
  );
}
