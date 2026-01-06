import { Case } from '@/src/utils/getCaseMetadata';
import dynamic from 'next/dynamic';

const DynamicCasesCard = dynamic(() =>
  import('../CaseCard/CaseCard').then((mod) => mod.CaseCard),
);

const sortingCase: Record<string, number> = {
  OAZIS: 1,
  Avangard: 2,
  'HC Torpedo': 3,
  FCDM: 4,
  'STOCKS SOCCER': 5,
  'HC Norilsk': 6,
  't-bank': 7,
  'Grid Capital': 8,
  Jedipay: 9,
  Atom: 10,
  Personiway: 11,
  NIS: 12,
};

export const CasesGrid = ({ cases }: { cases: Case[] }) => {
  const sortedCases = [...cases].sort((a, b) => {
    const aOrder = sortingCase[a.tag] ?? Number.MAX_SAFE_INTEGER;
    const bOrder = sortingCase[b.tag] ?? Number.MAX_SAFE_INTEGER;

    return aOrder - bOrder;
  });

  return (
    <div className='grid grid-cols-1 gap-[40px] tablet:grid-cols-2 desktop:grid-cols-3'>
      {sortedCases.map((item) => (
        <DynamicCasesCard key={item.title} data={item} />
      ))}
    </div>
  );
};
