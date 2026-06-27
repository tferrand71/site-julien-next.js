import { getEvents } from '@/app/actions/events';
import { getTranslations } from 'next-intl/server';
import EventsList from './EventsList';

export const dynamic = 'force-dynamic';

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Events');
  const events = await getEvents();

  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <div className="text-center mb-20">
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest mb-6">{t('title')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <EventsList events={events} locale={locale} />
      </div>
    </main>
  );
}
