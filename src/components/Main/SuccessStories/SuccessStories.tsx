'use client';

import { NextPrevBtn } from '@/src/ui-kit/NextPrevBtn/NextPrevBtn';
import { Case } from '@/src/utils/getCaseMetadata';
import { sectionsTitle } from '@/src/utils/sectionsTitle/sectionsTitle';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Container } from '../../shared/Container/Container';
import { Section } from '../../shared/Section/Section';
import useMediaQuery from '@/src/utils/useMediaQuery';

interface SuccessStoriesProps {
  cases: Case[];
}

// Get readable tech label
const getTechStack = (instruments: string[]): string[] => {
  const techMap: Record<string, string> = {
    claude: 'Claude AI',
    python: 'Python',
    react: 'React',
    ml: 'ML',
    flutter: 'Flutter',
    laravel: 'Laravel',
    next: 'Next.js',
    unity: 'Unity',
  };

  return instruments
    .slice(0, 3)
    .map((i) => techMap[i.toLowerCase()] || i);
};

// Get KPI for each case
const getCaseKPI = (slug: string): { value: string; label: string } | null => {
  const kpis: Record<string, { value: string; label: string }> = {
    personiway: { value: '-60%', label: 'Detection Time' },
    oazis: { value: '10K+', label: 'Workers Managed' },
    jedipay: { value: '99.9%', label: 'Uptime SLA' },
    grid_capital: { value: '3 weeks', label: 'To MVP' },
    fcdm: { value: '2.1M', label: 'Active Users' },
    avangard: { value: '+340%', label: 'Engagement' },
    nis: { value: '-40%', label: 'Process Time' },
    torpedo: { value: '85K+', label: 'App Users' },
    norilsk: { value: '+120%', label: 'Digital Sales' },
  };
  return kpis[slug] || null;
};

export const SuccessStories = ({ cases }: SuccessStoriesProps) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const mobile = useMediaQuery('<tablet');
  const tablet = useMediaQuery('<laptop');
  const isStillTablet = useMediaQuery('>mobile');
  const isTablet = tablet === isStillTablet;

  // Take 6 most recent cases
  const displayCases = cases.slice(0, 6);

  if (displayCases.length === 0) return null;

  return (
    <Section light className="pt-[30px] tablet:pt-[40px]">
      <div className="flex flex-col gap-[40px] pb-10">
        <Container>
          <div className="flex items-start justify-between desktop:items-center">
            <div className="flex flex-col gap-[12px]">
              <Link href="/cases" className="group flex items-center gap-2">
                <h2 className="font-proxima text-[13px] font-semibold uppercase tracking-[0.1em] text-text-muted transition-colors group-hover:text-text-dark tablet:text-[14px]">
                  {sectionsTitle['main']['successStories'].title}
                </h2>
                <span className="font-proxima text-[13px] text-text-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </Link>
              <p className="font-proxima text-[14px] leading-[1.5] text-light-gray tablet:text-[15px]">
                {sectionsTitle['main']['successStories'].descripton}
              </p>
            </div>
            <div>
              <NextPrevBtn
                nextPage={() => swiper?.slideNext()}
                prevPage={() => swiper?.slidePrev()}
                bg="light"
              />
            </div>
          </div>
        </Container>

        <Container className="flex max-w-full pr-0 tablet:pr-0">
          <Swiper
            spaceBetween={mobile || isTablet ? 16 : 24}
            slidesPerView={mobile ? 1.1 : isTablet ? 2 : 3}
            onSwiper={setSwiper}
          >
            {displayCases.map((caseItem) => {
              const kpi = getCaseKPI(caseItem.slug);
              const techStack = getTechStack(caseItem.instruments || []);

              return (
                <SwiperSlide key={caseItem.slug}>
                  <Link
                    href={`/cases/${caseItem.slug}`}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-[12px] border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
                      {/* Image */}
                      <div className="relative h-[180px] overflow-hidden bg-gray-100">
                        {caseItem.bannerImage && (
                          <Image
                            src={caseItem.bannerImage}
                            alt={caseItem.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        {/* KPI Badge */}
                        {kpi && (
                          <div className="absolute bottom-3 left-3 rounded-[8px] bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-inter text-[18px] font-bold leading-none text-text-dark">
                              {kpi.value}
                            </div>
                            <div className="mt-1 font-inter text-[11px] text-gray-500">
                              {kpi.label}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Name & Type */}
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-inter text-[11px] font-medium uppercase tracking-wide text-gray-400">
                            {caseItem.type}
                          </span>
                          {caseItem.logo && (
                            <Image
                              src={caseItem.logo}
                              alt={`${caseItem.name} logo`}
                              width={24}
                              height={24}
                              className="h-6 w-auto object-contain opacity-60"
                            />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 font-inter text-[15px] font-semibold leading-[1.3] text-text-dark line-clamp-2">
                          {caseItem.title}
                        </h3>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gray-50 px-2.5 py-1 font-inter text-[11px] text-gray-500"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </div>
    </Section>
  );
};
