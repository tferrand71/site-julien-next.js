'use client';

import { useState, useEffect } from 'react';
import { getPastSeasons, addPastSeason, deletePastSeason } from '@/app/actions/seasons';

export default function AdminSeasonsPage() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);

  const [newSeason, setNewSeason] = useState({
    year: '2023-2024',
    title_fr: '', title_en: '', title_de: '', title_es: '',
    desc_fr: '', desc_en: '', desc_de: '', desc_es: ''
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    setLoading(true);
    const res = await getPastSeasons();
    setSeasons(res);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newSeason.year || !newSeason.title_fr) {
      return alert("L'année et le titre en français sont requis.");
    }

    try {
      if (autoTranslate) {
        const { translateText } = await import('@/app/actions/translate');
        
        const title_en = await translateText(newSeason.title_fr, 'en');
        const title_de = await translateText(newSeason.title_fr, 'de');
        const title_es = await translateText(newSeason.title_fr, 'es');
        
        const desc_en = await translateText(newSeason.desc_fr, 'en');
        const desc_de = await translateText(newSeason.desc_fr, 'de');
        const desc_es = await translateText(newSeason.desc_fr, 'es');

        await addPastSeason({
          ...newSeason,
          title_en, title_de, title_es,
          desc_en, desc_de, desc_es
        });
      } else {
        await addPastSeason(newSeason);
      }

      setShowAdd(false);
      setNewSeason({
        year: '2023-2024',
        title_fr: '', title_en: '', title_de: '', title_es: '',
        desc_fr: '', desc_en: '', desc_de: '', desc_es: ''
      });
      fetchSeasons();
    } catch (e) {
      alert("Erreur lors de l'ajout.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette saison ?')) {
      await deletePastSeason(id);
      fetchSeasons();
    }
  };

  const handleTranslate = async () => {
    if (!newSeason.title_fr) return alert('Le titre en français est vide.');
    setTranslating(true);
    try {
      const { translateText } = await import('@/app/actions/translate');
      const translatedTitle = await translateText(newSeason.title_fr, activeTab);
      const translatedDesc = await translateText(newSeason.desc_fr, activeTab);
      setNewSeason({ 
        ...newSeason, 
        [`title_${activeTab}`]: translatedTitle,
        [`desc_${activeTab}`]: translatedDesc
      });
    } catch (error) {
      alert("Erreur de traduction.");
    }
    setTranslating(false);
  };

  if (loading) return <div className="text-gold mt-10">Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Saisons Passées</h1>
          <p className="text-gray-400 font-light">Archivez les événements marquants de vos saisons précédentes.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gold text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm w-full sm:w-auto"
        >
          {showAdd ? 'Annuler' : 'Ajouter une saison'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/5 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-serif text-white mb-6">Nouvelle archive</h2>
          
          <div className="grid grid-cols-1 mb-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Année (ex: 2023-2024)</label>
              <input type="text" value={newSeason.year} onChange={e => setNewSeason({...newSeason, year: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {['fr', 'en', 'de', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-3 py-2 font-light tracking-widest uppercase text-xs sm:text-sm transition-colors ${
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
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors disabled:opacity-50 w-full sm:w-auto mt-2 sm:mt-0"
              >
                {translating ? 'Traduction...' : 'Traduire depuis FR'}
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Titre de la saison</label>
              <input type="text" value={(newSeason as any)[`title_${activeTab}`]} onChange={e => setNewSeason({...newSeason, [`title_${activeTab}`]: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Description</label>
              <textarea 
                value={(newSeason as any)[`desc_${activeTab}`]} 
                onChange={(e) => setNewSeason({ ...newSeason, [`desc_${activeTab}`]: e.target.value })}
                className="w-full h-32 bg-[#1a1a1a] border border-white/10 text-gray-300 px-4 py-3 focus:outline-none focus:border-gold transition-colors font-light"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8 pt-6 border-t border-white/5">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoTranslate} 
                onChange={(e) => setAutoTranslate(e.target.checked)}
                className="accent-gold w-4 h-4 flex-shrink-0"
              />
              Générer et écraser les autres langues avec la traduction
            </label>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button onClick={() => setShowAdd(false)} className="w-full sm:w-auto border border-white/20 hover:bg-white/5 text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase">Annuler</button>
              <button onClick={handleAdd} className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {seasons.length === 0 ? (
          <p className="text-gray-500 italic">Aucune archive de saison.</p>
        ) : (
          seasons.map(season => (
            <div key={season.id} className="bg-[#111] border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-colors">
              <div>
                <span className="inline-block text-gold font-mono text-lg mb-1">{season.year}</span>
                <h3 className="text-xl font-serif text-white mb-2">{season.title_fr}</h3>
                <p className="text-gray-400 font-light text-sm line-clamp-2">{season.desc_fr}</p>
              </div>
              <button onClick={() => handleDelete(season.id)} className="text-red-400 hover:text-red-300 py-2 sm:p-2 w-full sm:w-auto text-left sm:text-right border-t sm:border-none border-white/5 mt-2 sm:mt-0 flex-shrink-0">
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
