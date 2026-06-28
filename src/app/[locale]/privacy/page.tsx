'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-40 flex flex-col">
      <div className="flex-grow container mx-auto px-4 max-w-4xl pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest mb-6 uppercase">Politique de Confidentialité</h1>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12 text-gray-300 font-light leading-relaxed bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
        >
          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">1. Collecte des données personnelles</h2>
            <p>
              Le site <em>julienjacquemart.com</em> est un site vitrine. Il n'exige pas de création de compte utilisateur et ne collecte aucune donnée personnelle à votre insu. Les seules données pouvant être recueillies sont celles que vous nous communiquez volontairement lors de la prise de contact par e-mail (votre adresse e-mail, votre nom et le contenu de votre message).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">2. Utilisation des données</h2>
            <p>
              Les données personnelles recueillies lors des échanges par e-mail sont exclusivement utilisées dans le cadre de :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
              <li>La réponse à vos demandes de renseignements ou de prestations.</li>
              <li>La gestion administrative ou contractuelle en cas de collaboration.</li>
            </ul>
            <p className="mt-4">
              En aucun cas ces données ne seront vendues, cédées ou louées à des tiers à des fins commerciales ou publicitaires.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">3. Cookies et traceurs</h2>
            <p>
              Ce site n'utilise aucun cookie de ciblage publicitaire ou de pistage intrusif. Seuls des cookies strictement nécessaires au fonctionnement technique du site (par exemple pour conserver vos préférences de langue) peuvent être déposés sur votre navigateur, conformément aux recommandations de la CNIL. Ces cookies ne nécessitent pas de consentement préalable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">4. Analyse d'audience et de performance</h2>
            <p>
              Ce site utilise les outils <strong>Vercel Web Analytics</strong> et <strong>Vercel Speed Insights</strong> pour mesurer de manière anonyme l'audience et les performances techniques des pages. Ces outils sont conçus pour respecter la vie privée (privacy-friendly), n'utilisent aucun cookie de pistage, et ne collectent aucune donnée personnelle identifiable. Ils respectent par défaut les exigences du RGPD et de la directive ePrivacy, et ne nécessitent par conséquent pas de recueil de consentement (bandeau cookies).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">5. Vos droits (RGPD)</h2>
            <p>
              Conformément à la réglementation européenne (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
              <li>Droit d'accès et de rectification.</li>
              <li>Droit à l'effacement (droit à l'oubli).</li>
              <li>Droit d'opposition ou de limitation du traitement.</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, vous pouvez nous contacter directement par e-mail à l'adresse : <a href="mailto:julienjacquemartofficiel@gmail.com" className="text-gold-light hover:underline">julienjacquemartofficiel@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-gold mb-4 tracking-widest">6. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre toutes les mesures de sécurité techniques nécessaires pour protéger vos échanges (le site est sécurisé par un protocole HTTPS) et empêcher tout accès non autorisé à vos informations de contact.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
