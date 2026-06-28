import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Playfair_Display, Lato } from 'next/font/google';
import '../globals.css';
import type { Metadata } from 'next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MusicalBackground from '@/components/MusicalBackground';

const SITE_URL = 'https://julienjacquemart.com';

const metaTitles: Record<string, string> = {
  fr: "Julien Jacquemart | Chef d'Orchestre",
  en: "Julien Jacquemart | Conductor",
  de: "Julien Jacquemart | Dirigent",
  es: "Julien Jacquemart | Director de Orquesta",
};

const metaDescriptions: Record<string, string> = {
  fr: "Portfolio de Julien Jacquemart, chef d'orchestre, tromboniste et pédagogue. Directeur Musical du Brass Band Æolus et de l'Orchestre d'Harmonie d'Épehy.",
  en: "Portfolio of Julien Jacquemart, conductor, trombonist and educator. Music Director of the Brass Band Æolus and the Épehy Wind Orchestra.",
  de: "Portfolio von Julien Jacquemart, Dirigent, Posaunist und Pädagoge. Musikalischer Leiter der Brass Band Æolus und des Épehy Wind Orchestra.",
  es: "Portfolio de Julien Jacquemart, director de orquesta, trombonista y educador. Director Musical de la Brass Band Æolus y de la Orquesta de Vientos de Épehy.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: metaTitles[locale] || metaTitles.fr,
      template: `%s | Julien Jacquemart`,
    },
    description: metaDescriptions[locale] || metaDescriptions.fr,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        es: `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title: metaTitles[locale] || metaTitles.fr,
      description: metaDescriptions[locale] || metaDescriptions.fr,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Julien Jacquemart',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/photo.jpg`,
          width: 1200,
          height: 630,
          alt: 'Julien Jacquemart - Chef d\'Orchestre',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitles[locale] || metaTitles.fr,
      description: metaDescriptions[locale] || metaDescriptions.fr,
      images: [`${SITE_URL}/photo.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // JSON-LD Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Julien Jacquemart',
    url: SITE_URL,
    image: `${SITE_URL}/photo.jpg`,
    jobTitle: locale === 'en' ? 'Conductor' : locale === 'de' ? 'Dirigent' : locale === 'es' ? 'Director de Orquesta' : "Chef d'Orchestre",
    description: metaDescriptions[locale] || metaDescriptions.fr,
    sameAs: [
      'https://www.facebook.com/profile.php?id=100006356208603',
      'https://www.instagram.com/jujujacquemart/',
      'https://www.linkedin.com/in/julienjacquemartchefdorchestre/',
    ],
    knowsAbout: ['Orchestral Conducting', 'Trombone', 'Music Education', 'Brass Band'],
    affiliation: [
      {
        '@type': 'MusicGroup',
        name: 'Brass Band Æolus',
        url: SITE_URL,
      },
    ],
  };

  return (
    <html lang={locale} className={`${playfair.variable} ${lato.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-gold selection:text-background relative overflow-x-hidden">
        <MusicalBackground />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="relative z-10 flex-grow flex flex-col">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
