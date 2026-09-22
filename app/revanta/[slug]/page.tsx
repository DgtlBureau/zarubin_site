import { RevantaPage } from '@/src/components/Revanta/RevantaPage/RevantaPage';
import { REVANTA_CONTENT } from '@/src/data/revanta/content';
import { REVANTA_PRODUCTS, revantaHref } from '@/src/data/revanta/routes';
import { generateRevantaSchemas } from '@/src/utils/revantaSchema';
import { Seo } from '@/src/utils/Seo/Seo';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return REVANTA_PRODUCTS.map((p) => ({ slug: p.slug }));
}

const findProduct = (slug: string) =>
  REVANTA_PRODUCTS.find((p) => p.slug === slug);

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = findProduct(slug);
  if (!product) return {};
  const content = REVANTA_CONTENT[product.key];
  const path = revantaHref(slug).slice(1);

  return Seo({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    ogSiteName: 'Revanta by The BrightByte',
    ogImage: content.heroImage,
    ogImageAlt: content.heroAlt,
    canonicalPath: path,
    ogUrlPath: path,
  });
}

export default async function RevantaProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = findProduct(slug);
  if (!product) notFound();
  const content = REVANTA_CONTENT[product.key];
  const schemas = generateRevantaSchemas(
    content,
    revantaHref(slug),
    product.name,
  );

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
