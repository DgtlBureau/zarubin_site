import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: 'Comparison' },
];

export const Hero = () => {
  return (
    <div className='flex flex-col gap-[20px] break-words pb-[60px]'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='page-headings z-[5] font-unbound font-bold uppercase leading-[1.14] desktop:font-black'>
        <span className='text-stroke desktop:leading-[1.22] desktop-hard:text-[100px]'>
          How We Compare
        </span>
        <br />
        The BrightByte
      </h1>
      <p className='z-[5] max-w-[900px] font-proxima text-[16px] font-normal leading-[1.2] tablet:text-[20px] desktop:text-[20px] desktop-hard:text-[20px]'>
        We deliver Big 4 consultancy expertise with the speed and efficiency
        of a dedicated in-house team — without the overhead of either.
        See how The BrightByte stands apart.
      </p>
    </div>
  );
};
