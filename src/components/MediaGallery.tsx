'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
};

function VideoPlayer({ video }: { video: VideoItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className="w-full h-full relative group cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          className="w-full h-full absolute inset-0 z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <Image 
            src={video.thumbnail} 
            alt={video.title} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            {/* Play Button Icon */}
            <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center text-black backdrop-blur-sm group-hover:scale-110 group-hover:bg-gold transition-all duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pt-12">
            <h3 className="text-white font-serif text-lg line-clamp-2 leading-tight">{video.title}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default function MediaGallery({ videos }: { videos: VideoItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6 } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-8"
    >
      {videos.map((video) => (
        <motion.div 
          key={video.id}
          variants={itemVariants}
          className="group relative aspect-video bg-black/50 border border-white/10 overflow-hidden hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500"
        >
          <VideoPlayer video={video} />
        </motion.div>
      ))}
      
      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 text-center">
          <p className="text-gray-400 font-light italic mb-4">
            {tMedia('empty')}
          </p>
        </div>)}
    </motion.div>
  );
}
