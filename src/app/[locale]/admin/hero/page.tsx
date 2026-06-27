'use client';

import { useState, useEffect } from 'react';
import { getHeroContent, updateHeroContent } from '@/app/actions/hero';

export default function AdminHeroPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');

  useEffect(() => {
    getHeroContent().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await updateHeroContent(data);
    setSaving(false);
    alert('Modifications sauvegardées avec succès !');
  };

  if (loading) return <div className="text-gold">Chargement...</div>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Accueil (Textes)</h1>
      <p className="text-gray-400 font-light mb-10">Modifiez le titre et le sous-titre de la page principale pour chaque langue.</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
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
          <input
            type="text"
            value={data[`subtitle_${activeTab}`]}
            onChange={(e) => setData({ ...data, [`subtitle_${activeTab}`]: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-6 bg-gold hover:bg-gold-light text-black font-semibold tracking-widest uppercase py-3 transition-colors disabled:opacity-50"
        >
          {saving ? 'Sauvegarde en cours...' : 'Enregistrer les modifications'}
        </button>
      </div>
    </div>
  );
}
