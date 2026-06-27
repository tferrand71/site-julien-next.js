'use client';

import { motion } from 'framer-motion';

export default function MusicalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      
      {/* --- Effets de flou (Glowing Blobs) --- */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.15, 0.25, 0.15] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gold/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          x: [0, -60, 0],
          y: [0, 40, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-red-dark/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] mix-blend-screen"
      />

      {/* --- Formes Hasardeuses SVG (Organic Lines) --- */}
      <motion.svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[20%] right-[15%] w-[40vw] max-w-[500px] text-gold/10 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,72.6,41.1C63.8,53.1,51.8,62.5,38.5,69.5C25.2,76.5,10.6,81.1,-3.8,88.4C-18.2,95.7,-36.4,105.7,-51.1,100.8C-65.8,95.9,-77,76,-85.2,56.5C-93.4,37,-98.6,18.5,-96.5,1.2C-94.4,-16.1,-85,-32.2,-74.6,-46C-64.2,-59.8,-52.8,-71.3,-39.1,-78.9C-25.4,-86.5,-9.4,-90.2,4.8,-98.5C19,-106.8,38,-119.6,44.7,-76.4Z" transform="translate(100 100)" />
      </motion.svg>

      <motion.svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[20%] left-[10%] w-[50vw] max-w-[600px] text-white/5 opacity-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      >
        <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M41.5,-73.4C54.8,-66.1,67.3,-56.3,76.3,-43.8C85.3,-31.3,90.8,-15.7,89.5,-0.7C88.2,14.2,80.1,28.4,70.6,40.6C61.1,52.8,50.2,63,37.3,71.1C24.4,79.2,9.5,85.2,-5.7,86.6C-20.9,88,-36.4,84.8,-49.6,76.8C-62.8,68.8,-73.7,56,-80.7,41.4C-87.7,26.8,-90.8,10.4,-89.4,-5.4C-88,-21.2,-82.1,-36.4,-72.5,-48.9C-62.9,-61.4,-49.6,-71.2,-35.5,-77.8C-21.4,-84.4,-6.5,-87.8,7.9,-85.7C22.3,-83.6,44.5,-76,41.5,-73.4Z" transform="translate(100 100)" />
      </motion.svg>

      {/* --- Symboles musicaux intégrés --- */}
      <motion.svg 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 3 }}
        className="absolute left-[8%] top-[30%] h-[40vh] text-gold rotate-[-10deg]"
        viewBox="0 0 200 400"
      >
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="300" fontFamily="serif" fill="currentColor">
          &#x1D11E;
        </text>
      </motion.svg>

      <motion.svg 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute right-[8%] bottom-[20%] h-[35vh] text-gold rotate-[10deg]"
        viewBox="0 0 200 400"
      >
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="250" fontFamily="serif" fill="currentColor">
          &#x1D122;
        </text>
      </motion.svg>
      
      {/* Baguettes abstraites intégrées */}
      <motion.svg 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-2xl text-white"
        viewBox="0 0 400 400"
      >
        <g stroke="currentColor" strokeLinecap="round">
          <line x1="100" y1="300" x2="300" y2="100" strokeWidth="1" />
          <line x1="300" y1="300" x2="100" y2="100" strokeWidth="1" />
        </g>
      </motion.svg>

    </div>
  );
}
