import { BriefClient } from '@/src/components/BriefClient/BriefClient';
import { QuestionProvider } from '@/src/components/Contexts/QuestionContext';
import { Container } from '@/src/components/shared/Container/Container';
import { Section } from '@/src/components/shared/Section/Section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Brief | Start Your Software Development Journey | The BrightByte',
  description:
    'Share your project idea and business goals with The BrightByte. Get a personalized consultation and expert guidance for your software development needs.',
  keywords: [
    'project brief',
    'software development consultation',
    'custom software',
    'business software solutions',
    'enterprise development',
    'tech consulting',
  ],
  openGraph: {
    title: 'Project Brief | Start Your Software Development Journey',
    description:
      'Share your project idea and business goals with The BrightByte. Get a personalized consultation and expert guidance for your software development needs.',
    type: 'website',
    url: 'https://thebrightbyte.com/brief',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Brief | The BrightByte',
    description:
      'Share your project idea and get expert guidance for your software development needs.',
  },
  alternates: {
    canonical: 'https://thebrightbyte.com/brief',
  },
};

export default function Brief() {
  return (
    <Section id='brief' light>
      <Container className='tablet:px-[40px]'>
        <QuestionProvider>
          <BriefClient />
        </QuestionProvider>
      </Container>
    </Section>
  );
}
