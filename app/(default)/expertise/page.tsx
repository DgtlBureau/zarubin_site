import { ExpertiseTitle } from '@/src/components/Expertise/ExpertiseTitle/ExpertiseTitle';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Insights } from '@/src/components/Main/Insights/Insights';
import { TrustUs } from '@/src/components/Main/TrustUs/TrustUs';
import { Section } from '@/src/components/shared/Section/Section';
import { Container } from '@/src/components/shared/Container/Container';
import { ClientExpertiseItems } from './ClientExpertiseItems';
import { ExpertiseHeroBgSvg } from '@/src/components/svg/ExpertiseHeroBgSvg';
import bgImage from '@/public/assets/images/main/group.png';
import insightBg from '@/public/assets/images/main/insight_bg.png';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Feedback } from '@/src/components/Main/Feedback/Feedback';
import Image from 'next/image';

export default function Expertise() {
  return (
    <>
      <main className='bg-main-bg text-white'>
        <Section id='title' className='overflow-x-hidden overflow-y-hidden'>
          <Container className='relative z-10'>
            <ExpertiseTitle />
          </Container>
          <div className='absolute inset-0 flex after:absolute after:inset-0 after:bg-gradient-to-t after:from-main-bg after:to-transparent'>
            <div className='absolute left-1/2 top-[70px] -translate-x-1/2 desktop:left-1/2 desktop:-translate-x-1/3'>
              <ExpertiseHeroBgSvg />
            </div>
          </div>
        </Section>
        <Section id='virtual-cio' className='pt-0 tablet:pt-0 desktop:pt-0'>
          <ScrollAnimationWrapper showOnLoad>
            <ClientExpertiseItems />
          </ScrollAnimationWrapper>
        </Section>
        <Section id='insights'>
          <ScrollAnimationWrapper>
            <Insights />
          </ScrollAnimationWrapper>
          <div className='absolute inset-0'>
            <Image src={insightBg} className='absolute inset-0' alt='' />
          </div>
        </Section>
        <Section>
          <Container>
            <ScrollAnimationWrapper>
              <TrustUs />
            </ScrollAnimationWrapper>
          </Container>
        </Section>
        <Section id='feedback'>
          <Container>
            <ScrollAnimationWrapper className='relative z-10'>
              <Feedback />
            </ScrollAnimationWrapper>
          </Container>
          <div className='absolute inset-0 bg-[linear-gradient(100deg,#000a25_14.95%,#00248b_92.57%)]'>
            <Image
              src={bgImage}
              className='absolute inset-0 opacity-30 mix-blend-overlay'
              alt=''
            />
          </div>
        </Section>
        <Section
          id='contacts'
          light
          className='py-[40px] tablet:py-[80px] desktop:py-[80px]'
        >
          <Container>
            <ScrollAnimationWrapper>
              <ContactForm />
            </ScrollAnimationWrapper>
          </Container>
        </Section>
      </main>
    </>
  );
}
