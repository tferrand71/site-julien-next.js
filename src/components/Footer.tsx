'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function Footer() {
  const pathname = usePathname();
  const tContact = useTranslations('Contact');
  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('Hero');
  const tFooter = useTranslations('Footer');
  const email = tContact('email');

  if (pathname.includes('/admin')) return null;

  return (
    <footer className="relative bg-[#050505] overflow-hidden pt-24 pb-12 mt-20 border-t border-white/5">
      {/* Glowing Top Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      
      {/* Musical Watermark Background (Right - Treble Clef) */}
      <div className="absolute -bottom-24 -right-10 md:-right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="font-serif text-[400px] md:text-[600px] text-white">&#x1D11E;</span>
      </div>
      
      {/* Musical Watermark Background (Left - Bass Clef) */}
      <div className="absolute top-0 -left-10 md:-left-20 pointer-events-none opacity-[0.02] select-none">
        <span className="font-serif text-[300px] md:text-[500px] text-white">&#x1D122;</span>
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
            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-gray-500 font-light text-sm max-w-sm leading-relaxed italic">
                {tFooter('quote')}
              </p>
              <p className="text-gold/70 font-serif text-xs tracking-widest uppercase">
                {tFooter('author')}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg text-white tracking-widest mb-8 uppercase flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold/50"></span>
              {tFooter('menu')}
            </h3>
            <div className="flex flex-col space-y-4 items-center md:items-start">
              {[
                { name: tNav('home'), path: '/' },
                { name: tNav('biography'), path: '/biography' },
                { name: tNav('events'), path: '/events' },
                { name: tNav('media'), path: '/media' },
                { name: tNav('repertoire'), path: '/repertoire' },
                { name: tNav('projects'), path: '/projects' },
                { name: tNav('seasons'), path: '/seasons' }
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
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">{tFooter('management')}</p>
                <a href={`mailto:${email}`} className="text-gold hover:text-white transition-colors duration-300 font-light text-lg">
                  {email}
                </a>
              </div>

              <div className="flex gap-4 pt-2">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/profile.php?id=100006356208603" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center h-12 w-12 hover:w-[130px] overflow-hidden rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-gold hover:border-gold transition-all duration-500"
                  aria-label="Facebook"
                >
                  <div className="flex items-center justify-center min-w-[48px] h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Facebook</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/jujujacquemart/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center h-12 w-12 hover:w-[140px] overflow-hidden rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-black hover:bg-gold hover:border-gold transition-all duration-500"
                  aria-label="Instagram"
                >
                  <div className="flex items-center justify-center min-w-[48px] h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Instagram</span>
                </a>

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
                  <span className="font-semibold text-xs tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{tFooter('contact')}</span>
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
              {tFooter('developedBy')} <a href="https://tobias-ferrand.ovh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-0.5">Tobias Ferrand</a>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs font-light text-gray-500 uppercase tracking-widest">
            <Link href="/legal" className="hover:text-white transition-colors duration-300">{tFooter('legal')}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">{tFooter('privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">{tFooter('terms')}</Link>
            
            {/* Divider dot */}
            <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
            
            <a href="/admin" className="text-gold/50 hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              {tFooter('admin')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
