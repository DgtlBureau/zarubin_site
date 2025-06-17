import {
    BASE_URL,
    DEFAULT_SEO_ALTERNATES_TITLE,
    SITE_NAME
} from '@/src/utils/alias';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { Metadata } from 'next';
import { pageMetadata } from '../pageMetadata';

type IOgType = 'website' | 'article' | 'book' | 'profile';

interface ISeo {
  title: string;
  description: string;
  keywords?: string[];
  alternatesTitle?: string;
  ogType?: IOgType;
  ogSiteName?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonicalPath?: string;
  rssPath?: string;
  ogUrlPath?: string;
}

const defaultKeywords = pageMetadata.main.keywords;

export function Seo({
  title,
  description,
  alternatesTitle,
  canonicalPath,
  rssPath,
  ogType = 'website',
  keywords,
  ogSiteName,
  ogImage,
  ogImageAlt,
  ogUrlPath,
}: ISeo): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: '/favicon.svg',
    },
    alternates: {
      canonical: new URL(`${BASE_URL}/${canonicalPath || ''}`),
      types: alternatesTitle
        ? {
            'application/rss+xml': [
              {
                title: alternatesTitle || DEFAULT_SEO_ALTERNATES_TITLE,
                url: `${BASE_URL}/${rssPath || 'rss'}`,
              },
            ],
          }
        : undefined,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      siteName: ogSiteName || SITE_NAME,
      ...openGraphImage(ogImage, ogImageAlt),
      title,
      description,
      url: `${BASE_URL}/${ogUrlPath || ''}`,
    },

    keywords: keywords || defaultKeywords,
  };
}
