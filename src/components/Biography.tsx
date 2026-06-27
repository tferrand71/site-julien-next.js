'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Biography({ title, content, cvUrl, bioUrl }: { title: string, content: string, cvUrl: string, bioUrl: string }) {
  const t = useTranslations('Biography');

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={paragraphVariants}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-widest mb-6">{title}</h2>
          <div className="w-16 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <div className="space-y-12 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((text, index) => (
              <motion.p 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={paragraphVariants}
                className={index === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-4 first-letter:mt-2" : ""}
              >
                {text}
              </motion.p>
            ))
          ) : (
            <p className="text-center italic text-gray-500">Biographie en cours de rédaction...</p>
          )}
        </div>

        {/* Espace Téléchargements / Press Kit */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={paragraphVariants}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-gold mb-4 uppercase">
              {t('download_title')}
            </h3>
            <p className="text-gray-400 font-light max-w-xl mx-auto">
              Documents professionnels en libre accès.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={bioUrl} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/5 border border-white/20 px-8 py-4 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold group-hover:-translate-y-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="text-white font-light tracking-widest uppercase text-sm">{t('download_bio')}</span>
            </a>

            <a 
              href={cvUrl} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/5 border border-white/20 px-8 py-4 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold group-hover:-translate-y-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-white font-light tracking-widest uppercase text-sm">{t('download_cv')}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
