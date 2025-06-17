import HeroBg from '@/public/assets/images/comparison/hero_banner.webp';
import { ContactForm } from '@/src/components/Comparison/ContactForm/ContactForm';
import { Hero } from '@/src/components/Comparison/Hero/Hero';
import Table from '@/src/components/Comparison/Table';
import { Container } from '@/src/components/shared/Container/Container';
import { Section } from '@/src/components/shared/Section/Section';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import Image from 'next/image';
import styles from './Comparison.module.css';

const title = pageMetadata.comparison.title;
const description = contentTrimming(
  pageMetadata.comparison.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.comparison.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    keywords,
    ogUrlPath: 'comparison',
  });
}

export default async function ComparisonPage() {
  return (
    <>
      <Section id='hero' className={`${styles.heroContainer} relative`}>
        <Container>
          <Hero />
        </Container>
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
      </Section>
      <Container>
        <Table />
      </Container>
      <div>
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
