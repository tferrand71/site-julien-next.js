'use client';

import { useState, useEffect } from 'react';
import { getRepertoire, addRepertoireItem, deleteRepertoireItem } from '@/app/actions/repertoire';

const CATEGORIES = [
  "Orchestre symphonique",
  "Ouvrages lyriques",
  "Pour ensembles",
  "Créations",
  "Brass Band",
  "Orchestre d'Harmonie"
];

export default function AdminRepertoirePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const [newItem, setNewItem] = useState({
    category: CATEGORIES[0],
    composer: '',
    piece: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await getRepertoire();
    setItems(res);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newItem.composer || !newItem.piece) {
      return alert("Le compositeur et l'œuvre sont requis.");
    }
    await addRepertoireItem(newItem);
    setShowAdd(false);
    setNewItem({ category: CATEGORIES[0], composer: '', piece: '' });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette œuvre du répertoire ?')) {
      await deleteRepertoireItem(id);
      fetchItems();
    }
  };

  if (loading) return <div className="text-gold mt-10">Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-widest mb-2">Répertoire</h1>
          <p className="text-gray-400 font-light">Gérez les œuvres que vous dirigez, classées par catégorie.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-gold text-black px-6 py-3 font-semibold tracking-widest uppercase text-sm w-full sm:w-auto transition-colors hover:bg-gold-light"
        >
          {showAdd ? 'Annuler' : 'Ajouter une œuvre'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#111] border border-white/5 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-serif text-white mb-6">Nouvelle œuvre</h2>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Catégorie</label>
              <select 
                value={newItem.category} 
                onChange={e => setNewItem({...newItem, category: e.target.value})} 
                className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none appearance-none cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Compositeur</label>
              <input type="text" placeholder="Ex: Beethoven" value={newItem.composer} onChange={e => setNewItem({...newItem, composer: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="block text-gold text-sm font-light tracking-widest uppercase mb-3">Œuvre</label>
              <input type="text" placeholder="Ex: Symphonie No. 5" value={newItem.piece} onChange={e => setNewItem({...newItem, piece: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 focus:border-gold outline-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* List of repertoire items by category */}
      <div className="space-y-12">
        {CATEGORIES.map(cat => {
          const categoryItems = items.filter(i => i.category === cat);
          if (categoryItems.length === 0) return null;

          return (
            <div key={cat}>
              <h2 className="text-2xl font-serif text-gold mb-4 border-b border-white/10 pb-2">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryItems.map(item => (
                  <div key={item.id} className="bg-[#111] border border-white/5 p-4 flex justify-between items-center group hover:border-white/20 transition-colors">
                    <div>
                      <p className="text-white font-semibold">{item.composer}</p>
                      <p className="text-gray-400 font-light text-sm italic">{item.piece}</p>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-red-300">
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-gray-500 italic">Aucune œuvre dans le répertoire.</p>
        )}
      </div>
    </div>
  );
}
