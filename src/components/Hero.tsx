'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ title, subtitle }: { title: string, subtitle: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background decoration */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-64 w-96 h-96 bg-gold/10 rounded-full blur-3xl mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-red-dark/15 rounded-full blur-3xl mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1 flex flex-col justify-center space-y-8 text-center md:text-left"
        >
          <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-wide">
            JULIEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold-light">JACQUEMART</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-gray-300">
            {title}
          </motion.h2>
          
          <motion.div variants={itemVariants} className="w-24 h-[2px] bg-red-dark mx-auto md:mx-0"></motion.div>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto md:mx-0 leading-relaxed">
            {subtitle}
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-[450px] md:h-[600px] group">
            {/* Artistic border */}
            <div className="absolute inset-0 border border-gold/30 translate-x-4 translate-y-4 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700 ease-out z-0"></div>
            
            {/* Image container */}
            <div className="absolute inset-0 z-10 overflow-hidden bg-black/50 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <Image 
                  src="/photo.jpg" 
                  alt="Julien Jacquemart Portrait" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center grayscale-[30%] hover:grayscale-0 transition-all duration-700 ease-in-out"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
