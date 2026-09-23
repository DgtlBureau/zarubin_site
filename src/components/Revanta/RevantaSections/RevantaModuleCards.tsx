import {
  REVANTA_IMAGES,
  REVANTA_PRODUCTS,
  revantaHref,
} from '@/src/data/revanta/routes';
import { RevantaFeature } from '@/src/data/revanta/types';
import { coverSizes, CoverBox, WIDE } from '@/src/utils/imageSizes';
import { getPublicImageAspect } from '@/src/utils/publicImageSize';
import Image from 'next/image';
import Link from 'next/link';
import { RevantaLockup } from '../ui/RevantaLockup';
import { Reveal } from '../ui/Reveal';
import { Sheen } from '../ui/Sheen';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

/** Short product label for the lockup chip: "Revanta Loyalty" -> "Loyalty". */
// 1 / 2 (tablet) / 3 (laptop) columns of 16:10 covers
const CARD_BOXES: CoverBox[] = [
  { minWidth: 0, vw: 1, boxAspect: WIDE },
  { minWidth: 768, vw: 0.5, boxAspect: WIDE },
  { minWidth: 1200, vw: 0.34, boxAspect: WIDE },
];

export const productLabel = (name: string) => name.replace(/^Revanta\s+/, '');

// Hub modules are named after products; the one module without its own page
// (segments and campaigns) lives in Revanta Loyalty.
const resolveModule = (feature: RevantaFeature) => {
  const product =
    REVANTA_PRODUCTS.find((p) => feature.title.includes(p.name)) ??
    REVANTA_PRODUCTS.find((p) => p.key === 'loyalty')!;
  const own = feature.title.includes(product.name);
  return {
    href: revantaHref(product.slug),
    image: own ? product.image : `${REVANTA_IMAGES}/admin-desktop.webp`,
    label: productLabel(product.name),
  };
};

/**
 * Hub modules as product tiles: cover with the Revanta lockup revealed on
 * hover, then the module title and description, linking to the product page.
 */
export const RevantaModuleCards = ({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro?: string;
  items: RevantaFeature[];
}) => (
  <RevantaSection>
    <RevantaContainer>
      <Reveal>
        <div className='max-w-[720px]'>
          <h2 className={H2_CLASS}>{heading}</h2>
          {intro && (
            <p className='mt-[16px] font-inter text-[17px] leading-[1.55] text-revanta-ink/55 tablet:text-[18px]'>
              {intro}
            </p>
          )}
        </div>
      </Reveal>
      <div className='mt-[36px] grid grid-cols-1 gap-x-[24px] gap-y-[40px] tablet:mt-[48px] tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-x-[30px]'>
        {items.map((feature, idx) => {
          const mod = resolveModule(feature);
          return (
            <Reveal key={feature.title} delay={(idx % 3) * 0.06}>
              <Link href={mod.href} className='group flex h-full flex-col'>
                <div className='relative aspect-[16/10] overflow-hidden rounded-[8px] border border-revanta-ink/[0.08]'>
                  <Image
                    src={mod.image}
                    alt=''
                    fill
                    sizes={coverSizes(
                      getPublicImageAspect(mod.image),
                      CARD_BOXES,
                    )}
                    quality={80}
                    className='object-cover object-center'
                  />
                  <RevantaLockup size='md' label={mod.label} />
                  <Sheen />
                </div>
                <h3 className='mt-[18px] font-inter text-[21px] font-medium leading-[1.25] tracking-[-0.01em] text-revanta-ink transition-colors group-hover:text-revanta-accent tablet:text-[23px]'>
                  {feature.title}
                </h3>
                <p className='mt-[10px] font-inter text-[17px] leading-[1.5] text-revanta-ink/55'>
                  {feature.text}
                </p>
                <span className='mt-auto pt-[16px] font-inter text-[15px] font-medium text-revanta-ink/70 transition-colors group-hover:text-revanta-accent'>
                  Learn more ↗
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </RevantaContainer>
  </RevantaSection>
);
