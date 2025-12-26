import {
  Breadcrumb,
  Breadcrumbs,
} from '@/src/components/shared/Breadcrumbs/Breadcrumbs';
import { MenuItems } from '@/src/utils/enums';

export const Hero = ({
  title,
  industries,
  tag,
}: {
  title: string;
  industries: string[];
  tag: string;
}) => {
  const BREADCRUMBS: Breadcrumb[] = [
    { title: 'Main', link: '/' },
    { title: MenuItems.CASES, link: `/${MenuItems.CASES.toLowerCase()}` },
    { title: tag },
  ];

  return (
    <div className='flex flex-col gap-[30px]'>
      <div className='flex flex-col gap-[20px] break-words'>
        <Breadcrumbs breadcrumbs={BREADCRUMBS} />
        <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.1]  desktop:font-black'>
          {title}
        </h1>
      </div>
      <div className='flex flex-wrap gap-[8px]'>
        {industries.map((industry) => (
          <div
            key={industry}
            className='flex items-start justify-start gap-2.5 rounded-sm bg-white p-2.5'
          >
            <div className='whitespace-wrap font-unbound text-[16px] font-bold uppercase leading-[1] text-text-dark'>
              {industry}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
