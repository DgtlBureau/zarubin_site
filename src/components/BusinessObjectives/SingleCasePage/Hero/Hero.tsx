import {
  Breadcrumb,
  Breadcrumbs,
} from '@/src/components/shared/Breadcrumbs/Breadcrumbs';
import { MenuItems } from '@/src/utils/enums';
import { CaseTag } from '../../Cases/CaseCard/CaseTag/CaseTag';
import Link from 'next/link';

export const Hero = ({
  title,
  industries,
  tag,
  type,
  link,
}: {
  title: string;
  industries: string[];
  tag: string;
  type: string;
  link: string;
}) => {
  const BREADCRUMBS: Breadcrumb[] = [
    { title: 'Main', link: '/' },
    { title: MenuItems.CASES, link: `/${MenuItems.CASES.toLowerCase()}` },
    { title: tag },
  ];

  return (
    <div className='flex flex-col gap-[30px]'>
      <div className='flex flex-col gap-[20px] break-words'>
        <Breadcrumbs
          breadcrumbs={BREADCRUMBS}
          lastLink={link}
          underlineLastLink
        />
        <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.1]  desktop:font-black'>
          {title}
        </h1>
      </div>
      <div className='flex flex-wrap gap-[8px]'>
        <div className='flex items-center rounded-full border-[1px] border-main-orange p-[5px_10px] font-unbound uppercase'>
          <span className='text-[12px]'>{industries[0]}</span>
        </div>
        {industries.slice(1).map((industry) => (
          <div key={industry} className='flex gap-2.5'>
            <CaseTag tag={industry} />
          </div>
        ))}
      </div>
    </div>
  );
};
