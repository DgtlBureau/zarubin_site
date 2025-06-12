import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
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
          title: 'The BrightByte Insights',
          url: `${BASE_URL}/playbook/insights/rss`,
        },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/playbook/insights`,
  },
  keywords,
};

const insightsArticles = getInsightsMetadata();
const sortedInsightsArticles = postsSorting(insightsArticles);

export default function InsightsPage() {
  return (
    <div className='h-full w-full'>
      <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
        <PlaybookClient data={sortedInsightsArticles} />
      </Suspense>
    </div>
  );
}
