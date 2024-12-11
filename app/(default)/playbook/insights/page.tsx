import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { getPostMetadata } from '@/src/utils/getPostMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = pageMetadata.insights.title;
const description = contentTrimming(pageMetadata.insights.description, 155);
const keywords = pageMetadata.insights.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/playbook/insights`),
    types: {
      'application/rss+xml': [
        {
          title: 'Bright Byte Insights',
          url: `${BASE_URL}/playbook/insights/rss`,
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
    url: `${BASE_URL}/playbook/insights`,
  },
  keywords,
};

const insightsArticles = getPostMetadata('src/posts');
const sortedInsightsArticles = postsSorting(insightsArticles);
const categories = getAllArticles();

export default function InsightsPage() {
  return (
    <Suspense fallback={null}>
      <PlaybookClient data={sortedInsightsArticles} category={categories} />
    </Suspense>
  );
}
