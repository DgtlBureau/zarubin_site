import { REVANTA_BASE } from '@/src/data/revanta/routes';
import { coverSizes } from '@/src/utils/imageSizes';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import { RevantaContainer } from '../ui/layout';
import { CtaButton } from './CtaButton';

// Box: 100svh clamped to 600-900px. Hero photos are 1.8-2.0 wide; cover
// draws them up to 900 x 2 px wide even on phones.
const HERO_PHOTO_SIZES = coverSizes(2, [{ minWidth: 0, vw: 1, height: 900 }]);

interface Props {
  productName: string;
  h1: string;
  image: string;
  imageAlt: string;
}

/**
 * Product hero: full-bleed photo under a dark gradient, "part of Revanta"
 * chip, the product name large as a visual title, the SEO H1 under it and
 * the demo CTA.
 */
export const RevantaHeroPhoto = ({
  productName,
  h1,
  image,
  imageAlt,
}: Props) => (
  <section className='relative overflow-hidden bg-black'>
    <div className='relative h-[100svh] max-h-[900px] min-h-[600px]'>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={HERO_PHOTO_SIZES}
        priority
        quality={85}
        className='object-cover object-center'
      />
      <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25' />
      <div className='absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-black/70 to-transparent' />
      <div className='absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-black/60 to-transparent' />

      <RevantaContainer className='relative z-10 flex h-full flex-col justify-end pb-[80px] pt-[140px] tablet:pb-[120px]'>
        <Reveal onLoad>
          <Link
            href={REVANTA_BASE}
            className='mb-[24px] inline-block w-fit rounded-full border border-white/20 bg-white/10 px-[14px] py-[6px] font-inter text-[12px] font-medium uppercase tracking-[0.05em] text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 tablet:text-[13px]'
          >
            Part of the Revanta platform
          </Link>
          <p className='block font-inter text-[45px] font-light leading-[1.02] tracking-[-0.02em] text-white tablet:text-[72px] desktop:text-[90px]'>
            {productName}
          </p>
          <h1 className='mt-[18px] max-w-[680px] font-inter text-[19px] font-light leading-[1.45] text-white/75 tablet:text-[22px]'>
            {h1}
          </h1>
          <div className='mt-[32px]'>
            <CtaButton />
          </div>
        </Reveal>
      </RevantaContainer>
    </div>
  </section>
);
