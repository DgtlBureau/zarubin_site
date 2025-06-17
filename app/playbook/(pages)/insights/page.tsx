import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.insights.title;
const description = contentTrimming(pageMetadata.insights.description, 155);
const keywords = pageMetadata.insights.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    keywords,
    rssPath: 'playbook/insights/rss',
    alternatesTitle: 'The BrightByte Insights',
    ogUrlPath: 'playbook/insights',
    ogType: 'article',
  });
}

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
