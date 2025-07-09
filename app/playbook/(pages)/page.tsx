import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { MenuItems } from '@/src/utils/enums';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.playbook.title;
const description = contentTrimming(
  pageMetadata.playbook.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.playbook.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    keywords,
    ogUrlPath: `${MenuItems.PLAYBOOK.toLowerCase()}`,
    ogType: 'article',
  });
}

const data = getAllArticles();

export default function PlaybookPage() {
  return (
    <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
      <PlaybookClient data={data} />
    </Suspense>
  );
}
