import { REVANTA_IMAGES } from '@/src/data/revanta/routes';
import Image from 'next/image';
import { EMBLEM_GLOW_CLASS } from '../ui/layout';
import { CtaButton } from './CtaButton';

interface Props {
  eyebrow: string;
  h1: string;
  lead: string;
  image: string;
  imageAlt: string;
}

/**
 * Hub hero: navy glow, the Revanta lockup large on the left with the H1 under
 * it, lead and CTA on the right, then the admin panel in a desktop window
 * with a phone on top, cut by the bottom edge of the section. Entrance:
 * emblem fades in, the wordmark slides out from under it, text follows,
 * screens rise last. The entrance is CSS keyframes (tailwind.config.ts
 * `hero-*` animations), so it plays from first paint without waiting for JS;
 * `motion-reduce:animate-none` skips it for reduced-motion users.
 */
export const RevantaHeroSplit = ({
  eyebrow,
  h1,
  lead,
  image,
  imageAlt,
}: Props) => {
  return (
    <section className='relative flex flex-col overflow-hidden bg-black tablet:min-h-[min(100svh,1000px)]'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0'
      >
        <div className='absolute -left-[10%] top-[120px] h-[520px] w-[60%] rounded-full bg-gradient-to-br from-revanta-blue/70 via-[#24346B]/45 to-transparent blur-[130px]' />
        <div className='absolute right-[-8%] top-[280px] h-[480px] w-[46%] rounded-full bg-[#1B2541]/60 blur-[140px]' />
        <div className='absolute bottom-0 right-[8%] h-[300px] w-[30%] rounded-full bg-[#F8AE3C]/10 blur-[120px]' />
        <div className='absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#3B5BF6]/[0.12] via-transparent to-transparent' />
        <div className='absolute left-[10%] top-[420px] h-[380px] w-[60%] rounded-full bg-gradient-to-br from-[#3B5BF6]/45 via-[#24346B]/45 to-transparent blur-[110px] tablet:top-[480px]' />
        <div className='absolute left-[30%] top-[520px] h-[260px] w-[40%] rounded-full bg-[#16213E]/70 blur-[130px] tablet:top-[600px]' />
        <div className='absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-black to-transparent' />
      </div>

      <div className='relative z-10 flex flex-1 flex-col pt-[130px] tablet:pt-[180px]'>
        <div className='mx-auto w-full max-w-[1600px] px-[16px] tablet:px-[40px]'>
          <div className='grid grid-cols-1 gap-[28px] laptop:grid-cols-[1.3fr_1fr] laptop:items-start laptop:gap-[40px]'>
            <div className='relative z-10'>
              <span className='mb-[26px] inline-block w-fit animate-hero-fade rounded-full border border-white/20 bg-white/10 px-[14px] py-[6px] font-inter text-[12px] font-medium uppercase tracking-[0.05em] text-white/80 backdrop-blur-sm motion-reduce:animate-none tablet:text-[13px]'>
                {eyebrow}
              </span>
              <div
                aria-hidden='true'
                className='flex items-center gap-[12px] tablet:gap-[18px] desktop:gap-[22px]'
              >
                <span className='block shrink-0 animate-hero-emblem motion-reduce:animate-none'>
                  <Image
                    src={`${REVANTA_IMAGES}/emblem-white.webp`}
                    alt=''
                    width={1002}
                    height={632}
                    priority
                    quality={95}
                    className={`h-[46px] w-auto tablet:h-[74px] desktop:h-[90px] ${EMBLEM_GLOW_CLASS}`}
                  />
                </span>
                <span className='block shrink-0 animate-hero-wordmark-clip overflow-hidden motion-reduce:animate-none'>
                  <span className='block animate-hero-wordmark-slide motion-reduce:animate-none'>
                    <Image
                      src={`${REVANTA_IMAGES}/wordmark-white.webp`}
                      alt=''
                      width={1611}
                      height={235}
                      priority
                      quality={95}
                      className='h-auto w-[210px] tablet:w-[340px] desktop:w-[420px]'
                    />
                  </span>
                </span>
              </div>
              <h1 className='mt-[26px] max-w-[640px] animate-hero-rise-sm-300 font-inter text-[22px] font-light leading-[1.3] tracking-[-0.01em] text-white motion-reduce:animate-none tablet:text-[28px] desktop:text-[32px]'>
                {h1}
              </h1>
            </div>
            <div className='relative z-10 flex animate-hero-rise-sm-400 flex-col items-start gap-[24px] motion-reduce:animate-none laptop:items-end laptop:pt-[60px]'>
              <p className='max-w-[480px] font-inter text-[17px] leading-[1.55] text-white/65 tablet:text-[19px] laptop:text-right'>
                {lead}
              </p>
              <CtaButton />
            </div>
          </div>
        </div>

        <div className='relative z-10 -mb-[16px] mt-[40px] pt-[20px] tablet:-mb-[28px] tablet:mt-auto tablet:pt-[32px] desktop:-mb-[40px] desktop:pt-[44px]'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-[-120px] z-0 h-[420px]'
          >
            <div className='absolute left-1/2 top-0 h-[380px] w-[78%] -translate-x-1/2 rounded-full bg-[#3B5BF6]/30 blur-[120px]' />
            <div className='absolute left-1/2 top-[60px] h-[300px] w-[52%] -translate-x-1/2 rounded-full bg-[#5B7BFF]/20 blur-[90px]' />
          </div>
          <div className='relative z-10 mx-auto aspect-[10/7] w-full max-w-full overflow-hidden px-[16px] tablet:aspect-[3/2] tablet:max-w-[900px] tablet:px-[40px] laptop:aspect-[9/4] laptop:max-w-[1040px] desktop:aspect-[1389/540] desktop:max-w-[1360px]'>
            <div className='absolute inset-x-0 top-[22%] animate-hero-rise-lg-500 motion-reduce:animate-none'>
              <div className='rounded-t-[26px] bg-[linear-gradient(180deg,rgba(150,180,255,0.95)_0%,rgba(59,91,246,0.55)_18%,rgba(36,52,107,0.35)_48%,transparent_100%)] p-[1.5px] shadow-[0_-1px_24px_rgba(99,132,255,0.35)] tablet:rounded-t-[30px] tablet:p-[2px] desktop:rounded-t-[38px]'>
                <div className='overflow-hidden rounded-t-[24px] border-[10px] border-b-0 border-[#12141c] bg-[#12141c] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06] tablet:rounded-t-[28px] tablet:border-[14px] desktop:rounded-t-[36px] desktop:border-[18px]'>
                  <div className='relative aspect-[2400/1200] w-full overflow-hidden rounded-t-[14px] bg-[#F7F8FB] tablet:rounded-t-[16px] laptop:aspect-[2400/900] desktop:aspect-[2400/1000] desktop:rounded-t-[20px]'>
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      priority
                      quality={90}
                      sizes='(max-width: 767px) 300vw, (max-width: 1279px) 92vw, 1560px'
                      className='object-cover object-left-top laptop:object-top'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute left-[61%] top-[1%] hidden w-[17%] max-w-[232px] animate-hero-rise-lg-680 motion-reduce:animate-none tablet:block'>
              <div className='rounded-[34px] bg-[linear-gradient(180deg,rgba(150,180,255,0.9)_0%,rgba(59,91,246,0.5)_22%,rgba(36,52,107,0.3)_55%,transparent_100%)] p-[1.5px] shadow-[0_-1px_20px_rgba(99,132,255,0.3)] tablet:rounded-[38px]'>
                <div className='overflow-hidden rounded-[32px] border-[6px] border-[#12141c] bg-[#12141c] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06] tablet:rounded-[36px] tablet:border-[8px]'>
                  <div className='relative aspect-[780/1694] overflow-hidden bg-[#F7F8FB]'>
                    <Image
                      src={`${REVANTA_IMAGES}/admin-mobile.webp`}
                      alt=''
                      fill
                      quality={90}
                      sizes='(max-width: 1279px) 190px, 232px'
                      className='object-cover object-top'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
