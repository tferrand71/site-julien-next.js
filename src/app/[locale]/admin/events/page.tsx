'use client';

import { useState, useEffect } from 'react';
import { getEvents, addEvent, deleteEvent } from '@/app/actions/events';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);

  const [newEvent, setNewEvent] = useState({
    startDateStr: '',
    endDateStr: '',
    location: '',
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

  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    // JJ/MM/AAAA -> YYYY-MM-DD
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T12:00:00.000Z`);
  };

  const handleAdd = async () => {
    const startDate = parseDate(newEvent.startDateStr);
    if (!startDate || isNaN(startDate.getTime())) {
      return alert("Veuillez entrer une date de début valide au format JJ/MM/AAAA.");
    }
    
    const endDate = newEvent.endDateStr ? parseDate(newEvent.endDateStr) : null;
    if (newEvent.endDateStr && (!endDate || isNaN(endDate.getTime()))) {
      return alert("Veuillez entrer une date de fin valide au format JJ/MM/AAAA.");
    }

    try {
      if (autoTranslate) {
        const { translateText } = await import('@/app/actions/translate');
        
        const title_en = await translateText(newEvent.title_fr, 'en');
        const title_de = await translateText(newEvent.title_fr, 'de');
        const title_es = await translateText(newEvent.title_fr, 'es');
        
        const desc_en = await translateText(newEvent.desc_fr, 'en');
        const desc_de = await translateText(newEvent.desc_fr, 'de');
        const desc_es = await translateText(newEvent.desc_fr, 'es');

        const eventData = {
          startDate,
          endDate,
          location: newEvent.location,
          isUpcoming: newEvent.isUpcoming,
          title_fr: newEvent.title_fr, title_en, title_de, title_es,
          desc_fr: newEvent.desc_fr, desc_en, desc_de, desc_es
        };

        await addEvent(eventData);
        alert("Événement ajouté et traduit automatiquement !");
      } else {
        const eventData = {
          startDate,
          endDate,
          location: newEvent.location,
          isUpcoming: newEvent.isUpcoming,
          title_fr: newEvent.title_fr, title_en: newEvent.title_en, title_de: newEvent.title_de, title_es: newEvent.title_es,
          desc_fr: newEvent.desc_fr, desc_en: newEvent.desc_en, desc_de: newEvent.desc_de, desc_es: newEvent.desc_es
        };
        await addEvent(eventData);
        alert("Événement ajouté sans modifier vos traductions manuelles !");
      }

      setShowAdd(false);
      fetchEvents();
      setNewEvent({
        startDateStr: '', endDateStr: '', location: '', isUpcoming: true,
        title_fr: '', title_en: '', title_de: '', title_es: '',
        desc_fr: '', desc_en: '', desc_de: '', desc_es: ''
      });
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

  const formatDate = (start: string | Date, end?: string | Date | null) => {
    const s = new Date(start);
    const dateOpts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    
    if (!end) {
      return new Intl.DateTimeFormat('fr-FR', dateOpts).format(s);
    }
    
    const e = new Date(end);
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      return `${s.getDate()} - ${new Intl.DateTimeFormat('fr-FR', dateOpts).format(e)}`;
    }
    return `${new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'short'}).format(s)} - ${new Intl.DateTimeFormat('fr-FR', dateOpts).format(e)}`;
  };

  if (loading) return <div className="text-gold">Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Agenda (Événements)</h1>
          <p className="text-gray-400 font-light">Gérez les dates de vos prochains concerts ou masterclasses.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gold text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm w-full sm:w-auto"
        >
          {showAdd ? 'Annuler' : 'Ajouter une date'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/5 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-serif text-white mb-6">Nouvel événement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Date de début (JJ/MM/AAAA)</label>
              <input type="text" placeholder="Ex: 24/09/2026" value={newEvent.startDateStr} onChange={e => setNewEvent({...newEvent, startDateStr: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Date de fin (Optionnel)</label>
              <input type="text" placeholder="Ex: 26/09/2026" value={newEvent.endDateStr} onChange={e => setNewEvent({...newEvent, endDateStr: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Lieu</label>
              <input type="text" placeholder="Ex: Paris, France" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div className="flex items-center md:col-span-2">
              <label className="flex items-center cursor-pointer text-gray-300">
                <input type="checkbox" checked={newEvent.isUpcoming} onChange={e => setNewEvent({...newEvent, isUpcoming: e.target.checked})} className="mr-3 w-5 h-5 accent-gold" />
                Événement à venir (Afficher le badge)
              </label>
            </div>
          </div>

          {/* Tabs for translation */}
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
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Titre de l'événement</label>
              <input type="text" value={(newEvent as any)[`title_${activeTab}`]} onChange={e => setNewEvent({...newEvent, [`title_${activeTab}`]: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Description</label>
              <textarea 
                value={(newEvent as any)[`desc_${activeTab}`]} 
                onChange={(e) => setNewEvent({ ...newEvent, [`desc_${activeTab}`]: e.target.value })}
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
              <span className="leading-tight">Générer et écraser les autres langues avec la traduction</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowAdd(false)}
                className="w-full sm:w-auto border border-white/20 hover:bg-white/5 text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                Ajouter cet événement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of existing events */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500 italic">Aucun événement n'est programmé pour le moment.</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-[#111] border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-colors">
              <div>
                <h3 className="text-lg sm:text-xl font-serif text-white mb-1">{event.title_fr}</h3>
                <p className="text-gray-400 font-light text-sm flex flex-col sm:block gap-1">
                  <span>{formatDate(event.startDate, event.endDate)} {event.location && `- ${event.location}`}</span>
                  {event.isUpcoming && <span className="sm:ml-3 inline-block w-max text-gold text-xs border border-gold px-2 py-0.5 sm:py-1 uppercase">À venir</span>}
                </p>
              </div>
              <button onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-300 py-2 sm:p-2 w-full sm:w-auto text-left sm:text-right border-t sm:border-none border-white/5 mt-2 sm:mt-0">
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
