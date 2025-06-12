import insightBg from '@/public/assets/images/main/insight_bg.png';
import { Cases } from '@/src/components/BusinessObjectives/Cases/Cases';
import { Hero } from '@/src/components/BusinessObjectives/Hero/Hero';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Container } from '@/src/components/shared/Container/Container';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Section } from '@/src/components/shared/Section/Section';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getCaseMetadata } from '@/src/utils/getCaseMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { DateTime } from 'luxon';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';

const DynamicInsights = dynamic(() =>
  import('@/src/components/Main/Insights/Insights').then((mod) => mod.Insights),
);

const title = pageMetadata.solutions.title;
const description = contentTrimming(pageMetadata.solutions.description, 155);
const keywords = pageMetadata.solutions.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/solutions`),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/solutions`,
  },
  keywords,
};

export default async function BusinessObjectivesPage() {
  const casesMetadata = getCaseMetadata('src/cases');
  const sortedCases = casesMetadata.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;

    const dateA = DateTime.fromFormat(a.date, 'dd-MM-yyyy');
    const dateB = DateTime.fromFormat(b.date, 'dd-MM-yyyy');

    if (!dateA.isValid && !dateB.isValid) return 0;
    if (!dateA.isValid) return 1;
    if (!dateB.isValid) return -1;

    return dateB.toMillis() - dateA.toMillis();
  });
  return (
    <>
      <Section id='hero' className='relative py-0 tablet:py-0 desktop:pb-0'>
        <Container>
          <Hero />
        </Container>
      </Section>
      <Section className='!pt-0'>
        <Container>
          <Suspense>
            <Cases cases={sortedCases} />
          </Suspense>
        </Container>
      </Section>
      <Section id='insights'>
        <ScrollAnimationWrapper>
          <DynamicInsights />
        </ScrollAnimationWrapper>
        <div className='absolute inset-0'>
          <Image
            src={insightBg}
            className='absolute inset-0'
            alt='background image'
          />
        </div>
      </Section>
      <Section
        id='contacts'
        light
        className='py-[40px] tablet:py-[80px] desktop:py-[80px]'
      >
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
