import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import {
  EYEBROW_CLASS,
  RevantaContainer,
  RevantaSection,
} from '../ui/layout';

/** Playbook articles related to the page, as a compact link list. */
export const RevantaArticles = ({
  items,
}: {
  items?: { title: string; href: string }[];
}) => {
  if (!items || items.length === 0) return null;

  return (
    <RevantaSection className='pt-0 tablet:pt-0 desktop:pt-0'>
      <RevantaContainer>
        <Reveal>
          <h2 className={EYEBROW_CLASS}>Further reading</h2>
          <ul className='mt-[20px] grid grid-cols-1 border-l border-t border-revanta-ink/[0.08] tablet:grid-cols-2 desktop:grid-cols-3'>
            {items.map((a) => (
              <li key={a.href} className='border-b border-r border-revanta-ink/[0.08] bg-white'>
                <Link
                  href={a.href}
                  className='group flex h-full items-start justify-between gap-[16px] bg-white p-[24px] transition-colors hover:bg-[#f4f5f8]'
                >
                  <span className='font-inter text-[18px] font-medium leading-[1.35] text-revanta-ink transition-colors group-hover:text-revanta-accent'>
                    {a.title}
                  </span>
                  <span
                    aria-hidden='true'
                    className='font-inter text-[16px] text-revanta-ink/40 group-hover:text-revanta-accent'
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </RevantaContainer>
    </RevantaSection>
  );
};
