import Hero from '@/components/Hero';
import HomePreview from '@/components/HomePreview';
import { getHeroContent } from '@/app/actions/hero';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getHeroContent();
  
  const title = (content as any)[`title_${locale}`] || 'CHEF D\'ORCHESTRE';
  const subtitle = (content as any)[`subtitle_${locale}`] || 'Tromboniste & Pédagogue';

  return (
    <main className="min-h-screen flex flex-col">
      <Hero title={title} subtitle={subtitle} />
      <HomePreview />
    </main>
  );
}
