'use client';

import Link from 'next/link';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';
import { FeaturedCaseCard, FeaturedCaseData } from './FeaturedCaseCard';

/**
 * Featured cases data for the main page.
 * Regfo, PersoniWay, JediPay - AI & compliance projects that prove our positioning.
 */
const FEATURED_CASES: FeaturedCaseData[] = [
  {
    slug: 'regfo',
    name: 'Regfo',
    title: 'AI Regulatory Workspace',
    description:
      '1,000+ compliance rules · FDA, ICH & CFTC · Minutes instead of weeks',
    tags: ['FDA Compliance', 'RAG', 'Inference'],
    bannerImage: '/assets/images/info/regfo_compliance_new.webp',
  },
  {
    slug: 'personiway',
    name: 'PersoniWay',
    title: 'AI Field Service & Ticketing',
    description:
      '85% faster issue resolution · RAG-powered · Real-time routing',
    tags: ['AI Agents', 'RAG Systems'],
    bannerImage: '/assets/images/case/banner/personiway.webp',
  },
  {
    slug: 'jedipay',
    name: 'JediPay',
    title: 'PCI-Compliant Payment Gateway',
    description:
      'Automated campaigns · Real-time sync · Trigger-based engagement',
    tags: ['FinTech', 'PCI DSS'],
    bannerImage: '/assets/images/case/banner/jedipay.webp',
  },
];

export const FeaturedCases = () => {
  return (
    <Section light className='pb-[30px] pt-[30px] tablet:pb-[40px] tablet:pt-[40px]'>
      <Container>
        {/* Section header */}
        <div className='mb-[16px] flex items-center justify-between'>
          <span className='font-inter text-[12px] font-semibold uppercase tracking-[0.05em] text-text-dark/50'>
            Latest Projects
          </span>
          <Link
            href='/cases'
            className='group flex items-center gap-[6px] font-inter text-[13px] font-medium text-text-dark/60 transition-all duration-200 hover:gap-[10px] hover:text-main-orange'
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
