import Biography from '@/components/Biography';
import { getBiography } from '@/app/actions/biography';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function BiographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Biography');
  const bioData = await getBiography();

  const content = (bioData as any)[`content_${locale}`] || '';
  const cvUrl = bioData.cvUrl || '/cv-julien-jacquemart.pdf';
  const bioUrl = bioData.bioUrl || '/biographie-julien-jacquemart.pdf';

  return (
    <main className="min-h-screen pt-20 flex flex-col">
      <div className="flex-grow">
        <Biography title={t('title')} content={content} cvUrl={cvUrl} bioUrl={bioUrl} />
      </div>
    </main>
  );
}
