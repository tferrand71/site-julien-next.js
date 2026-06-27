'use client';

import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const cards = [
    {
      title: "Accueil (Hero)",
      desc: "Modifiez le titre et le sous-titre principaux de la page d'accueil dans toutes les langues.",
      link: "/admin/hero",
      icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    },
    {
      title: "Agenda",
      desc: "Gérez les dates de vos prochains concerts ou masterclasses affichés sur la page Événements.",
      link: "/admin/events",
      icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    },
    {
      title: "Biographie & CV",
      desc: "Modifiez vos textes de présentation et mettez à jour vos documents PDF professionnels en toute autonomie.",
      link: "/admin/biography",
      icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    },
    {
      title: "Médias & YouTube",
      desc: "Synchronisez votre chaîne YouTube et organisez les photographies de presse affichées sur le site.",
      link: "/admin/media",
      icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    }
  ];

  return (
    <div className="pb-24">
      {/* Header section */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-widest mb-4">
          Bienvenue <span className="text-gold italic">Julien</span>
        </h1>
        <p className="text-gray-400 font-light text-lg max-w-2xl leading-relaxed">
          Gérez l'intégralité de votre portfolio depuis ce studio de contrôle intuitif et sécurisé.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, idx) => (
          <motion.a 
            key={idx}
            href={card.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.6 }}
            className="group relative bg-[#111] border border-white/5 p-10 hover:border-gold/30 transition-all duration-500 hover:bg-[#151515]"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                </svg>
              </div>
              
              <h3 className="text-xl font-serif text-white mb-4 tracking-widest uppercase">{card.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed flex-grow text-sm">{card.desc}</p>
              
              <div className="mt-8 flex items-center text-gold text-xs font-light tracking-[0.2em] uppercase">
                <span className="relative">
                  Ouvrir l'éditeur
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
            
            {/* Subtle decorative accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
