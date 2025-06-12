import HeroBg from '@/public/assets/images/career/hero_banner.png';
import { ContactForm } from '@/src/components/Career/ContactForm/ContactForm';
import { Hero } from '@/src/components/Career/Hero/Hero';
import { Internship } from '@/src/components/Career/Internship/Internship';
import { Team } from '@/src/components/Career/Team/Team';
import { Container } from '@/src/components/shared/Container/Container';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Section } from '@/src/components/shared/Section/Section';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './Career.module.css';

const DynamicValues = dynamic(() =>
  import('@/src/components/Career/Values/Values').then((mod) => mod.Values),
);
const DynamicVacancies = dynamic(() =>
  import('@/src/components/Career/Vacanices/Vacancies').then(
    (mod) => mod.Vacancies,
  ),
);

const title = pageMetadata.career.title;
const description = contentTrimming(pageMetadata.career.description, 155);
const keywords = pageMetadata.career.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/career`),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/career`,
  },
  keywords,
};

export default async function CareerPage() {
  return (
    <>
      <Section
        id='hero'
        className={`${styles.heroContainer} relative tablet:px-0`}
      >
        <Container>
          <Hero />
          <div className='absolute inset-0 -z-10'>
            <Image
              src={HeroBg}
              priority
              alt='background image'
              objectPosition='top'
              objectFit='cover'
              layout='fill'
            />
          </div>
        </Container>
      </Section>
      <Section id='team'>
        <Container>
          <ScrollAnimationWrapper showOnLoad>
            <Team />
          </ScrollAnimationWrapper>
        </Container>
      </Section>
      <div className='flex flex-col-reverse'>
        <Section
          id='values'
          className='py-[80px] tablet:py-[80px] desktop:py-[80px]'
          light
        >
          <Container>
            <ScrollAnimationWrapper>
              <DynamicValues />
            </ScrollAnimationWrapper>
          </Container>
        </Section>
        <Section
          id='vacancies'
          className='bg-[linear-gradient(99.79deg,#000A25_14.95%,#00248B_92.57%)] py-[80px] tablet:py-[80px] desktop:py-[80px]'
        >
          <Container>
            <ScrollAnimationWrapper>
              <DynamicVacancies withRowsBtn={false} isSwipe={false} />
            </ScrollAnimationWrapper>
          </Container>
        </Section>
      </div>
      <Section>
        <Container>
          <Internship />
        </Container>
      </Section>
      <Section
        id='contacts'
        className='py-[80px] tablet:py-[80px] desktop:py-[80px]'
        light
      >
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
