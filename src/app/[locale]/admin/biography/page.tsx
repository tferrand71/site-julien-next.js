'use client';

import { useState, useEffect } from 'react';
import { getBiography, updateBiographyText, uploadDocument } from '@/app/actions/biography';

export default function AdminBiographyPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingText, setSavingText] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingBio, setUploadingBio] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    const res = await getBiography();
    setData(res);
    setLoading(false);
  };

  const handleTranslate = async () => {
    if (!data.content_fr) return alert('Le texte en français est vide.');
    setTranslating(true);
    try {
      const { translateText } = await import('@/app/actions/translate');
      const translated = await translateText(data.content_fr, activeTab);
      setData({ ...data, [`content_${activeTab}`]: translated });
    } catch (error) {
      alert("Erreur de traduction. Vérifiez la clé API.");
    }
    setTranslating(false);
  };

  const handleSaveText = async () => {
    setSavingText(true);
    try {
      // Auto-translate to all languages before saving
      const { translateText } = await import('@/app/actions/translate');
      const en = await translateText(data.content_fr, 'en');
      const de = await translateText(data.content_fr, 'de');
      const es = await translateText(data.content_fr, 'es');
      
      const newData = { ...data, content_en: en, content_de: de, content_es: es };
      setData(newData);
      await updateBiographyText(newData);
      alert('Texte traduit automatiquement dans toutes les langues et sauvegardé avec succès !');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la traduction ou de la sauvegarde.");
    }
    setSavingText(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'bio') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    if (type === 'cv') setUploadingCv(true);
    else setUploadingBio(true);

    try {
      await uploadDocument(formData, type);
      await fetchBio(); // Refresh to get new URLs
      alert('Fichier uploadé avec succès !');
    } catch (error) {
      alert("Erreur lors de l'upload. Avez-vous bien ajouté BLOB_READ_WRITE_TOKEN ?");
    } finally {
      if (type === 'cv') setUploadingCv(false);
      else setUploadingBio(false);
    }
  };

  if (loading) return <div className="text-gold">Chargement...</div>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Biographie & CV</h1>
        <p className="text-gray-400 font-light">Modifiez les textes de votre biographie et mettez à jour vos documents PDF téléchargeables.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Texte Section */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 p-8">
          <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest">Éditeur de texte</h2>
          
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
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

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <label className="block text-gold text-sm font-light tracking-widest uppercase">Texte de la Biographie</label>
                <p className="text-xs text-gray-500 italic">Sautez des lignes pour séparer les paragraphes.</p>
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
            <textarea 
              value={data[`content_${activeTab}`]} 
              onChange={(e) => setData({ ...data, [`content_${activeTab}`]: e.target.value })}
              className="w-full h-96 bg-[#1a1a1a] border border-white/10 text-gray-300 px-4 py-3 focus:outline-none focus:border-gold transition-colors font-light leading-relaxed"
            />
          </div>

          <button
            onClick={handleSaveText}
            disabled={savingText}
            className="w-full bg-gold hover:bg-gold-light text-black font-semibold tracking-widest uppercase py-3 transition-colors disabled:opacity-50"
          >
            {savingText ? 'Sauvegarde...' : 'Enregistrer le texte'}
          </button>
        </div>

        {/* Fichiers Section */}
        <div className="bg-[#111] border border-white/5 p-8 flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-serif text-white mb-6 uppercase tracking-widest">Documents PDF</h2>
            
            <div className="mb-8">
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">CV Professionnel</label>
              {data.cvUrl && (
                <a href={data.cvUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 block mb-3 break-all">
                  Voir le CV actuel
                </a>
              )}
              <label className="block w-full border border-dashed border-white/20 hover:border-gold text-center py-6 cursor-pointer transition-colors bg-[#1a1a1a]">
                <span className="text-sm font-light text-gray-400 uppercase tracking-widest">
                  {uploadingCv ? 'Envoi en cours...' : 'Remplacer le CV (PDF)'}
                </span>
                <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'cv')} disabled={uploadingCv} />
              </label>
            </div>

            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Biographie PDF</label>
              {data.bioUrl && (
                <a href={data.bioUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 block mb-3 break-all">
                  Voir la Biographie actuelle
                </a>
              )}
              <label className="block w-full border border-dashed border-white/20 hover:border-gold text-center py-6 cursor-pointer transition-colors bg-[#1a1a1a]">
                <span className="text-sm font-light text-gray-400 uppercase tracking-widest">
                  {uploadingBio ? 'Envoi en cours...' : 'Remplacer la Biographie (PDF)'}
                </span>
                <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'bio')} disabled={uploadingBio} />
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
