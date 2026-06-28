import { getTranslations } from 'next-intl/server';
import { getPastSeasons } from '@/app/actions/seasons';

export const revalidate = 3600;

export default async function SeasonsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Navigation');
  const seasons = await getPastSeasons();

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-[0.2em] mb-4 uppercase">
          {t('seasons') || 'Saisons Passées'}
        </h1>
        <div className="w-24 h-[1px] bg-gold mb-16"></div>

        <div className="space-y-12">
          {seasons.map((season: any) => {
            const title = season[`title_${locale}`] || season.title_fr;
            const desc = season[`desc_${locale}`] || season.desc_fr;

            return (
              <article key={season.id} className="relative pl-8 md:pl-0">
                {/* Timeline Line (Mobile) */}
                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-white/10 md:hidden"></div>
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative group">
                  
                  {/* Timeline Dot (Mobile) */}
                  <div className="absolute -left-10 top-2.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-gold md:hidden z-10"></div>

                  {/* Year Column */}
                  <div className="md:w-1/4 flex-shrink-0 pt-1">
                    <h2 className="text-gold font-mono text-2xl font-light tracking-widest sticky top-32 transition-transform duration-500 group-hover:translate-x-2">
                      {season.year}
                    </h2>
                  </div>

                  {/* Content Column */}
                  <div className="md:w-3/4 pb-12 md:border-l md:border-white/10 md:pl-12 group-hover:border-gold/50 transition-colors duration-500">
                    {/* Timeline Dot (Desktop) */}
                    <div className="hidden md:block absolute left-[25%] -translate-x-[8px] top-4 w-4 h-4 rounded-full bg-[#050505] border-2 border-gold group-hover:bg-gold transition-colors duration-500 z-10"></div>
                    
                    <h3 className="font-serif text-2xl font-bold text-white mb-6 tracking-wide">
                      {title}
                    </h3>
                    <div className="prose prose-invert prose-p:font-light prose-p:text-gray-400 max-w-none whitespace-pre-wrap">
                      <p>{desc}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {seasons.length === 0 && (
            <p className="text-gray-500 italic font-light">Les archives des saisons passées seront bientôt disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
