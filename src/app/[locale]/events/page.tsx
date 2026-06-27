'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function EventsPage() {
  const t = useTranslations('Events');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-widest mb-6">{t('title')}</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {[1, 2].map((i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(197, 160, 89, 0.15)" }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 transition-all duration-500 hover:border-gold/30 hover:bg-white/10"
            >
              {i === 1 && (
                <div className="inline-block px-3 py-1 mb-4 border border-gold text-gold tracking-widest uppercase text-xs font-semibold">
                  {t('upcoming')}
                </div>
              )}
              <h3 className="font-serif text-3xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300">{t(`event${i}_title` as any)}</h3>
              <p className="text-gold-light font-light text-lg mb-6">{t(`event${i}_date` as any)}</p>
              <p className="text-gray-300 font-light text-lg leading-relaxed">{t(`event${i}_desc` as any)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
