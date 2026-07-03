'use client';

import { useState, useEffect } from 'react';
import { getHeroContent, updateHeroContent, uploadHeroPhoto } from '@/app/actions/hero';
import Image from 'next/image';

export default function AdminHeroPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;
    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('image', photoFile);
      const url = await uploadHeroPhoto(formData);
      setData({ ...data, photoUrl: url });
      setPhotoFile(null);
      alert('Photo uploadée avec succès ! N\'oubliez pas de sauvegarder en bas de page.');
    } catch (e) {
      alert("Erreur lors de l'upload de la photo");
    }
    setUploadingPhoto(false);
  };

  useEffect(() => {
    getHeroContent().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (autoTranslate) {
        const { translateText } = await import('@/app/actions/translate');
        
        // Auto-translate title
        const title_en = await translateText(data.title_fr, 'en');
        const title_de = await translateText(data.title_fr, 'de');
        const title_es = await translateText(data.title_fr, 'es');
        
        // Auto-translate subtitle
        const subtitle_en = await translateText(data.subtitle_fr, 'en');
        const subtitle_de = await translateText(data.subtitle_fr, 'de');
        const subtitle_es = await translateText(data.subtitle_fr, 'es');

        // Auto-translate quote
        const quote_en = data.quote_fr ? await translateText(data.quote_fr, 'en') : '';
        const quote_de = data.quote_fr ? await translateText(data.quote_fr, 'de') : '';
        const quote_es = data.quote_fr ? await translateText(data.quote_fr, 'es') : '';
        
        const newData = { 
          ...data, 
          title_en, title_de, title_es,
          subtitle_en, subtitle_de, subtitle_es,
          quote_en, quote_de, quote_es
        };
        
        setData(newData);
        await updateHeroContent(newData);
        alert('Textes traduits automatiquement et sauvegardés avec succès !');
      } else {
        await updateHeroContent(data);
        alert('Modifications sauvegardées avec succès sans traduction automatique !');
      }
    } catch (error) {
      alert("Erreur lors de la traduction ou de la sauvegarde.");
    }
    setSaving(false);
  };

  const handleTranslate = async () => {
    if (!data.title_fr || !data.subtitle_fr) return alert('Le texte en français est vide.');
    setTranslating(true);
    try {
      const { translateText } = await import('@/app/actions/translate');
      const translatedTitle = await translateText(data.title_fr, activeTab);
      const translatedSubtitle = await translateText(data.subtitle_fr, activeTab);
      const translatedQuote = data.quote_fr ? await translateText(data.quote_fr, activeTab) : '';
      setData({ 
        ...data, 
        [`title_${activeTab}`]: translatedTitle,
        [`subtitle_${activeTab}`]: translatedSubtitle,
        [`quote_${activeTab}`]: translatedQuote
      });
    } catch (error) {
      alert("Erreur de traduction. Vérifiez la clé API.");
    }
    setTranslating(false);
  };

  if (loading) return <div className="text-gold">Chargement...</div>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Accueil & Paramètres</h1>
      <p className="text-gray-400 font-light mb-10">Modifiez le titre, le sous-titre, la photo principale et la citation du pied de page.</p>

      {/* --- PHOTO SECTION --- */}
      <div className="bg-[#111] border border-white/5 p-8 mb-8">
        <h2 className="text-xl font-serif text-white mb-6">Photo principale</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative w-40 h-40 bg-black flex-shrink-0 border border-white/10">
            {(previewUrl || data?.photoUrl || true) && (
              <Image src={previewUrl || data?.photoUrl || '/photo.jpg'} alt="Aperçu Hero" fill className="object-cover" unoptimized />
            )}
          </div>
          <div className="flex-grow w-full">
            <input type="file" accept="image/*" onChange={handlePhotoSelect} className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 mb-4" />
            <button 
              onClick={handleUploadPhoto}
              disabled={!photoFile || uploadingPhoto}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 font-semibold tracking-widest uppercase text-sm disabled:opacity-50 transition-colors"
            >
              {uploadingPhoto ? 'Upload...' : 'Changer la photo'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div className="flex gap-4">
          {['fr', 'en', 'de', 'es'].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 font-light tracking-widest uppercase text-sm transition-colors ${
                activeTab === lang ? 'text-gold border-b-2 border-gold' : 'text-gray-500 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Français' : lang === 'en' ? 'Anglais' : lang === 'de' ? 'Allemand' : 'Espagnol'}
            </button>
          ))}
        </div>
        {activeTab !== 'fr' && (
          <button
            onClick={handleTranslate}
            disabled={translating}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {translating ? 'Traduction...' : 'Traduire depuis FR'}
          </button>
        )}
      </div>

      <div className="space-y-8 bg-[#111] border border-white/5 p-8">
        <div>
          <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Titre principal</label>
          <input
            type="text"
            value={data[`title_${activeTab}`]}
            onChange={(e) => setData({ ...data, [`title_${activeTab}`]: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div>
          <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Sous-titre (Description)</label>
          <textarea 
            value={data[`subtitle_${activeTab}`] || ''} 
            onChange={(e) => setData({ ...data, [`subtitle_${activeTab}`]: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 text-gray-300 px-4 py-3 focus:outline-none focus:border-gold transition-colors font-light"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Citation (Pied de page)</label>
          <input
            type="text"
            value={data[`quote_${activeTab}`] || ''}
            onChange={(e) => setData({ ...data, [`quote_${activeTab}`]: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors font-light"
          />
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <h2 className="text-lg font-serif text-white mb-6">Paramètres de la citation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Auteur de la citation</label>
              <input
                type="text"
                value={data.quoteAuthor || ''}
                onChange={(e) => setData({ ...data, quoteAuthor: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={data.quoteEnabled ?? true} 
                  onChange={(e) => setData({ ...data, quoteEnabled: e.target.checked })}
                  className="accent-gold w-5 h-5"
                />
                Afficher la citation dans le pied de page
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t border-white/10">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoTranslate} 
              onChange={(e) => setAutoTranslate(e.target.checked)}
              className="accent-gold w-4 h-4"
            />
            Générer et écraser les autres langues avec la traduction
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </button>
        </div>
      </div>
    </div>
  );
}
