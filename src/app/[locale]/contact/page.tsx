'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest mb-6">{t('title')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-16 px-8 border border-white/10 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm hover:border-gold/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(197,160,89,0.15)] transition-all duration-700 group"
        >
          <p className="text-gray-300 font-light mb-10 text-xl leading-relaxed">{t('description')}</p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${t('email')}`} 
            className="inline-block text-2xl md:text-3xl font-light text-gold group-hover:text-gold-light transition-colors duration-300 tracking-wide border-b border-transparent group-hover:border-gold-light pb-1"
          >
            {t('email')}
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}
