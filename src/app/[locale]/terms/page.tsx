'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest mb-6 uppercase">C.G.U.</h1>
          <p className="text-gold tracking-widest uppercase text-sm">Conditions Générales d'Utilisation</p>
          <div className="w-20 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12 text-gray-300 font-light leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
        >
          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles l'éditeur met le site <em>julienjacquemart.com</em> à la disposition de ses utilisateurs, ainsi que la manière dont les utilisateurs accèdent au site et utilisent ses services.
            </p>
            <p className="mt-4">
              Toute connexion au site est subordonnée au respect des présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">2. Accès au site</h2>
            <p>
              L'éditeur s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors du contrôle de l'éditeur, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.
            </p>
            <p className="mt-4">
              Par conséquent, l'éditeur ne peut garantir une disponibilité du site et/ou des services, une fiabilité des transmissions et des performances en termes de temps de réponse ou de qualité. 
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">3. Contenu et Responsabilité</h2>
            <p>
              Les informations fournies sur le site le sont à titre indicatif. L'éditeur s'efforce de les tenir à jour et exactes, mais ne saurait garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
            </p>
            <p className="mt-4">
              L'utilisateur assume seul l'entière responsabilité de l'utilisation des informations et contenus du présent site. L'éditeur ne pourra en aucun cas être tenu responsable de tout dommage de quelque nature qu'il soit résultant de l'interprétation ou de l'utilisation des informations et/ou documents disponibles sur ce site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">4. Liens Hypertextes</h2>
            <p>
              Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le présent site. 
            </p>
            <p className="mt-4">
              Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ou demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur. Toutefois, l'éditeur se réserve le droit de demander la suppression d'un lien qu'il estime non conforme à l'objet de son site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">5. Modification des CGU</h2>
            <p>
              L'éditeur se réserve la possibilité de modifier, à tout moment et sans préavis, les présentes conditions d'utilisation afin de les adapter aux évolutions du site et/ou de son exploitation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">6. Droit Applicable</h2>
            <p>
              Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
