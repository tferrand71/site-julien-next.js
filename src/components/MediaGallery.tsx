'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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

export default function MediaGallery({ videos, photos }: { videos: VideoItem[], photos: any[] }) {
  const tMedia = useTranslations('Media');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
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
    <div className="space-y-32">
      
      {/* SECTION VIDEOS */}
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-widest uppercase mb-10 text-white flex items-center gap-4">
          <span className="w-12 h-[1px] bg-gold"></span>
          Vidéos
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 text-center">
              <p className="text-gray-400 font-light italic mb-4">
                {tMedia('empty') || "Aucune vidéo pour le moment."}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* SECTION PHOTOS */}
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-widest uppercase mb-10 text-white flex items-center gap-4">
          <span className="w-12 h-[1px] bg-gold"></span>
          Photographies
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
        >
          {photos.map((photo) => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              onClick={() => setSelectedPhoto(photo.url)}
              className="group relative aspect-square bg-black/50 border border-white/10 overflow-hidden hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 cursor-pointer"
            >
              <Image 
                src={photo.url} 
                alt="Galerie Photo" 
                fill 
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                unoptimized
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 p-3 rounded-full backdrop-blur-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
          
          {photos.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 text-center">
              <p className="text-gray-400 font-light italic mb-4">
                Aucune photo pour le moment.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* LIGHTBOX FOR PHOTOS */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
              <Image 
                src={selectedPhoto} 
                alt="Photo agrandie" 
                fill 
                className="object-contain" 
                unoptimized
              />
            </div>
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
