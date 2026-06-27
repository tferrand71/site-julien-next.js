'use client';

import { useState, useEffect } from 'react';
import { getEvents, addEvent, deleteEvent } from '@/app/actions/events';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);

  const [newEvent, setNewEvent] = useState({
    date: '',
    isUpcoming: true,
    title_fr: '', title_en: '', title_de: '', title_es: '',
    desc_fr: '', desc_en: '', desc_de: '', desc_es: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await getEvents();
    setEvents(res);
    setLoading(false);
  };

  const handleAdd = async () => {
    try {
      const { translateText } = await import('@/app/actions/translate');
      
      const title_en = await translateText(newEvent.title_fr, 'en');
      const title_de = await translateText(newEvent.title_fr, 'de');
      const title_es = await translateText(newEvent.title_fr, 'es');
      
      const desc_en = await translateText(newEvent.desc_fr, 'en');
      const desc_de = await translateText(newEvent.desc_fr, 'de');
      const desc_es = await translateText(newEvent.desc_fr, 'es');

      const eventData = {
        ...newEvent,
        title_en, title_de, title_es,
        desc_en, desc_de, desc_es
      };

      await addEvent(eventData);
      setShowAdd(false);
      fetchEvents();
      setNewEvent({
        date: '', isUpcoming: true,
        title_fr: '', title_en: '', title_de: '', title_es: '',
        desc_fr: '', desc_en: '', desc_de: '', desc_es: ''
      });
      alert("Événement ajouté et traduit automatiquement !");
    } catch (error) {
      alert("Erreur lors de la traduction ou de l'ajout.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  const handleTranslate = async () => {
    if (!newEvent.title_fr || !newEvent.desc_fr) return alert('Le titre ou la description en français sont vides.');
    setTranslating(true);
    try {
      const { translateText } = await import('@/app/actions/translate');
      const translatedTitle = await translateText(newEvent.title_fr, activeTab);
      const translatedDesc = await translateText(newEvent.desc_fr, activeTab);
      setNewEvent({ 
        ...newEvent, 
        [`title_${activeTab}`]: translatedTitle,
        [`desc_${activeTab}`]: translatedDesc
      });
    } catch (error) {
      alert("Erreur de traduction. Vérifiez la clé API.");
    }
    setTranslating(false);
  };

  if (loading) return <div className="text-gold">Chargement...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Agenda (Événements)</h1>
          <p className="text-gray-400 font-light">Gérez les dates de vos prochains concerts ou masterclasses.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gold text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm"
        >
          {showAdd ? 'Annuler' : 'Ajouter une date'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/5 p-8 mb-10">
          <h2 className="text-xl font-serif text-white mb-6">Nouvel événement</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Date (ex: 24 Septembre 2026)</label>
              <input type="text" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div className="flex items-center pt-8">
              <label className="flex items-center cursor-pointer text-gray-300">
                <input type="checkbox" checked={newEvent.isUpcoming} onChange={e => setNewEvent({...newEvent, isUpcoming: e.target.checked})} className="mr-3 w-5 h-5 accent-gold" />
                Événement à venir (Afficher le badge)
              </label>
            </div>
          </div>

          {/* Tabs for translation */}
          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
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

          <div className="space-y-6">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Titre de l'événement</label>
              <input type="text" value={(newEvent as any)[`title_${activeTab}`]} onChange={e => setNewEvent({...newEvent, [`title_${activeTab}`]: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Description</label>
              <textarea value={(newEvent as any)[`desc_${activeTab}`]} onChange={e => setNewEvent({...newEvent, [`desc_${activeTab}`]: e.target.value})} className="w-full h-32 bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
          </div>

          <button onClick={handleAdd} className="w-full mt-8 bg-gold text-black font-semibold tracking-widest uppercase py-3">
            Sauvegarder l'événement
          </button>
        </div>
      )}

      {/* List of existing events */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500 italic">Aucun événement n'est programmé pour le moment.</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-[#111] border border-white/5 p-6 flex justify-between items-center hover:border-white/20 transition-colors">
              <div>
                <h3 className="text-xl font-serif text-white mb-1">{event.title_fr}</h3>
                <p className="text-gray-400 font-light text-sm">{event.date} {event.isUpcoming && <span className="ml-3 text-gold text-xs border border-gold px-2 py-1 uppercase">À venir</span>}</p>
              </div>
              <button onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-300 p-2">
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
