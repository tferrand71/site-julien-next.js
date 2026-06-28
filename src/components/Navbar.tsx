'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [langOpen]);

  // Hide navbar on admin pages (after all hooks)
  if (pathname.includes('/admin')) return null;

  const locales = [
    { code: 'fr', name: 'FR' },
    { code: 'en', name: 'EN' },
    { code: 'de', name: 'DE' },
    { code: 'es', name: 'ES' },
  ];

  // Primary nav items (always visible)
  const primaryRoutes = ['biography', 'events', 'media', 'contact'];
  // Grouped items under "Musique" dropdown
  const musicRoutes = ['repertoire', 'projects', 'seasons'];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-6' : 'top-0'}`}
    >
      <div className={`transition-all duration-500 w-full ${scrolled ? 'max-w-7xl px-6 lg:px-8 py-3 bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-full' : 'max-w-7xl px-6 lg:px-8 py-6 bg-transparent'}`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative rounded-full overflow-hidden border border-gold/30 group-hover:border-gold transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <Image src="/logo.webp" alt="Julien Jacquemart Logo" fill className="object-cover" />
            </div>
            <span className={`font-serif tracking-[0.2em] text-foreground transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'}`}>
              JULIEN JACQUEMART
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {/* Primary navigation items */}
            {primaryRoutes.map((route) => (
              <Link key={route} href={`/${route}`} className="relative group text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">
                {t(route as any)}
                {pathname.includes(`/${route}`) && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold" />
                )}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-50"></span>
              </Link>
            ))}

            {/* Music dropdown (Répertoire, Projets, Saisons) */}
            <MusicDropdown 
              routes={musicRoutes} 
              t={t} 
              pathname={pathname} 
              label={t('music_dropdown' as any) || 'Musique'}
            />
            
            {/* Language selector */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors duration-300 text-gray-300"
                aria-label="Changer de langue"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
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
                    role="listbox"
                    aria-label="Sélection de la langue"
                  >
                    {locales.map((locale) => (
                      <Link 
                        key={locale.code}
                        href={pathname}
                        locale={locale.code}
                        onClick={() => setLangOpen(false)}
                        className="px-6 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-gold transition-colors"
                        role="option"
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
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-foreground hover:text-gold transition-colors"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
            >
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
            {[...primaryRoutes, ...musicRoutes].map((route) => (
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

// Dropdown component for Music-related navigation items
function MusicDropdown({ routes, t, pathname, label }: { routes: string[], t: any, pathname: string, label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = routes.some(r => pathname.includes(`/${r}`));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`relative group text-sm font-medium uppercase tracking-widest transition-colors duration-300 flex items-center gap-1 ${isActive ? 'text-gold' : 'text-gray-300 hover:text-white'}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        {isActive && (
          <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-4 py-2 w-48 bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="menu"
          >
            {routes.map(route => (
              <Link
                key={route}
                href={`/${route}`}
                onClick={() => setOpen(false)}
                className={`px-6 py-3 text-sm uppercase tracking-widest transition-colors ${pathname.includes(`/${route}`) ? 'text-gold bg-gold/5' : 'text-gray-300 hover:bg-white/5 hover:text-gold'}`}
                role="menuitem"
              >
                {t(route as any)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
