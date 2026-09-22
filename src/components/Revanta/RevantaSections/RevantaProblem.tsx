import { RevantaPageContent } from '@/src/data/revanta/types';
import { Reveal } from '../ui/Reveal';
import {
  EYEBROW_CLASS,
  H2_CLASS,
  RevantaContainer,
  RevantaSection,
} from '../ui/layout';

/** Hub "what it does": the heading on the left, before → after on the right. */
export const RevantaProblem = ({
  problem,
}: {
  problem: RevantaPageContent['problem'];
}) => (
  <RevantaSection className='py-[60px] tablet:py-[80px] desktop:py-[100px]'>
    <RevantaContainer>
      <div className='grid grid-cols-1 gap-[28px] tablet:grid-cols-2 tablet:gap-[56px] desktop:gap-[72px]'>
        <Reveal>
          <span className={EYEBROW_CLASS}>What Revanta does</span>
          <h2 className={`mt-[14px] ${H2_CLASS}`}>{problem.heading}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className='flex flex-col gap-[20px]'>
            <p className='font-inter text-[18px] leading-[1.55] text-revanta-ink/50'>
              {problem.before}
            </p>
            <p className='font-inter text-[22px] leading-[1.45] text-revanta-ink/80 tablet:text-[26px]'>
              {problem.after}
            </p>
          </div>
        </Reveal>
      </div>
    </RevantaContainer>
  </RevantaSection>
);
