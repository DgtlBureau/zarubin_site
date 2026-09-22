import { REVANTA_BASE, REVANTA_LINKEDIN } from '@/src/data/revanta/routes';
import { RevantaPageContent } from '@/src/data/revanta/types';
import { BASE_URL } from './alias';

const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const REVANTA_ID = `${BASE_URL}${REVANTA_BASE}#software`;

export function generateRevantaSchemas(
  content: RevantaPageContent,
  path: string,
  name: string,
) {
  const url = `${BASE_URL}${path}`;
  const isHub = content.key === 'hub';

  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': isHub ? REVANTA_ID : `${url}#software`,
    name,
    url,
    description: content.seo.description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Sports management software',
    operatingSystem: 'Web',
    image: `${BASE_URL}${content.heroImage}`,
    brand: { '@type': 'Brand', name: 'Revanta', sameAs: [REVANTA_LINKEDIN] },
    ...(isHub ? { sameAs: [REVANTA_LINKEDIN] } : {}),
    publisher: { '@id': ORGANIZATION_ID },
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'The BrightByte',
      url: BASE_URL,
    },
    ...(isHub ? {} : { isPartOf: { '@id': REVANTA_ID } }),
    offers: {
      '@type': 'Offer',
      url: `${url}#contact`,
      availability: 'https://schema.org/InStock',
      description:
        'Pricing depends on the modules and the size of the organisation. Book a demo for a quote.',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'The BrightByte',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Revanta',
        item: `${BASE_URL}${REVANTA_BASE}`,
      },
      ...(isHub ? [] : [{ '@type': 'ListItem', position: 3, name, item: url }]),
    ],
  };

  return [software, faq, breadcrumbs];
}
