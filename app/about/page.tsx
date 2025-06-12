import { Hero } from '@/src/components/About/Hero/Hero';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Container } from '@/src/components/shared/Container/Container';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Section } from '@/src/components/shared/Section/Section';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DynamicInsights = dynamic(() =>
  import('@/src/components/About/Insights/Insights').then(
    (mod) => mod.Insights,
  ),
);
const DynamicIndustries = dynamic(() =>
  import('@/src/components/About/Industries/Industries').then(
    (mod) => mod.Industries,
  ),
);
const DynamicTeam = dynamic(() =>
  import('@/src/components/About/Team/Team').then((mod) => mod.Team),
);
const DynamicCards = dynamic(() =>
  import('@/src/components/About/Cards/Cards').then((mod) => mod.Cards),
);
const DynamicTechnology = dynamic(() =>
  import('@/src/components/About/Technology/Technology').then(
    (mod) => mod.Technology,
  ),
);
const DynamicDirection = dynamic(() =>
  import('@/src/components/About/Vacancy/Direction/Direction').then(
    (mod) => mod.Direction,
  ),
);
const DynamicVacancy = dynamic(() =>
  import('@/src/components/About/Vacancy/Vacancy').then((mod) => mod.Vacancy),
);

const title = pageMetadata.about.title;
const description = contentTrimming(pageMetadata.about.description, 155);
const keywords = pageMetadata.about.keywords;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: new URL(`${BASE_URL}/about`),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte',
    ...openGraphImage,
    title,
    description,
    url: `${BASE_URL}/about`,
  },
  keywords,
};

export default function About() {
  return (
    <>
      <Section
        id='hero'
        className='mt-[60px] px-0  py-0  tablet:py-0 desktop:py-0'
      >
        <Container className='tablet:px-0 desktop:px-0 desktop:py-0'>
          <Hero />
        </Container>
      </Section>
      <Section id='insights' className='py-0 tablet:py-0 desktop:py-0'>
        <Container className='tablet:px-[40px] desktop:px-0'>
          <DynamicInsights />
        </Container>
      </Section>
      <Section id='industries' className='py-0 tablet:py-0 desktop:py-0'>
        <ScrollAnimationWrapper>
          <Container className='tablet:px-[40px] desktop:px-0'>
            <DynamicIndustries />
          </Container>
        </ScrollAnimationWrapper>
      </Section>
      <Section id='team'>
        <ScrollAnimationWrapper>
          <Container>
            <DynamicTeam />
          </Container>
        </ScrollAnimationWrapper>
      </Section>
      <Section id='cards' className='py-0 tablet:py-0 desktop:py-0'>
        <ScrollAnimationWrapper>
          <Container className='tablet:px-[40px]'>
            <DynamicCards />
          </Container>
        </ScrollAnimationWrapper>
      </Section>
      <Section id='technologies' className='py-0 tablet:py-0 desktop:py-0'>
        <ScrollAnimationWrapper>
          <Container>
            <DynamicTechnology />
          </Container>
        </ScrollAnimationWrapper>
      </Section>
      <div>
        <Section id='vacancy' className='tablet:pt-[0]'>
          <ScrollAnimationWrapper>
            <Container>
              <DynamicDirection />
            </Container>
          </ScrollAnimationWrapper>
        </Section>
        <Section
          id='vacancy'
          className='bg-gradient-to-r from-dark-blue to-main-blue'
        >
          <ScrollAnimationWrapper>
            <Container>
              <DynamicVacancy />
            </Container>
          </ScrollAnimationWrapper>
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
      </div>
    </>
  );
}
