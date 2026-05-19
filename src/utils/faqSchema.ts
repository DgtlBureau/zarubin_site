export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema);
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || '/assets/images/info/default_image.jpg',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The BrightByte',
      logo: {
        '@type': 'ImageObject',
        url: '/assets/images/info/default_logo.png',
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return JSON.stringify(schema);
}

export interface CollectionPageItem {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  image?: string;
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: CollectionPageItem[];
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'The BrightByte',
      logo: {
        '@type': 'ImageObject',
        url: '/assets/images/info/default_logo.png',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: item.url,
        item: {
          '@type': 'Article',
          headline: item.title,
          description: item.description,
          url: item.url,
          datePublished: item.datePublished,
          image: item.image,
        },
      })),
    },
  };

  return JSON.stringify(schema);
}
