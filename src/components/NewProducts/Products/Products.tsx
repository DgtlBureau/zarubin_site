import { IProduct } from '@/src/utils/types';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { Breadcrumb, Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

const BREADCRUMBS: Breadcrumb[] = [
  { title: 'Main', link: '/' },
  { title: 'Investments' },
];

interface IProducts {
  products: IProduct[];
}

const byDateDesc = (a: IProduct, b: IProduct) =>
  DateTime.fromFormat(b.date, 'dd-MM-yyyy').toMillis() -
  DateTime.fromFormat(a.date, 'dd-MM-yyyy').toMillis();

const formatDate = (date: string) => {
  const parsed = DateTime.fromFormat(date, 'dd-MM-yyyy');
  return parsed.isValid ? parsed.toFormat('LLL yyyy') : '';
};

const ProductCard = ({ item }: { item: IProduct }) => {
  const card = (
    <>
      <div className='relative aspect-[16/10] w-full overflow-hidden bg-card-bg'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          quality={80}
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className={`object-cover object-top transition-transform duration-500 ${
            item.open
              ? 'group-hover:scale-[1.04]'
              : 'scale-[1.01] grayscale group-hover:grayscale-0'
          }`}
        />
        {!item.open && (
          <div className='absolute inset-0 bg-text-dark/10 transition-opacity duration-300 group-hover:opacity-0' />
        )}

        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-[6px] rounded-full px-[10px] py-[5px] font-inter text-[12px] font-medium leading-none ${
            item.open
              ? 'bg-main-blue text-white'
              : 'bg-text-dark/75 text-white backdrop-blur-sm'
          }`}
        >
          <span
            className={`h-[6px] w-[6px] rounded-full ${
              item.open ? 'animate-pulse bg-white' : 'bg-white/70'
            }`}
          />
          {item.open ? 'Live' : 'Closed'}
        </span>
      </div>

      <div className='flex items-center justify-between gap-3 px-5 py-[18px]'>
        <div className='min-w-0'>
          <h3 className='truncate font-unbound text-[18px] font-bold leading-[1.2] text-text-dark'>
            {item.name}
          </h3>
          <span className='font-inter text-[13px] leading-none text-light-gray'>
            {formatDate(item.date)}
          </span>
        </div>
        {item.open && (
          <span
            aria-hidden
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-main-disabled text-text-dark transition-colors duration-300 group-hover:border-main-blue group-hover:bg-main-blue group-hover:text-white'
          >
            <svg
              width='15'
              height='15'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M7 17 17 7' />
              <path d='M8 7h9v9' />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  const baseClass =
    'group relative flex flex-col overflow-hidden rounded-2xl border border-main-disabled bg-white transition-all duration-300';

  if (item.open) {
    return (
      <a
        href={item.link}
        rel='noopener'
        target='_blank'
        aria-label={`Open ${item.name} (opens in a new tab)`}
        className={`${baseClass} hover:-translate-y-1 hover:border-main-blue/40 hover:shadow-[0_22px_45px_-22px_rgba(1,12,44,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue`}
      >
        {card}
      </a>
    );
  }

  return (
    <div className={`${baseClass} opacity-90`} aria-label={`${item.name} (closed)`}>
      {card}
    </div>
  );
};

export const Products = ({ products }: IProducts) => {
  const open = products.filter((item) => item.open).sort(byDateDesc);
  const closed = products.filter((item) => !item.open).sort(byDateDesc);

  return (
    <div className='flex flex-col gap-[40px] tablet:gap-[60px]'>
      <div className='desktop:py-[65px]'>
        <Breadcrumbs light breadcrumbs={BREADCRUMBS} />
        <h1 className='page-headings mt-[20px] font-unbound font-bold uppercase leading-[1.1] text-text-dark desktop:font-black'>
          Investments
        </h1>
        <p className='mt-[21px] max-w-[820px] font-inter text-[16px] leading-[1.25] text-text-dark tablet:mt-[24px] tablet:text-[20px] desktop:mt-[20px]'>
          At The BrightByte, our portfolio includes innovative projects in
          sports and niche industries, crafted in collaboration with top
          companies and forward-thinking investors. From Miami to Luxembourg and
          San Marino, our initiatives are driving progress and community growth.
          Every project we undertake is focused on creating value and fostering
          a positive societal impact.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-[24px] tablet:grid-cols-2 tablet:gap-[28px] desktop:grid-cols-3'>
        {open.map((item) => (
          <ProductCard key={item.slug} item={item} />
        ))}
      </div>

      {closed.length > 0 && (
        <div className='flex flex-col gap-[20px]'>
          <div className='flex items-center gap-4'>
            <span className='font-inter text-[13px] font-medium uppercase tracking-[0.08em] text-light-gray'>
              Closed projects
            </span>
            <span className='h-px flex-1 bg-main-disabled' />
          </div>
          <div className='grid grid-cols-1 gap-[24px] tablet:grid-cols-2 tablet:gap-[28px] desktop:grid-cols-3'>
            {closed.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
