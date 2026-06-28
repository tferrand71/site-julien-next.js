'use client';

import { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject } from '@/app/actions/projects';
import Image from 'next/image';

const STATUSES = [
  { value: 'PAST', label: 'Passé' },
  { value: 'CURRENT', label: 'En cours' },
  { value: 'FUTURE', label: 'À venir' }
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState('fr');
  const [translating, setTranslating] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);

  const [newProject, setNewProject] = useState({
    status: 'CURRENT',
    title_fr: '', title_en: '', title_de: '', title_es: '',
    desc_fr: '', desc_en: '', desc_de: '', desc_es: '',
    imageData: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getProjects();
    setProjects(res);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, imageData: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!newProject.title_fr) {
      return alert("Le titre en français est requis.");
    }
    
    try {
      if (autoTranslate) {
        const { translateText } = await import('@/app/actions/translate');
        
        const title_en = await translateText(newProject.title_fr, 'en');
        const title_de = await translateText(newProject.title_fr, 'de');
        const title_es = await translateText(newProject.title_fr, 'es');
        
        const desc_en = await translateText(newProject.desc_fr, 'en');
        const desc_de = await translateText(newProject.desc_fr, 'de');
        const desc_es = await translateText(newProject.desc_fr, 'es');

        await addProject({
          ...newProject,
          title_en, title_de, title_es,
          desc_en, desc_de, desc_es
        });
      } else {
        await addProject(newProject);
      }

      setShowAdd(false);
      setNewProject({
        status: 'CURRENT',
        title_fr: '', title_en: '', title_de: '', title_es: '',
        desc_fr: '', desc_en: '', desc_de: '', desc_es: '',
        imageData: ''
      });
      fetchProjects();
    } catch (e) {
      alert("Erreur lors de l'ajout.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce projet ?')) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  const handleTranslate = async () => {
    if (!newProject.title_fr) return alert('Le titre en français est vide.');
    setTranslating(true);
    try {
      const { translateText } = await import('@/app/actions/translate');
      const translatedTitle = await translateText(newProject.title_fr, activeTab);
      const translatedDesc = await translateText(newProject.desc_fr, activeTab);
      setNewProject({ 
        ...newProject, 
        [`title_${activeTab}`]: translatedTitle,
        [`desc_${activeTab}`]: translatedDesc
      });
    } catch (error) {
      alert("Erreur de traduction. Vérifiez la clé API.");
    }
    setTranslating(false);
  };

  if (loading) return <div className="text-gold mt-10">Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Projets Artistiques</h1>
          <p className="text-gray-400 font-light">Gérez vos grands projets passés, présents et futurs.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gold text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm w-full sm:w-auto"
        >
          {showAdd ? 'Annuler' : 'Nouveau Projet'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/5 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-serif text-white mb-6">Ajouter un projet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Statut</label>
              <select 
                value={newProject.status} 
                onChange={e => setNewProject({...newProject, status: e.target.value})} 
                className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none appearance-none"
              >
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Image (Fichier)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload} 
                className="w-full text-white file:mr-4 file:py-3 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-gold-light"
              />
              {newProject.imageData && (
                <div className="mt-4 relative w-32 h-20 bg-black">
                  <Image src={newProject.imageData} alt="Aperçu" fill className="object-cover" />
                </div>
              )}
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
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Titre du projet</label>
              <input type="text" value={(newProject as any)[`title_${activeTab}`]} onChange={e => setNewProject({...newProject, [`title_${activeTab}`]: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Description</label>
              <textarea 
                value={(newProject as any)[`desc_${activeTab}`]} 
                onChange={(e) => setNewProject({ ...newProject, [`desc_${activeTab}`]: e.target.value })}
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

      {/* List */}
      <div className="space-y-6">
        {projects.length === 0 ? (
          <p className="text-gray-500 italic">Aucun projet.</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="bg-[#111] border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 hover:border-white/20 transition-colors">
              {project.imageData && (
                <div className="relative w-full sm:w-48 aspect-video bg-black flex-shrink-0">
                  <Image src={project.imageData} alt={project.title_fr} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">{project.title_fr}</h3>
                    <span className="inline-block text-gold text-xs border border-gold px-2 py-0.5 uppercase mb-3">
                      {STATUSES.find(s => s.value === project.status)?.label || project.status}
                    </span>
                  </div>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">Supprimer</button>
                </div>
                <p className="text-gray-400 font-light text-sm line-clamp-3">{project.desc_fr}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
