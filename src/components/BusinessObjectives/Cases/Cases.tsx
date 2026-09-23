'use client';

import { Case } from '@/src/utils/getCaseMetadata';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Tag } from '../../shared/Tag/Tag';
import { CasesGrid } from './CasesGrid/CasesGrid';

const INDUSTRY_QUERY_PARAM = 'industry';
const ALL_TAG = 'All';

/**
 * Applies `?industry=` to the filter. useSearchParams() makes a static page
 * bail out to client-side rendering up to the nearest Suspense boundary, so it
 * lives in this render-nothing child with its own boundary: the case grid is
 * then part of the static HTML instead of appearing after hydration (which
 * pushed everything below it down: CLS ~0.8 on /cases).
 */
const IndustryQuerySync = ({
  onIndustry,
}: {
  onIndustry: (industry: string) => void;
}) => {
  const queryIndustry = useSearchParams().get(INDUSTRY_QUERY_PARAM);
  useEffect(() => {
    if (queryIndustry) onIndustry(queryIndustry);
  }, [queryIndustry, onIndustry]);
  return null;
};

export const Cases = ({ cases }: { cases: Case[] }) => {
  const tags = new Set(
    cases.flatMap((item) =>
      item.industries.map((industry) => industry.toLocaleLowerCase()),
    ),
  );

  const [selectedTag, setSelectedTag] = useState(ALL_TAG);

  const filteredCasesData = cases.filter(
    (item) =>
      selectedTag === ALL_TAG ||
      item.industries
        .map((industry) => industry.toLocaleLowerCase())
        .includes(selectedTag),
  );
  return (
    <div className='flex flex-col gap-[60px]'>
      <Suspense fallback={null}>
        <IndustryQuerySync onIndustry={setSelectedTag} />
      </Suspense>
      <div className='hide-scrollbar flex gap-2 overflow-x-auto'>
        <Tag selected={selectedTag === ALL_TAG} onClick={setSelectedTag}>
          {ALL_TAG}
        </Tag>
        {[...tags].map((tag) => (
          <Tag
            key={tag}
            selected={tag === selectedTag}
            onClick={setSelectedTag}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <CasesGrid cases={filteredCasesData} />
    </div>
  );
};
