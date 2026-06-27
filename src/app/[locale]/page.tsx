import Hero from '@/components/Hero';
import HomePreview from '@/components/HomePreview';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <HomePreview />
    </main>
  );
}
