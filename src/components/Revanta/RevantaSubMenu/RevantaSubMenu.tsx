import arena from '@/public/assets/images/main/heroSlide/bct-virazh-arena.webp';
import Image from 'next/image';

// Revanta pages are static files in /public, so links use <a> (full page load).
const ASSETS = '/revanta/assets/images/products/virazh';

const BRANCHES = [
  {
    name: 'Revanta SportSchool',
    slogan: 'Digital platform for running a sports academy',
    href: '/revanta/en/products/virazh-sports-school',
    image: `${ASSETS}/virazh-kids-hero.webp`,
  },
  {
    name: 'Revanta Loyalty',
    slogan: 'CRM and loyalty programme for a sports club',
    href: '/revanta/en/products/virazh-loyalty',
    image: `${ASSETS}/revanta-loyalty-cover-v2.webp`,
  },
  {
    name: 'Revanta Sites',
    slogan: 'All club content from a single admin panel',
    href: '/revanta/en/products/virazh-sites',
    image: `${ASSETS}/revanta-sites-cover-v2.webp`,
  },
  {
    name: 'Revanta e-com',
    slogan: 'A merch store that knows its fan',
    href: '/revanta/en/products/virazh-ecom',
    image: `${ASSETS}/revanta-ecom-cover-v2.webp`,
  },
];

interface Props {
  onClick: () => void;
}

/** Mega menu for Revanta: flagship on the left, product branches on the right — same layout as the Virazh menu on digitalburo.tech. */
export const RevantaSubMenu = ({ onClick }: Props) => (
  <div className='w-[min(1200px,calc(100vw-40px))] py-[36px]'>
    <div className='grid grid-cols-[minmax(0,340px)_1fr] gap-[48px]'>
      <a href='/revanta' onClick={onClick} className='group flex flex-col'>
        <div className='relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10'>
          <Image
            src={arena}
            alt='Revanta'
            fill
            sizes='340px'
            className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10' />
          <div className='absolute inset-0 flex items-center justify-center gap-[10px]'>
            <Image
              src={`${ASSETS}/revanta-wordmark-white-v4.webp`}
              alt=''
              width={1611}
              height={235}
              className='h-auto w-[130px]'
            />
          </div>
        </div>
        <span className='mt-[16px] font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7C9BFF]'>
          A platform to run a sports club, academy and events
        </span>
        <span className='mt-[6px] font-inter text-[27px] font-light leading-[1.05] tracking-[-0.02em] text-white transition-colors group-hover:text-[#7C9BFF]'>
          Revanta
        </span>
        <span className='mt-[12px] w-fit font-inter text-[15px] font-medium text-white/80'>
          Explore the platform →
        </span>
      </a>

      <div>
        <span className='font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/40'>
          Ecosystem products
        </span>
        <div className='mt-[18px] grid grid-cols-2 gap-[8px]'>
          {BRANCHES.map((branch) => (
            <a
              key={branch.href}
              href={branch.href}
              onClick={onClick}
              className='group flex items-center gap-[16px] rounded-[12px] p-[12px] transition-colors duration-200 hover:bg-white/[0.06]'
            >
              <div className='relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-[8px] border border-white/10'>
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  sizes='112px'
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
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);
