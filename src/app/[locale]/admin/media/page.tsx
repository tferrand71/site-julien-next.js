'use client';

import { useState, useEffect } from 'react';
import { getYouTubeVideos, getVideoConfigs, updateAllVideoConfigs } from '@/app/actions/media';
import Image from 'next/image';

export default function AdminMediaPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const ytVideos = await getYouTubeVideos();
    const configs = await getVideoConfigs();
    
    // Si la clé API n'est pas définie, ytVideos sera vide
    if (!ytVideos || ytVideos.length === 0) {
      setVideos([]);
      setLoading(false);
      return;
    }

    const merged = ytVideos.map((v: any, i: number) => {
      const config = configs.find((c: any) => c.youtubeId === v.id);
      return { 
        ...v, 
        isHidden: config?.isHidden || false,
        order: config?.order || i,
      };
    });

    merged.sort((a: any, b: any) => a.order - b.order);
    setVideos(merged);
    setLoading(false);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[index - 1];
    newVideos[index - 1] = temp;
    
    // Reassign orders sequentially to ensure exact matching
    newVideos.forEach((v, i) => v.order = i);
    setVideos(newVideos);
  };

  const handleMoveDown = (index: number) => {
    if (index === videos.length - 1) return;
    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[index + 1];
    newVideos[index + 1] = temp;
    
    // Reassign orders sequentially
    newVideos.forEach((v, i) => v.order = i);
    setVideos(newVideos);
  };

  const toggleHidden = (id: string) => {
    setVideos(videos.map(v => v.id === id ? { ...v, isHidden: !v.isHidden } : v));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const configsToSave = videos.map(v => ({
        youtubeId: v.id,
        isHidden: v.isHidden,
        order: v.order
      }));
      await updateAllVideoConfigs(configsToSave);
      alert('Modifications sauvegardées avec succès !');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la sauvegarde.');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-gold mt-10">Chargement des vidéos depuis YouTube...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Média (Vidéos)</h1>
          <p className="text-gray-400 font-light">Gérez l'ordre et la visibilité de vos vidéos YouTube sur le site.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-gold hover:bg-gold-light text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm disabled:opacity-50 transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="bg-[#111] border border-white/5 p-8 text-center">
          <p className="text-gray-500 italic mb-4">Aucune vidéo trouvée.</p>
          <p className="text-sm text-gray-400">Vérifiez que la variable d'environnement YOUTUBE_API_KEY est bien configurée.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={`bg-[#111] border p-4 flex items-center gap-6 transition-all ${
                video.isHidden ? 'border-red-900/50 opacity-60' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Controls */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Monter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleMoveDown(index)}
                  disabled={index === videos.length - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Descendre"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail */}
              <div className="relative w-32 aspect-video bg-black flex-shrink-0">
                <Image 
                  src={video.thumbnail} 
                  alt={video.title} 
                  fill 
                  className="object-cover"
                  sizes="128px"
                  unoptimized // YouTube thumbnails are already optimized and sometimes block next/image without domain config
                />
              </div>

              {/* Title */}
              <div className="flex-grow">
                <h3 className={`font-serif text-lg ${video.isHidden ? 'text-gray-500 line-through' : 'text-white'}`}>
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 font-mono">ID: {video.id}</p>
              </div>

              {/* Visibility Toggle */}
              <button 
                onClick={() => toggleHidden(video.id)}
                className={`flex items-center gap-2 px-4 py-2 border text-sm tracking-widest uppercase transition-colors ${
                  video.isHidden 
                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                    : 'border-white/20 text-gray-300 hover:bg-white/5'
                }`}
              >
                {video.isHidden ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    Cachée
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Visible
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
