import arena from '@/public/assets/images/main/heroSlide/hero-revanta-arena.webp';
import {
  REVANTA_BASE,
  REVANTA_IMAGES,
  REVANTA_PRODUCTS,
  revantaHref,
} from '@/src/data/revanta/routes';
import { aspectOf, coverSizes, WIDE } from '@/src/utils/imageSizes';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  onClick: () => void;
}

/** Mega menu for Revanta: flagship on the left, product pages on the right. */
export const RevantaSubMenu = ({ onClick }: Props) => (
  <div className='w-[min(1200px,calc(100vw-40px))] py-[36px]'>
    <div className='grid grid-cols-[minmax(0,340px)_1fr] gap-[48px]'>
      <Link
        prefetch={false}
        href={REVANTA_BASE}
        onClick={onClick}
        className='group flex flex-col'
      >
        <div className='relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10'>
          <Image
            src={arena}
            alt='Revanta'
            fill
            sizes={coverSizes(aspectOf(arena), [
              { minWidth: 0, px: 340, boxAspect: WIDE },
            ])}
            className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10' />
          <div className='absolute inset-0 flex items-center justify-center gap-[10px]'>
            <Image
              src={`${REVANTA_IMAGES}/wordmark-white.webp`}
              alt=''
              width={1611}
              height={235}
              sizes='130px'
              className='h-auto w-[130px]'
            />
          </div>
        </div>
        <span className='mt-[16px] font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7C9BFF]'>
          Sports club software for clubs, fans and venues
        </span>
        <span className='mt-[6px] font-inter text-[27px] font-light leading-[1.05] tracking-[-0.02em] text-white transition-colors group-hover:text-[#7C9BFF]'>
          Revanta
        </span>
        <span className='mt-[12px] w-fit font-inter text-[15px] font-medium text-white/80'>
          Explore the platform →
        </span>
      </Link>

      <div>
        <span className='font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/40'>
          Products
        </span>
        <div className='mt-[18px] grid grid-cols-2 gap-[8px]'>
          {REVANTA_PRODUCTS.map((branch) => (
            <Link
              prefetch={false}
              key={branch.slug}
              href={revantaHref(branch.slug)}
              onClick={onClick}
              className='group flex items-center gap-[16px] rounded-[12px] p-[12px] transition-colors duration-200 hover:bg-white/[0.06]'
            >
              <div className='relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-[8px] border border-white/10'>
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  // 112x72 box; product covers are up to 2:1, cover draws them 144px wide
                  sizes='144px'
                  className='object-cover object-center'
                />
              </div>
              <div className='flex min-w-0 flex-col'>
                <span className='font-inter text-[17px] font-medium leading-[1.2] text-white transition-colors duration-200 group-hover:text-[#7C9BFF]'>
                  {branch.name}
                </span>
                <span className='mt-[3px] font-inter text-[13px] leading-[1.3] text-white/50'>
                  {branch.slogan}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);
