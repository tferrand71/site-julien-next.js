'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function HomePreview({ nextEvent, locale }: { nextEvent?: any, locale?: string }) {
  const tBio = useTranslations('Biography');
  const tEvents = useTranslations('Events');

  const eventTitle = nextEvent && locale ? nextEvent[`title_${locale}`] : tEvents('event1_title');
  const eventDate = nextEvent ? nextEvent.date : tEvents('event1_date');
  const eventDesc = nextEvent && locale ? nextEvent[`desc_${locale}`] : tEvents('event1_desc');

  return (
    <section className="py-24 relative z-10 container mx-auto px-4 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-20">
        
        {/* Biography Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold"></div>
            <h2 className="font-serif text-3xl font-bold tracking-widest uppercase">{tBio('title')}</h2>
          </div>
          
          <p className="text-gray-300 font-light leading-relaxed text-lg line-clamp-6 text-justify md:text-left">
            {tBio('p1')}
          </p>
          
          <div className="pt-4 flex justify-center md:justify-start">
            <Link 
              href="/biography" 
              className="inline-block px-8 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-500 font-light tracking-widest uppercase text-sm"
            >
              {tBio('read_more')}
            </Link>
          </div>
        </motion.div>

        {/* Agenda Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold"></div>
            <h2 className="font-serif text-3xl font-bold tracking-widest uppercase">{tEvents('title')}</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full group-hover:bg-gold/20 transition-colors duration-500"></div>
            <div className="text-gold tracking-widest uppercase text-xs font-semibold mb-4 relative z-10">
              {tEvents('upcoming')}
            </div>
            <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-gold transition-colors relative z-10">{eventTitle}</h3>
            <p className="text-gold-light font-light mb-4 relative z-10">{eventDate}</p>
            <p className="text-gray-400 font-light line-clamp-2 relative z-10">{eventDesc}</p>
          </div>
          
          <div className="pt-4 flex justify-center md:justify-start">
            <Link 
              href="/events" 
              className="inline-block px-8 py-3 border border-white/20 text-white hover:border-white transition-all duration-500 font-light tracking-widest uppercase text-sm"
            >
              {tEvents('view_all')}
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
