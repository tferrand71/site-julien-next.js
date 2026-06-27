'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function Footer() {
  const pathname = usePathname();
  const tContact = useTranslations('Contact');
  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('Hero');
  const email = tContact('email');

  if (pathname.includes('/admin')) return null;

  return (
    <footer className="relative bg-[#050505] overflow-hidden pt-24 pb-12 mt-20 border-t border-white/5">
      {/* Glowing Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      {/* Musical Watermark Background */}
      <div className="absolute -bottom-24 -right-10 md:-right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="font-serif text-[400px] md:text-[600px] text-white">&#x1D11E;</span>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Brand/Logo column (Larger) */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <Link href="/" className="group inline-block">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-[0.2em] mb-2 group-hover:text-gold transition-colors duration-500">
                JULIEN <br className="hidden md:block" />
                <span className="text-gold group-hover:text-white transition-colors duration-500">JACQUEMART</span>
              </h2>
            </Link>
            <p className="text-gray-400 font-light italic font-serif text-lg">
              {tHero('title')}
            </p>
            <p className="text-gray-500 font-light text-sm max-w-sm leading-relaxed">
              "La musique donne une âme à nos cœurs et des ailes à la pensée."
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg text-white tracking-widest mb-8 uppercase flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold/50"></span>
              Menu
            </h3>
            <div className="flex flex-col space-y-4 items-center md:items-start">
              {[
                { name: tNav('home'), path: '/' },
                { name: tNav('biography'), path: '/biography' },
                { name: tNav('events'), path: '/events' },
                { name: tNav('media'), path: '/media' }
              ].map(link => (
                <Link key={link.path} href={link.path} className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="font-light tracking-wide">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg text-white tracking-widest mb-8 uppercase flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold/50"></span>
              {tContact('title')}
            </h3>
            
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="group">
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">Management & Booking</p>
                <a href={`mailto:${email}`} className="text-gold hover:text-white transition-colors duration-300 font-light text-lg">
                  {email}
                </a>
              </div>

              <div className="flex gap-4 pt-2">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/julienjacquemartchefdorchestre/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center h-12 w-12 hover:w-[130px] overflow-hidden rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-gold hover:border-gold transition-all duration-500"
                  aria-label="LinkedIn"
                >
                  <div className="flex items-center justify-center min-w-[48px] h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">LinkedIn</span>
                </a>
                
                {/* Contact Route */}
                <Link 
                  href="/contact" 
                  className="group flex items-center h-12 w-12 hover:w-[130px] overflow-hidden rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-gold hover:border-gold transition-all duration-500"
                  aria-label="Email"
                >
                  <div className="flex items-center justify-center min-w-[48px] h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Contact</span>
                </Link>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs font-light tracking-widest uppercase text-center md:text-left leading-loose">
            © {new Date().getFullYear()} Julien Jacquemart. <br className="md:hidden" />
            <span className="md:inline-block md:ml-2">
              Développé par <a href="https://tobias-ferrand.ovh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-0.5">Tobias Ferrand</a>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs font-light text-gray-500 uppercase tracking-widest">
            <Link href="/legal" className="hover:text-white transition-colors duration-300">Mentions Légales</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Confidentialité</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">CGU</Link>
            
            {/* Divider dot */}
            <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
            
            <a href="/admin" className="text-gold/50 hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700">
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
