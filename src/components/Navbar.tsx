'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (pathname.includes('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locales = [
    { code: 'fr', name: 'FR' },
    { code: 'en', name: 'EN' },
    { code: 'de', name: 'DE' },
    { code: 'es', name: 'ES' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-6' : 'top-0'}`}
    >
      <div className={`transition-all duration-500 w-full ${scrolled ? 'max-w-5xl px-8 py-3 bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-full' : 'max-w-7xl px-8 py-6 bg-transparent'}`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative rounded-full overflow-hidden border border-gold/30 group-hover:border-gold transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <Image src="/logo.png" alt="Julien Jacquemart Logo" fill className="object-cover" />
            </div>
            <span className={`font-serif tracking-[0.2em] text-foreground transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'}`}>
              JULIEN JACQUEMART
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {['biography', 'events', 'media', 'repertoire', 'projects', 'seasons', 'contact'].map((route) => (
              <Link key={route} href={`/${route}`} className="relative group text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">
                {t(route as any)}
                {pathname.includes(`/${route}`) && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold" />
                )}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-50"></span>
              </Link>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors duration-300 text-gray-300"
              >
                <Globe size={18} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 py-2 w-28 bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                  >
                    {locales.map((locale) => (
                      <Link 
                        key={locale.code}
                        href={pathname}
                        locale={locale.code}
                        onClick={() => setLangOpen(false)}
                        className="px-6 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-gold transition-colors"
                      >
                        {locale.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-gold transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 flex flex-col space-y-6"
          >
            {['biography', 'events', 'media', 'repertoire', 'projects', 'seasons', 'contact'].map((route) => (
              <Link key={route} href={`/${route}`} onClick={() => setIsOpen(false)} className={`text-lg uppercase tracking-widest ${pathname.includes(`/${route}`) ? 'text-gold' : 'text-gray-300 hover:text-white'}`}>
                {t(route as any)}
              </Link>
            ))}
            <div className="flex gap-6 pt-6 border-t border-white/10">
               {locales.map((locale) => (
                  <Link 
                    key={locale.code}
                    href={pathname}
                    locale={locale.code}
                    className="text-sm font-bold text-gray-500 hover:text-gold"
                  >
                    {locale.name}
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
