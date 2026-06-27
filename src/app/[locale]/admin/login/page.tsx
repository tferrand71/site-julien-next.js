'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Rediriger vers l'admin (en gardant la locale)
        window.location.href = window.location.pathname.replace('/login', '');
      } else {
        setError('Mot de passe incorrect.');
      }
    } catch (err) {
      setError('Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gold tracking-widest mb-2">CONNEXION</h1>
          <p className="text-gray-400 font-light text-sm uppercase tracking-widest">Espace Administration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-light">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm font-light">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-black font-semibold tracking-widest uppercase py-3 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Accéder au Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
