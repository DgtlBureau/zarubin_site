import {
  REVANTA_BASE,
  REVANTA_PRODUCTS,
  revantaHref,
} from '@/src/data/revanta/routes';
import Link from 'next/link';
import { Container } from '../../shared/Container/Container';

const REVANTA_ON_HOME = ['sportschool', 'loyalty', 'venues'];

export const OurProducts = () => {
  const revantaLinks = REVANTA_PRODUCTS.filter((p) =>
    REVANTA_ON_HOME.includes(p.key),
  );

  return (
    <section className='bg-main-bg py-[48px] tablet:py-[72px]'>
      <Container>
        <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-white/50 tablet:text-[14px]'>
          Our products
        </h2>
        <p className='mt-[8px] max-w-[640px] font-inter text-[15px] leading-[1.5] text-white/60'>
          Besides client work, we build and run two products of our own.
        </p>

        <div className='mt-[28px] grid gap-[16px] laptop:grid-cols-2'>
          <div className='flex flex-col rounded-[16px] border border-white/10 bg-white/[0.03] p-[24px] tablet:p-[32px]'>
            <Link href={REVANTA_BASE} className='group'>
              <h3 className='font-inter text-[26px] font-semibold text-white transition-colors group-hover:text-[#7C9BFF]'>
                Revanta
              </h3>
              <p className='mt-[8px] font-inter text-[16px] leading-[1.5] text-white/70'>
                Sports club software: registration and schedules for clubs and
                academies, ticketing and fan loyalty for spectator clubs, and
                bookings for ice rinks and sports facilities.
              </p>
            </Link>
            <ul className='mt-[20px] flex flex-col gap-[10px]'>
              {revantaLinks.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={revantaHref(p.slug)}
                    className='font-inter text-[15px] text-white/80 underline-offset-4 hover:text-white hover:underline'
                  >
                    {p.name}: {p.slogan.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col rounded-[16px] border border-white/10 bg-white/[0.03] p-[24px] tablet:p-[32px]'>
            <a
              href='https://regfo.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group'
            >
              <h3 className='font-inter text-[26px] font-semibold text-white transition-colors group-hover:text-[#7C9BFF]'>
                Regfo
              </h3>
              <p className='mt-[8px] font-inter text-[16px] leading-[1.5] text-white/70'>
                AI regulatory workspace for biotech: checks preclinical study
                reports against FDA and ICH requirements, scores compliance and
                finds gaps.
              </p>
            </a>
            <Link
              href='/cases/regfo'
              className='mt-[20px] font-inter text-[15px] text-white/80 underline-offset-4 hover:text-white hover:underline'
            >
              How we built Regfo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
