import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';
import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: 'Career' },
];

export const Hero = () => {
  return (
    <div className={`flex flex-col gap-[20px] break-words pb-[60px]`}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.14] desktop:font-black'>
        <NextLinePreposition tag='span' text='Build AI Agents' className='' />
        <br />
        <span className='text-stroke page-headings desktop:leading-[1.22]'>
          that actually ship
        </span>
      </h1>
    </div>
  );
};
