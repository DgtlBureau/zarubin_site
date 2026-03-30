import { MainPageComponent } from '@/src/components/MainPage/MainPage';
import { generateOrganizationSchema } from '@/src/utils/organizationSchema';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <MainPageComponent />
    </>
  );
}
