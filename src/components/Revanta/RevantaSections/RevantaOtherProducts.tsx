import {
  REVANTA_BASE,
  REVANTA_IMAGES,
  REVANTA_PRODUCTS,
  RevantaProductKey,
  revantaHref,
} from '@/src/data/revanta/routes';
import Image from 'next/image';
import Link from 'next/link';
import { RevantaLockup } from '../ui/RevantaLockup';
import { Reveal } from '../ui/Reveal';
import { Sheen } from '../ui/Sheen';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';
import { CarouselArrows } from './CarouselArrows';
import { productLabel } from './RevantaModuleCards';

const SCROLL_ID = 'revanta-others-scroll';

/** Carousel of the hub and the other Revanta products. */
export const RevantaOtherProducts = ({
  current,
}: {
  current: RevantaProductKey;
}) => {
  const cards = [
    {
      key: 'hub',
      href: REVANTA_BASE,
      name: 'Revanta',
      slogan: 'Sports club software for academies, spectator clubs and rinks',
      image: `${REVANTA_IMAGES}/arena-fans.webp`,
      label: undefined as string | undefined,
    },
    ...REVANTA_PRODUCTS.filter((p) => p.key !== current).map((p) => ({
      key: p.key,
      href: revantaHref(p.slug),
      name: p.name,
      slogan: p.slogan,
      image: p.image,
      label: productLabel(p.name) as string | undefined,
    })),
  ];

  return (
    <RevantaSection className='py-[60px] tablet:py-[80px] desktop:py-[100px]'>
      <RevantaContainer>
        <Reveal className='mb-[36px] flex items-end justify-between gap-[20px] tablet:mb-[48px]'>
          <h2 className={H2_CLASS}>Other Revanta products</h2>
          <CarouselArrows
            targetId={SCROLL_ID}
            className='hidden shrink-0 tablet:flex'
          />
        </Reveal>
        <div
          id={SCROLL_ID}
          className='-mx-[16px] flex snap-x snap-mandatory gap-[20px] overflow-x-auto px-[16px] pb-[8px] [scrollbar-width:none] tablet:-mx-[20px] tablet:gap-[24px] tablet:px-[20px] [&::-webkit-scrollbar]:hidden'
        >
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className='group flex w-[300px] shrink-0 snap-start flex-col tablet:w-[460px] desktop:w-[520px]'
            >
              <div className='relative aspect-[16/10] overflow-hidden rounded-[6px]'>
                <Image
                  src={card.image}
                  alt=''
                  fill
                  sizes='(max-width: 768px) 300px, 520px'
                  quality={80}
                  className='object-cover object-center'
                />
                <RevantaLockup size='md' label={card.label} />
                <Sheen />
              </div>
              <span className='mt-[18px] font-inter text-[21px] font-medium leading-[1.25] tracking-[-0.01em] text-revanta-ink transition-colors group-hover:text-revanta-accent tablet:text-[25px]'>
                {card.name}
              </span>
              <span className='mt-[8px] font-inter text-[16px] leading-[1.45] text-revanta-ink/50 tablet:text-[17px]'>
                {card.slogan}
              </span>
            </Link>
          ))}
        </div>
      </RevantaContainer>
    </RevantaSection>
  );
};
