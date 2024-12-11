import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = pageMetadata.expertise.title;
const description = contentTrimming(pageMetadata.expertise.description, 155);
const keywords = pageMetadata.expertise.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/playbook`),
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'BrightByte.com',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/playbook`,
  },
  keywords,
};

const data = getAllArticles();

export default function PlaybookPage() {
  return (
    <Suspense fallback={null}>
      <PlaybookClient data={data} category={data} />
    </Suspense>
  );
}
