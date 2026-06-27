'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function Footer() {
  const pathname = usePathname();
  const tContact = useTranslations('Contact');
  const tNav = useTranslations('Navigation');
  const email = tContact('email');

  if (pathname.includes('/admin')) return null;

  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-md border-t border-gold/10 pt-20 pb-10 mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* Brand/Logo column */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h2 className="font-serif text-3xl font-bold text-white tracking-widest text-center md:text-left">
              JULIEN <br /><span className="text-gold">JACQUEMART</span>
            </h2>
            <p className="text-gray-400 font-light max-w-xs text-center md:text-left leading-relaxed">
              Chef d'Orchestre, Tromboniste et Pédagogue.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-serif text-xl text-white tracking-widest mb-4 uppercase text-sm">Navigation</h3>
            <Link href="/" className="text-gray-400 hover:text-gold transition-colors duration-300 font-light">{tNav('home')}</Link>
            <Link href="/biography" className="text-gray-400 hover:text-gold transition-colors duration-300 font-light">{tNav('biography')}</Link>
            <Link href="/events" className="text-gray-400 hover:text-gold transition-colors duration-300 font-light">{tNav('events')}</Link>
            <Link href="/media" className="text-gray-400 hover:text-gold transition-colors duration-300 font-light">{tNav('media')}</Link>
            <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors duration-300 font-light">{tNav('contact')}</Link>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h3 className="font-serif text-xl text-white tracking-widest mb-2 uppercase text-sm">{tContact('title')}</h3>
            <a href={`mailto:${email}`} className="text-gold hover:text-gold-light transition-colors duration-300 font-light border-b border-gold/30 pb-1 text-center md:text-left">
              {email}
            </a>
            
            <div className="flex gap-4 pt-6">
              <a 
                href="https://www.linkedin.com/in/julienjacquemartchefdorchestre/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a>
              <a 
                href={`mailto:${email}`} 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-light tracking-widest uppercase text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Julien Jacquemart. Tous droits réservés. <br className="md:hidden" />
            <span className="inline-block mt-2 md:mt-0 md:ml-2">
              Développé avec passion par <a href="https://tobias-ferrand.ovh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors duration-300">Tobias Ferrand</a>
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-light text-gray-600 uppercase tracking-widest">
            <Link href="/legal" className="hover:text-gold transition-colors duration-300">Mentions Légales</Link>
            <span className="hidden md:inline">|</span>
            <Link href="/privacy" className="hover:text-gold transition-colors duration-300">Confidentialité</Link>
            <span className="hidden md:inline">|</span>
            <Link href="/terms" className="hover:text-gold transition-colors duration-300">CGU</Link>
            <a href="/admin" className="hover:text-gold transition-colors duration-300 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
