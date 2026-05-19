import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { MenuItems } from '@/src/utils/enums';
import { generateCollectionPageSchema } from '@/src/utils/faqSchema';
import { getComplianceMetadata } from '@/src/utils/getComplianceMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import { Suspense } from 'react';

const title = pageMetadata.compliance.title;
const description = contentTrimming(pageMetadata.compliance.description, 155);
const keywords = pageMetadata.compliance.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    alternatesTitle: 'The BrightByte Compliance',
    rssPath: `${MenuItems.PLAYBOOK.toLowerCase()}/compliance/rss`,
    keywords,
    ogUrlPath: `${MenuItems.PLAYBOOK.toLowerCase()}/compliance`,
    ogType: 'article',
  });
}

const complianceArticles = getComplianceMetadata();
const sortedComplianceArticles = postsSorting(complianceArticles);

const HUB_URL = `${BASE_URL}/playbook/compliance`;

export default function CompliancePage() {
  const schemaJson = generateCollectionPageSchema({
    name: 'AI Compliance for Regulated Industries',
    description,
    url: HUB_URL,
    items: sortedComplianceArticles.map((a) => ({
      title: a.title,
      description: a.description,
      url: `${HUB_URL}/${a.slug}`,
      datePublished: a.date,
      image: a.image,
    })),
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Suspense fallback={<div className='h-screen w-full bg-white'></div>}>
        <PlaybookClient data={sortedComplianceArticles} />
      </Suspense>
    </>
  );
}
