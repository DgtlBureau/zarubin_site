import { RevantaBenefit } from '@/src/data/revanta/types';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

export const RevantaBenefits = ({
  heading,
  items,
}: {
  heading: string;
  items: RevantaBenefit[];
}) => (
  <RevantaSection>
    <RevantaContainer>
      <Reveal>
        <h2 className={H2_CLASS}>{heading}</h2>
      </Reveal>
      <div className='mt-[36px] grid grid-cols-1 gap-[24px] tablet:mt-[48px] tablet:grid-cols-3 tablet:gap-[30px]'>
        {items.map((b, idx) => (
          <Reveal key={b.title} delay={idx * 0.06}>
            <div className='flex h-full flex-col border-t border-revanta-ink/15 pt-[20px]'>
              <h3 className='font-inter text-[22px] font-medium text-revanta-ink tablet:text-[24px]'>
                {b.title}
              </h3>
              <p className='mt-[12px] font-inter text-[17px] leading-[1.5] text-revanta-ink/55'>
                {b.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </RevantaContainer>
  </RevantaSection>
);
