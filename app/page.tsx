import { MainPageComponent } from '@/src/components/MainPage/MainPage';
import { generateOrganizationSchema } from '@/src/utils/organizationSchema';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import Script from 'next/script';

export async function generateMetadata() {
  return Seo({
    title: pageMetadata.main.title,
    description: pageMetadata.main.description,
    keywords: pageMetadata.main.keywords,
    canonicalPath: '',
    ogUrlPath: '',
  });
}

export default async function Home() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <MainPageComponent />
    </>
  );
}
