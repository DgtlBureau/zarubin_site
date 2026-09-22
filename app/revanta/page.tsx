import { RevantaPage } from '@/src/components/Revanta/RevantaPage/RevantaPage';
import { REVANTA_CONTENT } from '@/src/data/revanta/content';
import { REVANTA_BASE } from '@/src/data/revanta/routes';
import { generateRevantaSchemas } from '@/src/utils/revantaSchema';
import { Seo } from '@/src/utils/Seo/Seo';

const content = REVANTA_CONTENT.hub;

export async function generateMetadata() {
  return Seo({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    ogSiteName: 'Revanta by The BrightByte',
    ogImage: content.heroImage,
    ogImageAlt: content.heroAlt,
    canonicalPath: 'revanta',
    ogUrlPath: 'revanta',
  });
}

export default function RevantaHubPage() {
  const schemas = generateRevantaSchemas(content, REVANTA_BASE, 'Revanta');

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RevantaPage content={content} />
    </>
  );
}
