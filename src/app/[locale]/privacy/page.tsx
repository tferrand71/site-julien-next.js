'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('Privacy');
  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest mb-6 uppercase">{t('title')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12 text-gray-300 font-light leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
        >
          {t.raw('sections').map((sec: any, index: number) => (
            <section key={index}>
              <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">{sec.title}</h2>
              <div 
                className="text-gray-300 font-light leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: sec.content }} 
              />
            </section>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
