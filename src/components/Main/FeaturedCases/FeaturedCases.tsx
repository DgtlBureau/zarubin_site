'use client';

import Link from 'next/link';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';
import { FeaturedCaseCard, FeaturedCaseData } from './FeaturedCaseCard';

/**
 * Featured cases data for the main page.
 * OAZIS, Avangard, Torpedo - latest projects showcasing key capabilities.
 */
const FEATURED_CASES: FeaturedCaseData[] = [
  {
    slug: 'oazis',
    name: 'OAZIS',
    title: 'Workforce Management Platform',
    description:
      'Corporate system for managing rotational workers, accommodation, and catering services.',
    tags: ['Workflow Automation', 'Management'],
    bannerImage: '/assets/images/case/banner/oasis-case.webp',
  },
  {
    slug: 'avangard',
    name: 'HC Avangard',
    title: 'Fan Engagement & Loyalty Platform',
    description:
      'Native mobile application with CRM integration and loyalty rewards for personalized fan experience.',
    tags: ['CRM Integration', 'Mobile Apps'],
    bannerImage: '/assets/images/case/banner/avangard-case.webp',
  },
  {
    slug: 'torpedo',
    name: 'HC Torpedo',
    title: 'Digital Fan Engagement Ecosystem',
    description:
      'Digital ecosystem with mobile app, CRM, and analytics for fan interaction, ticket sales, and loyalty programs.',
    tags: ['AI Integration', 'Security'],
    bannerImage: '/assets/images/case/banner/torpedo-case.webp',
  },
];

export const FeaturedCases = () => {
  return (
    <Section light className='pb-[30px] pt-[30px] tablet:pb-[40px] tablet:pt-[40px]'>
      <Container>
        {/* Section header */}
        <div className='mb-[16px] flex items-center justify-between'>
          <span className='font-proxima text-[12px] font-semibold uppercase tracking-[0.05em] text-text-dark/50'>
            Latest Projects
          </span>
          <Link
            href='/cases'
            className='group flex items-center gap-[6px] font-proxima text-[13px] font-medium text-text-dark/60 transition-all duration-200 hover:gap-[10px] hover:text-main-orange'
          >
            View all cases
            <span className='transition-transform duration-200 group-hover:translate-x-1'>
              &rarr;
            </span>
          </Link>
        </div>

        {/* Cases grid - 3 columns on desktop, 2 on tablet (hide 3rd), 1 on mobile */}
        <div className='grid grid-cols-1 gap-[24px] tablet:grid-cols-2 desktop:grid-cols-3'>
          {FEATURED_CASES.map((caseData, idx) => (
            <FeaturedCaseCard
              key={caseData.slug}
              data={caseData}
              className={idx === 2 ? 'hidden tablet:hidden desktop:block' : ''}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};
