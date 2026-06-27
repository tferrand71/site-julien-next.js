import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Playfair_Display, Lato } from 'next/font/google';
import '../globals.css';

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

export const metadata = {
  title: "Julien Jacquemart | Chef d'Orchestre",
  description: "Portfolio de Julien Jacquemart, chef d'orchestre professionnel et tromboniste.",
};

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

  return (
    <html lang={locale} className={`${playfair.variable} ${lato.variable}`} suppressHydrationWarning>
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
