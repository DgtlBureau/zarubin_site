import { RevantaPageContent } from '@/src/data/revanta/types';
import { coverSizes } from '@/src/utils/imageSizes';
import { getPublicImageAspect } from '@/src/utils/publicImageSize';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import { EYEBROW_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

/**
 * Product intro under the hero: the lead statement with the audience chips,
 * then the before/after of the problem.
 *
 * Раскладка зависит от того, есть ли у продукта кадр аудитории. Он есть только
 * у школы и сайтов — раньше «Кому подходит» всегда стояло отдельной колонкой,
 * и на остальных страницах под чипами зияла пустая треть экрана. Теперь без
 * кадра блок идёт в одну колонку, а карточки «было / стало» занимают всю
 * ширину: они и есть главная мысль блока.
 */
export const RevantaIntro = ({ content }: { content: RevantaPageContent }) => {
  const image = content.audience.image;

  return (
    <RevantaSection className='py-[60px] tablet:py-[80px] desktop:py-[100px]'>
      <RevantaContainer>
        <div
          className={`grid grid-cols-1 gap-[40px] ${image ? 'desktop:grid-cols-[1.3fr_0.7fr] desktop:items-stretch desktop:gap-[80px]' : ''}`}
        >
          <Reveal>
            <p className='max-w-[44ch] font-inter text-[24px] font-light leading-[1.3] tracking-[-0.01em] text-revanta-ink tablet:text-[30px] desktop:text-[34px]'>
              {content.lead}
            </p>
            <h2 className={`mt-[40px] ${EYEBROW_CLASS}`}>
              {content.audience.heading}
            </h2>
            <ul className='mt-[16px] flex flex-wrap gap-[10px]'>
              {content.audience.items.map((item) => (
                <li
                  key={item}
                  className='rounded-full border border-revanta-ink/10 bg-[#F5F5F5] px-[14px] py-[7px] font-inter text-[15px] text-revanta-ink/70'
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          {/* Кадр тянется по высоте текстовой колонки: с фиксированным 4:5
              под коротким лидом оставалась пустая половина экрана. */}
          {image && (
            <Reveal delay={0.08} className='hidden h-full desktop:block'>
              <div className='relative h-full min-h-[320px] w-full overflow-hidden rounded-[14px]'>
                <Image
                  src={image}
                  alt=''
                  fill
                  sizes={coverSizes(getPublicImageAspect(image), [
                    { minWidth: 0, px: 460, boxAspect: 4 / 5 },
                  ])}
                  quality={80}
                  className='object-cover object-center'
                />
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.12} className='mt-[56px] tablet:mt-[72px]'>
          <h2 className='font-inter text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-revanta-ink tablet:text-[32px]'>
            {content.problem.heading}
          </h2>
          <div className='mt-[28px] grid grid-cols-1 gap-[16px] tablet:grid-cols-2 tablet:gap-[20px]'>
            <div className='rounded-[14px] border border-revanta-ink/[0.08] bg-[#f7f8fb] p-[28px] tablet:p-[32px]'>
              <span className='font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/35'>
                Today
              </span>
              <p className='mt-[14px] font-inter text-[18px] leading-[1.55] text-revanta-ink/55 tablet:text-[19px]'>
                {content.problem.before}
              </p>
            </div>
            <div className='rounded-[14px] border border-revanta-accent/25 bg-revanta-accent/[0.06] p-[28px] tablet:p-[32px]'>
              <span className='font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-accent'>
                With {content.eyebrow}
              </span>
              <p className='mt-[14px] font-inter text-[18px] leading-[1.55] text-revanta-ink/85 tablet:text-[19px]'>
                {content.problem.after}
              </p>
            </div>
          </div>
        </Reveal>
      </RevantaContainer>
    </RevantaSection>
  );
};
