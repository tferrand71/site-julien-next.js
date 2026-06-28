'use client';

import { useState, useEffect } from 'react';
import { getYouTubeVideos, getVideoConfigs, updateAllVideoConfigs } from '@/app/actions/media';
import { getPhotos, addPhoto, deletePhoto, reorderPhotos } from '@/app/actions/photos';
import Image from 'next/image';

export default function AdminMediaPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');

  // --- VIDEOS STATE ---
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [savingVideos, setSavingVideos] = useState(false);

  // --- PHOTOS STATE ---
  const [photos, setPhotos] = useState<any[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
    loadPhotos();
  }, []);

  // --- VIDEOS LOGIC ---
  const loadVideos = async () => {
    setLoadingVideos(true);
    const ytVideos = await getYouTubeVideos();
    const configs = await getVideoConfigs();
    
    if (!ytVideos || ytVideos.length === 0) {
      setVideos([]);
      setLoadingVideos(false);
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
    setLoadingVideos(false);
  };

  const handleVideoMoveUp = (index: number) => {
    if (index === 0) return;
    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[index - 1];
    newVideos[index - 1] = temp;
    newVideos.forEach((v, i) => v.order = i);
    setVideos(newVideos);
  };

  const handleVideoMoveDown = (index: number) => {
    if (index === videos.length - 1) return;
    const newVideos = [...videos];
    const temp = newVideos[index];
    newVideos[index] = newVideos[index + 1];
    newVideos[index + 1] = temp;
    newVideos.forEach((v, i) => v.order = i);
    setVideos(newVideos);
  };

  const toggleVideoHidden = (id: string) => {
    setVideos(videos.map(v => v.id === id ? { ...v, isHidden: !v.isHidden } : v));
  };

  const handleSaveVideos = async () => {
    setSavingVideos(true);
    try {
      const configsToSave = videos.map(v => ({
        youtubeId: v.id,
        isHidden: v.isHidden,
        order: v.order
      }));
      await updateAllVideoConfigs(configsToSave);
      alert('Vidéos sauvegardées avec succès !');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la sauvegarde.');
    }
    setSavingVideos(false);
  };

  // --- PHOTOS LOGIC ---
  const loadPhotos = async () => {
    setLoadingPhotos(true);
    const data = await getPhotos();
    setPhotos(data);
    setLoadingPhotos(false);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', photoFile);
      await addPhoto(formData);
      setPhotoFile(null);
      setPreviewUrl(null);
      const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      await loadPhotos();
    } catch (e) {
      alert("Erreur lors de l'upload");
    }
    setUploading(false);
  };

  const handleDeletePhoto = async (id: string, url: string) => {
    if (confirm("Supprimer définitivement cette photo ?")) {
      await deletePhoto(id, url);
      await loadPhotos();
    }
  };

  const handlePhotoMoveUp = async (index: number) => {
    if (index === 0) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[index - 1];
    newPhotos[index - 1] = temp;
    newPhotos.forEach((p, i) => p.order = i);
    setPhotos(newPhotos);
    await reorderPhotos(newPhotos.map(p => ({ id: p.id, order: p.order })));
  };

  const handlePhotoMoveDown = async (index: number) => {
    if (index === photos.length - 1) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[index + 1];
    newPhotos[index + 1] = temp;
    newPhotos.forEach((p, i) => p.order = i);
    setPhotos(newPhotos);
    await reorderPhotos(newPhotos.map(p => ({ id: p.id, order: p.order })));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Médias</h1>
          <p className="text-gray-400 font-light">Gérez vos vidéos YouTube et votre galerie photos.</p>
        </div>
        
        {/* TABS */}
        <div className="flex border border-white/10 rounded overflow-hidden">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 font-semibold tracking-widest uppercase text-xs transition-colors ${activeTab === 'videos' ? 'bg-gold text-black' : 'bg-[#111] text-gray-400 hover:text-white'}`}
          >
            Vidéos
          </button>
          <button 
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-3 font-semibold tracking-widest uppercase text-xs transition-colors ${activeTab === 'photos' ? 'bg-gold text-black' : 'bg-[#111] text-gray-400 hover:text-white'}`}
          >
            Photos
          </button>
        </div>
      </div>

      {/* --- VIDEOS TAB --- */}
      {activeTab === 'videos' && (
        <div className="animate-in fade-in duration-500">
          <div className="flex justify-end mb-6">
            <button 
              onClick={handleSaveVideos}
              disabled={savingVideos}
              className="bg-gold hover:bg-gold-light text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm disabled:opacity-50 transition-colors"
            >
              {savingVideos ? 'Sauvegarde...' : 'Enregistrer les vidéos'}
            </button>
          </div>

          {loadingVideos ? (
            <div className="text-gold">Chargement des vidéos...</div>
          ) : videos.length === 0 ? (
            <div className="bg-[#111] border border-white/5 p-8 text-center">
              <p className="text-gray-500 italic mb-4">Aucune vidéo trouvée.</p>
              <p className="text-sm text-gray-400">Vérifiez que la variable d'environnement YOUTUBE_API_KEY est bien configurée.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video, index) => (
                <div key={video.id} className={`bg-[#111] border p-4 flex flex-col sm:flex-row items-center gap-6 transition-all ${video.isHidden ? 'border-red-900/50 opacity-60' : 'border-white/10 hover:border-white/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleVideoMoveUp(index)} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30 p-1 bg-white/5 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                      </button>
                      <button onClick={() => handleVideoMoveDown(index)} disabled={index === videos.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30 p-1 bg-white/5 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                      </button>
                    </div>
                    <div className="relative w-32 aspect-video bg-black flex-shrink-0">
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="128px" unoptimized />
                    </div>
                  </div>
                  <div className="flex-grow w-full text-center sm:text-left">
                    <h3 className={`font-serif text-lg leading-tight ${video.isHidden ? 'text-gray-500 line-through' : 'text-white'}`}>{video.title}</h3>
                  </div>
                  <button onClick={() => toggleVideoHidden(video.id)} className={`px-4 py-2 border text-sm tracking-widest uppercase w-full sm:w-auto ${video.isHidden ? 'border-red-500/30 text-red-400' : 'border-white/20 text-gray-300'}`}>
                    {video.isHidden ? 'Cachée' : 'Visible'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- PHOTOS TAB --- */}
      {activeTab === 'photos' && (
        <div className="animate-in fade-in duration-500">
          
          <div className="bg-[#111] border border-white/5 p-6 mb-8 flex flex-col sm:flex-row gap-6 items-end">
            <div className="flex-grow w-full">
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Ajouter une nouvelle photo</label>
              <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoSelect} className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
            </div>
            {previewUrl && (
              <div className="relative w-32 h-20 bg-black flex-shrink-0">
                <Image src={previewUrl} alt="Aperçu" fill className="object-cover" />
              </div>
            )}
            <button 
              onClick={handleUploadPhoto}
              disabled={!photoFile || uploading}
              className="bg-gold text-black px-6 py-2.5 font-semibold tracking-widest uppercase text-sm disabled:opacity-50 w-full sm:w-auto"
            >
              {uploading ? 'Upload...' : 'Uploader'}
            </button>
          </div>

          {loadingPhotos ? (
            <div className="text-gold">Chargement des photos...</div>
          ) : photos.length === 0 ? (
            <p className="text-gray-500 italic">Aucune photo dans la galerie.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div key={photo.id} className="bg-[#111] border border-white/10 group">
                  <div className="relative aspect-square w-full bg-black">
                    <Image src={photo.url} alt="Galerie" fill className="object-cover" unoptimized />
                    
                    {/* Controls Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="flex justify-between">
                        <button onClick={() => handlePhotoMoveUp(index)} disabled={index === 0} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded disabled:opacity-30">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        </button>
                        <button onClick={() => handlePhotoMoveDown(index)} disabled={index === photos.length - 1} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded disabled:opacity-30">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </button>
                      </div>
                      <button onClick={() => handleDeletePhoto(photo.id, photo.url)} className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 text-xs tracking-widest uppercase font-semibold">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
