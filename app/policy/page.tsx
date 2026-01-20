import { Privacy } from '@/src/components/Privacy/Privacy';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Metadata } from 'next';

const title = pageMetadata.privacyPolicy.title;
const description = contentTrimming(
  pageMetadata.privacyPolicy.description,
  155,
);
const keywords = pageMetadata.privacyPolicy.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/policy`),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The BrightByte',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/policy`,
  },
  keywords,
};

export default function PrivacyPage() {
  return <Privacy />;
}
