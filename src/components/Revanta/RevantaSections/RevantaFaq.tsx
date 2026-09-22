import { RevantaFaq as FaqItem } from '@/src/data/revanta/types';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';

/**
 * Native <details>/<summary>: answers stay in the HTML, collapsed, so the
 * visible text matches the FAQPage JSON-LD without relying on JS.
 */
export const RevantaFaq = ({ items }: { items: FaqItem[] }) => {
  if (items.length === 0) return null;

  return (
    <RevantaSection>
      <RevantaContainer>
        <Reveal>
          <h2 className={H2_CLASS}>Frequently asked questions</h2>
        </Reveal>
        <div className='mt-[36px] flex flex-col border-t border-revanta-ink/10 tablet:mt-[48px]'>
          {items.map((item) => (
            <details
              key={item.question}
              className='group border-b border-revanta-ink/10'
            >
              <summary className='flex cursor-pointer list-none items-start justify-between gap-[20px] py-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-revanta-accent tablet:py-[26px] [&::-webkit-details-marker]:hidden'>
                <h3 className='font-inter text-[19px] font-medium leading-[1.3] text-revanta-ink tablet:text-[21px]'>
                  {item.question}
                </h3>
                <svg
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                  className='mt-[3px] h-[22px] w-[22px] shrink-0 text-revanta-ink/40 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                >
                  <path d='M12 5v14M5 12h14' />
                </svg>
              </summary>
              <p className='max-w-[72ch] pb-[26px] font-inter text-[16px] leading-[1.6] text-revanta-ink/60 tablet:text-[17px]'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </RevantaContainer>
    </RevantaSection>
  );
};
