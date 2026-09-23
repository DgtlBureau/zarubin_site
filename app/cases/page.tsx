import { Cases } from '@/src/components/BusinessObjectives/Cases/Cases';
import { Hero } from '@/src/components/BusinessObjectives/Hero/Hero';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Container } from '@/src/components/shared/Container/Container';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Section } from '@/src/components/shared/Section/Section';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { MenuItems } from '@/src/utils/enums';
import { getCaseMetadata } from '@/src/utils/getCaseMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicInsights = dynamic(() =>
  import('@/src/components/Main/Insights/Insights').then((mod) => mod.Insights),
);

const title = pageMetadata.solutions.title;
const description = contentTrimming(
  pageMetadata.solutions.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.solutions.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    keywords,
    ogUrlPath: MenuItems.CASES.toLowerCase(),
  });
}

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
          {/* No Suspense here: it made the grid stream in after first paint.
              The ?industry= bailout has its own boundary inside Cases. */}
          <Cases cases={sortedCases} />
        </Container>
      </Section>
      <Section id='insights'>
        <ScrollAnimationWrapper>
          <DynamicInsights />
        </ScrollAnimationWrapper>
        <div className='absolute inset-0'>
          {/* Full-width band at the top of the section, height from the image's aspect ratio (5760x1767) */}
          <div className='absolute inset-x-0 top-0 aspect-[5760/1767]'>
            <Image
              src='/assets/images/main/insight_bg.webp'
              fill
              sizes='100vw'
              className='object-cover'
              alt='background image'
            />
          </div>
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
