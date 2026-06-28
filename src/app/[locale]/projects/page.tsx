import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/app/actions/projects';
import Image from 'next/image';

export const revalidate = 3600;

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('Navigation');
  const projects = await getProjects();

  const statuses = [
    { key: 'CURRENT', label: 'En cours', projects: projects.filter(p => p.status === 'CURRENT') },
    { key: 'FUTURE', label: 'À venir', projects: projects.filter(p => p.status === 'FUTURE') },
    { key: 'PAST', label: 'Passés', projects: projects.filter(p => p.status === 'PAST') },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-[0.2em] mb-4 uppercase">
          {t('projects') || 'Projets'}
        </h1>
        <div className="w-24 h-[1px] bg-gold mb-16"></div>

        <div className="space-y-24">
          {statuses.map(statusGroup => {
            if (statusGroup.projects.length === 0) return null;

            return (
              <section key={statusGroup.key}>
                <h2 className="font-serif text-2xl tracking-widest text-gold mb-10 uppercase flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-gold/50"></span>
                  {statusGroup.label}
                </h2>
                
                <div className="grid grid-cols-1 gap-12">
                  {statusGroup.projects.map((project: any) => {
                    const title = project[`title_${locale}`] || project.title_fr;
                    const desc = project[`desc_${locale}`] || project.desc_fr;

                    return (
                      <div key={project.id} className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col md:flex-row hover:border-gold/30 transition-all duration-500">
                        
                        {/* Project Image */}
                        {project.imageData && (
                          <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden bg-black flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                            <Image 
                              src={project.imageData} 
                              alt={title} 
                              fill 
                              className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                              unoptimized
                            />
                          </div>
                        )}

                        {/* Project Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center relative z-20">
                          <h3 className="font-serif text-3xl font-bold tracking-wider text-white mb-6 group-hover:text-gold transition-colors duration-500">
                            {title}
                          </h3>
                          <div className="w-12 h-[1px] bg-gold/50 mb-6"></div>
                          <p className="text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
                            {desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {projects.length === 0 && (
            <p className="text-gray-500 italic font-light">Aucun projet n'est affiché pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
