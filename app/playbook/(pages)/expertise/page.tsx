import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.expertise.title;
const description = contentTrimming(pageMetadata.expertise.description, 155);
const keywords = pageMetadata.expertise.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    alternatesTitle: 'Bright Byte Expertise',
    rssPath: 'playbook/expertise/rss',
    keywords,
    ogUrlPath: 'playbook/expertise',
    ogType: 'article',
  });
}

const expertiseArticles = getExpertiseMetadata();
const sortedExpertiseArticles = postsSorting(expertiseArticles);

export default function ExpertisePage() {
  return (
    <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
      <PlaybookClient data={sortedExpertiseArticles} />
    </Suspense>
  );
}
