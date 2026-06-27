'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function EventsList({ events, locale }: { events: any[], locale: string }) {
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

  if (events.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 font-light italic"
      >
        Aucun événement programmé pour le moment.
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {events.map((event) => {
        const title = event[`title_${locale}`] || event.title_fr;
        const desc = event[`desc_${locale}`] || event.desc_fr;
        
        return (
          <motion.div 
            key={event.id}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(197, 160, 89, 0.15)" }}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 transition-all duration-500 hover:border-gold/30 hover:bg-white/10"
          >
            {event.isUpcoming && (
              <div className="inline-block px-3 py-1 mb-4 border border-gold text-gold tracking-widest uppercase text-xs font-semibold">
                {t('upcoming')}
              </div>
            )}
            <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-gold transition-colors duration-300">{title}</h3>
            <p className="text-gold-light font-light text-lg mb-6">{event.date}</p>
            <p className="text-gray-300 font-light text-lg leading-relaxed">{desc}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
