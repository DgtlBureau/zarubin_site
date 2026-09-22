import { Award, Landmark, Network } from 'lucide-react';
import { ReactNode } from 'react';
import { Container } from '../../shared/Container/Container';
import { ScrollAnimationWrapper } from '../../shared/ScrollAminationWrapper/ScrollAnimationWrapper';

const iconProps = { strokeWidth: 1.8, className: 'h-[30px] w-[30px]' };

const pillars: {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}[] = [
  {
    title: 'Modern technology, end to end',
    description:
      'CRM systems, SMS and push campaigns, mobile and web apps, and marketing support for the product. One team covers the whole customer journey.',
    icon: <Network {...iconProps} />,
    color: '#2947c9',
  },
  {
    title: 'Sports industry expertise',
    description:
      'We have worked with sports clubs and the entertainment industry since 2018. We understand the business side of a club and bring in ideas from other industries.',
    icon: <Landmark {...iconProps} />,
    color: '#0c1f5a',
  },
  {
    title: 'Support after launch',
    description:
      'We stay with the product after release: we maintain it, connect new integrations, add features and stay in touch at every stage.',
    icon: <Award {...iconProps} />,
    color: '#16213E',
  },
];

const directions = [
  'Web',
  'Mobile apps',
  'CRM',
  'SMS campaigns',
  'Integrations',
  'Loyalty programs',
  'Marketing support',
  'Analytics',
];

export const WhyUs = () => {
  return (
    <section className='bg-white py-[40px] tablet:py-[60px]'>
      <Container>
        <div className='grid grid-cols-1 gap-[20px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-[24px]'>
          {pillars.map((pillar) => (
            <ScrollAnimationWrapper
              key={pillar.title}
              className='group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-text-dark/10 bg-card-bg p-[28px] transition-all duration-300 hover:-translate-y-[4px] hover:border-transparent hover:shadow-[0_20px_44px_-28px_rgba(1,18,57,0.35)]'
            >
              <span
                className='pointer-events-none absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-300 group-hover:scale-x-100'
                style={{ background: pillar.color }}
              />
              <span
                className='flex h-[60px] w-[60px] flex-none items-center justify-center rounded-[16px] text-white transition-transform duration-300 group-hover:scale-105'
                style={{
                  background: pillar.color,
                  boxShadow: `0 12px 24px -10px ${pillar.color}66`,
                }}
              >
                {pillar.icon}
              </span>
              <h3 className='mt-[20px] font-inter text-[18px] font-semibold leading-[1.3] text-text-dark'>
                {pillar.title}
              </h3>
              <p className='mt-[10px] font-inter text-[15px] leading-[1.55] text-text-dark/60 tablet:text-[16px]'>
                {pillar.description}
              </p>
            </ScrollAnimationWrapper>
          ))}
        </div>

        <ScrollAnimationWrapper className='mt-[32px] flex flex-col items-center tablet:mt-[40px]'>
          <div className='flex flex-wrap justify-center gap-[8px]'>
            {directions.map((direction) => (
              <span
                key={direction}
                className='rounded-full border border-text-dark/10 bg-white px-[14px] py-[6px] font-inter text-[12px] font-medium text-text-dark/55 transition-colors duration-200 hover:border-main-blue/20 hover:text-text-dark tablet:text-[13px]'
              >
                {direction}
              </span>
            ))}
          </div>
          <p className='mt-[12px] font-inter text-[13px] text-text-dark/40'>
            What we cover
          </p>
        </ScrollAnimationWrapper>
      </Container>
    </section>
  );
};
