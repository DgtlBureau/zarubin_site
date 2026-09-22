import { RevantaPageContent } from '@/src/data/revanta/types';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import {
  EYEBROW_CLASS,
  RevantaContainer,
  RevantaSection,
} from '../ui/layout';

/**
 * Product intro under the hero: who it is for (chips and an optional photo)
 * on the left; the lead and the before/after of the problem on the right.
 */
export const RevantaIntro = ({ content }: { content: RevantaPageContent }) => (
  <RevantaSection className='py-[60px] tablet:py-[80px] desktop:py-[100px]'>
    <RevantaContainer>
      <div className='grid grid-cols-1 gap-[40px] desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-[100px]'>
        <Reveal>
          <h2 className={EYEBROW_CLASS}>{content.audience.heading}</h2>
          <ul className='mt-[24px] flex flex-wrap gap-[10px]'>
            {content.audience.items.map((item) => (
              <li
                key={item}
                className='rounded-full border border-revanta-ink/10 bg-[#F5F5F5] px-[14px] py-[7px] font-inter text-[15px] text-revanta-ink/70'
              >
                {item}
              </li>
            ))}
          </ul>
          {content.audience.image && (
            <div className='relative mt-[28px] hidden aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[10px] desktop:block'>
              <Image
                src={content.audience.image}
                alt=''
                fill
                sizes='340px'
                quality={80}
                className='object-cover object-center'
              />
            </div>
          )}
        </Reveal>
        <Reveal delay={0.08}>
          <p className='max-w-[680px] font-inter text-[20px] leading-[1.5] text-revanta-ink/70 tablet:text-[25px]'>
            {content.lead}
          </p>
          <h2 className='mt-[44px] max-w-[680px] font-inter text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-revanta-ink tablet:text-[30px]'>
            {content.problem.heading}
          </h2>
          <div className='mt-[24px] grid max-w-[900px] grid-cols-1 gap-[16px] tablet:grid-cols-2'>
            <div className='rounded-[12px] border border-revanta-ink/[0.08] bg-[#f7f8fb] p-[24px]'>
              <span className='font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-ink/40'>
                Today
              </span>
              <p className='mt-[12px] font-inter text-[17px] leading-[1.55] text-revanta-ink/60'>
                {content.problem.before}
              </p>
            </div>
            <div className='rounded-[12px] border border-revanta-blue/20 bg-revanta-blue/[0.05] p-[24px]'>
              <span className='font-inter text-[13px] font-semibold uppercase tracking-[0.08em] text-revanta-accent'>
                With {content.eyebrow}
              </span>
              <p className='mt-[12px] font-inter text-[17px] leading-[1.55] text-revanta-ink/80'>
                {content.problem.after}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </RevantaContainer>
  </RevantaSection>
);
