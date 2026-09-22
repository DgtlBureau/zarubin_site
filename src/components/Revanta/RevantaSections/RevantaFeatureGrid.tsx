import { RevantaFeature } from '@/src/data/revanta/types';
import { RevantaIcon } from '../RevantaIcons';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

/** Capabilities: hairline grid of cells with an icon, title and text. */
export const RevantaFeatureGrid = ({
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
        <h2 className={H2_CLASS}>{heading}</h2>
        {intro && (
          <p className='mt-[16px] max-w-[62ch] font-inter text-[18px] leading-[1.55] text-revanta-ink/55 tablet:text-[20px]'>
            {intro}
          </p>
        )}
      </Reveal>
      <div className='mt-[36px] grid grid-cols-1 border-l border-t border-revanta-ink/[0.08] tablet:mt-[48px] tablet:grid-cols-2 desktop:grid-cols-3'>
        {items.map((feature, idx) => (
          <Reveal
            key={feature.title}
            delay={(idx % 3) * 0.06}
            className='border-b border-r border-revanta-ink/[0.08] bg-white'
          >
            <div className='flex h-full flex-col bg-white p-[28px] tablet:p-[32px]'>
              {feature.icon && (
                <span className='text-revanta-blue'>
                  <RevantaIcon name={feature.icon} />
                </span>
              )}
              <h3 className='mt-[20px] font-inter text-[20px] font-medium leading-[1.25] text-revanta-ink tablet:text-[21px]'>
                {feature.title}
              </h3>
              <p className='mt-[10px] font-inter text-[16px] leading-[1.5] text-revanta-ink/55'>
                {feature.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </RevantaContainer>
  </RevantaSection>
);
