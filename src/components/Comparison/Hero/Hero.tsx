import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: 'Comparison' },
];

export const Hero = () => {
  return (
    <div className='flex flex-col gap-[20px] break-words pb-[60px]'>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className='z-[5] font-unbound text-[32px] font-bold uppercase leading-[1.14] mobile-big:text-[50px] tablet:text-[60px] desktop:text-[80px] desktop:font-black desktop-hard:text-[100px]'>
        <span className='text-stroke desktop:leading-[1.22] desktop-hard:text-[100px]'>
          Freelancers, Custom Development,
        </span>
        <br />
        The BrightByte
      </h1>
      <p className='z-[5] max-w-[900px] font-proxima text-[16px] font-normal leading-[1.2] tablet:text-[20px] desktop:text-[20px] desktop-hard:text-[20px]'>
        The BrightByte is an excellent alternative to a traditional development
        studio and, even more so, to freelancers. We are often asked about the
        differences in approaches. Below is a comparative table.
      </p>
    </div>
  );
};
