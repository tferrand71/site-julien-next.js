import { getTranslations } from 'next-intl/server';
import { getRepertoire } from '@/app/actions/repertoire';

export const revalidate = 3600;

const CATEGORIES = [
  "Orchestre symphonique",
  "Ouvrages lyriques",
  "Pour ensembles",
  "Créations",
  "Brass Band",
  "Orchestre d'Harmonie"
];

export default async function RepertoirePage() {
  const t = await getTranslations('Navigation');
  const items = await getRepertoire();

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-[0.2em] mb-4 uppercase">
          {t('repertoire') || 'Répertoire'}
        </h1>
        <div className="w-24 h-[1px] bg-gold mb-12"></div>

        <div className="space-y-16">
          {CATEGORIES.map((cat) => {
            const catItems = items.filter(i => i.category === cat);
            if (catItems.length === 0) return null;

            const groupedByComposer = catItems.reduce((acc: Record<string, any[]>, item: any) => {
              const comp = item.composer.trim();
              if (!acc[comp]) acc[comp] = [];
              acc[comp].push(item);
              return acc;
            }, {});

            return (
              <section key={cat} className="scroll-mt-32">
                <h2 className="font-serif text-2xl tracking-widest text-gold mb-8 uppercase flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-gold/50"></span>
                  {cat}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {Object.entries(groupedByComposer).map(([composer, pieces]) => (
                    <div key={composer} className="group border-l-2 border-white/10 pl-6 hover:border-gold transition-colors duration-500">
                      <h3 className="text-white font-semibold text-lg tracking-wide group-hover:text-gold transition-colors duration-300">
                        {composer}
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {(pieces as any[]).map((item: any) => (
                          <li key={item.id} className="text-gray-400 font-light italic">
                            {item.piece}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {items.length === 0 && (
            <p className="text-gray-500 italic font-light">Le répertoire est actuellement en cours de mise à jour.</p>
          )}
        </div>
      </div>
    </div>
  );
}
