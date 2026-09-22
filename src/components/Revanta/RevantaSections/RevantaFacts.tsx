import { RevantaIconKey } from '@/src/data/revanta/types';
import { Check } from 'lucide-react';
import { RevantaIcon } from '../RevantaIcons';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

/** Short facts about the product, in the same hairline grid as capabilities. */
export const RevantaFacts = ({
  heading,
  items,
  icons,
}: {
  heading: string;
  items: string[];
  icons?: RevantaIconKey[];
}) => (
  <RevantaSection>
    <RevantaContainer>
      <Reveal>
        <h2 className={H2_CLASS}>{heading}</h2>
      </Reveal>
      <ul className='mt-[36px] grid grid-cols-1 border-l border-t border-revanta-ink/[0.08] tablet:mt-[48px] tablet:grid-cols-2 desktop:grid-cols-3'>
        {items.map((fact, idx) => {
          const icon = icons?.[idx];
          return (
            <li key={fact} className='border-b border-r border-revanta-ink/[0.08] bg-white'>
              <Reveal delay={(idx % 3) * 0.06} className='h-full'>
                <div className='flex h-full flex-col gap-[18px] bg-white p-[28px] tablet:p-[32px]'>
                  <span className='text-revanta-blue'>
                    {icon ? (
                      <RevantaIcon name={icon} />
                    ) : (
                      <span className='flex h-[32px] w-[32px] items-center justify-center rounded-full bg-revanta-blue/10'>
                        <Check
                          className='h-[18px] w-[18px]'
                          strokeWidth={2.2}
                          aria-hidden='true'
                        />
                      </span>
                    )}
                  </span>
                  <p className='font-inter text-[18px] leading-[1.45] text-revanta-ink/80 tablet:text-[19px]'>
                    {fact}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </RevantaContainer>
  </RevantaSection>
);
