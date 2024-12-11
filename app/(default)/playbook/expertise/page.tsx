import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
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
    canonical: new URL(`${BASE_URL}/playbook/expertise`),
    types: {
      'application/rss+xml': [
        {
          title: 'Bright Byte Expertise',
          url: `${BASE_URL}/playbook/expertise/rss`,
        },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte.com',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/playbook/expertise`,
  },
  keywords,
};

const expertiseArticles = getExpertiseMetadata();
const sortedExpertiseArticles = postsSorting(expertiseArticles);
const categories = getAllArticles();

export default function ExpertisePage() {
  return (
    <Suspense fallback={null}>
      <PlaybookClient data={sortedExpertiseArticles} category={categories} />
    </Suspense>
  );
}
