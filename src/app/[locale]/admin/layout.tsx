'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Aperçu', path: '/admin', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { name: 'Biographie & CV', path: '/admin/biography', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
    { name: 'Médias (Vidéos)', path: '/admin/media', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Decorative Musical Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <span className="font-serif text-[800px] text-white rotate-[-5deg]">&#x1D11E;</span>
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#111] border-r border-white/5 flex flex-col z-20">
        
        {/* Logo Area */}
        <div className="p-10 border-b border-white/5 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-serif text-2xl tracking-[0.3em] text-white mb-2">STUDIO</h2>
            <div className="w-12 h-[1px] bg-gold mx-auto mb-3"></div>
            <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase font-light">Espace Julien Jacquemart</p>
          </motion.div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow p-6 space-y-1">
          {navItems.map((item, idx) => {
            const isActive = pathname.endsWith(item.path) || (item.path !== '/admin' && pathname.includes(item.path));
            
            return (
              <motion.a 
                key={item.name}
                href={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-gold/10 text-gold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="font-light tracking-widest text-xs uppercase">{item.name}</span>
              </motion.a>
            );
          })}
        </nav>
        
        {/* Logout Area */}
        <div className="p-6">
          <form action="/api/logout" method="POST">
            <button type="submit" className="group flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="text-xs tracking-widest uppercase font-light">Déconnexion</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-16 z-10 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
