import { Case } from '@/src/utils/getCaseMetadata';
import dynamic from 'next/dynamic';

const DynamicCasesCard = dynamic(() =>
  import('../CaseCard/CaseCard').then((mod) => mod.CaseCard),
);

const sortingCase = {
  Avangard: 1,
  FCDM: 2,
};

export const CasesGrid = ({ cases }: { cases: Case[] }) => {
  return (
    <div className='grid grid-cols-1 gap-[40px] tablet:grid-cols-2 desktop:grid-cols-3'>
      {cases.map((item) => (
        <DynamicCasesCard key={item.title} data={item} />
      ))}
    </div>
  );
};
