'use client';

import { motion } from 'framer-motion';

export default function LegalPage() {
  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest mb-6 uppercase">Mentions Légales</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12 text-gray-300 font-light leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
        >
          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">1. Éditeur du site</h2>
            <p>
              Le présent site est la propriété exclusive de <strong>Julien Jacquemart</strong>, Chef d'Orchestre.<br />
              Email de contact : <a href="mailto:julienjacquemartofficiel@gmail.com" className="text-gold-light hover:underline">julienjacquemartofficiel@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">2. Création et Développement</h2>
            <p>
              Ce site a été conçu et développé par <strong>Tobias Ferrand</strong>.<br />
              Site : <a href="https://tobias-ferrand.ovh" target="_blank" rel="noopener noreferrer" className="text-gold-light hover:underline">tobias-ferrand.ovh</a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">3. Hébergement</h2>
            <p>
              L'hébergement de ce site est assuré par la société <strong>Vercel Inc.</strong><br />
              Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold-light hover:underline">https://vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">4. Propriété Intellectuelle & Contenus Tiers</h2>
            <p className="mb-4">
              L'ensemble du contenu original de ce site (textes, images, logo) est la propriété de Julien Jacquemart ou de ses partenaires et est protégé par le droit d'auteur. Toute reproduction ou distribution est interdite sans accord préalable.
            </p>
            <p>
              <strong>Vidéos et œuvres musicales :</strong> Ce site peut intégrer des vidéos hébergées sur des plateformes tierces (telles que YouTube). Ces plateformes sont responsables de la gestion des droits d'auteur (via des systèmes comme Content ID) concernant les œuvres musicales interprétées. Julien Jacquemart ne revendique aucun droit de propriété sur les compositions musicales non libres de droit apparaissant dans ces vidéos. Si vous êtes ayant droit d'une œuvre et souhaitez que son intégration soit retirée de ce site, veuillez nous contacter directement.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">5. Données personnelles & Confidentialité</h2>
            <p>
              Ce site ne collecte aucune donnée personnelle à l'insu de l'utilisateur. Aucun cookie de pistage publicitaire n'est utilisé. Les données éventuelles recueillies via des formulaires de contact sont destinées uniquement à Julien Jacquemart dans le but de répondre à la demande et ne seront en aucun cas cédées à des tiers.
            </p>
            <p className="mt-4">
              Conformément à la loi "Informatique et Libertés", vous disposez d'un droit d'accès, de rectification et d'opposition aux données personnelles vous concernant.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
