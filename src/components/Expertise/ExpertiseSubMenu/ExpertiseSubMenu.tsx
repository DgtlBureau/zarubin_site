import { MenuItems } from '@/src/utils/enums';
import {
  formatLink,
  formatMenuItem,
  formatMenuTitle,
} from '@/src/utils/formattedMenuItem';
import { MenuArticle, MenuSection } from '@/src/utils/types';
import Image from 'next/image';
import Link from 'next/link';

interface IExpertiseProps {
  expertiseSubMenu: MenuSection[];
  insightsSubMenu: MenuSection[];
  onClick: () => void;
  /** Newest first, already sorted and trimmed on the server. */
  latestArticles: MenuArticle[];
}

const PLAYBOOK = `/${MenuItems.PLAYBOOK.toLowerCase()}`;

/** Playbook mega menu in the same layout as the Revanta menu: featured article on the left, sections and latest reads on the right. */
export const ExpertiseSubMenu = ({
  expertiseSubMenu,
  insightsSubMenu,
  onClick,
  latestArticles,
}: IExpertiseProps) => {
  const [featured, ...rest] = latestArticles;
  const postHref = (p: MenuArticle) =>
    `${PLAYBOOK}/${p.category?.toLowerCase()}/${p.slug}`;

  const sections = [
    ...expertiseSubMenu.map((s) => ({ ...s, category: 'expertise' })),
    ...insightsSubMenu.map((s) => ({ ...s, category: 'insights' })),
  ].filter((s) => s.articlesCount > 0);

  return (
    <div className='w-[min(1200px,calc(100vw-40px))] py-[36px]'>
      <div className='grid grid-cols-[minmax(0,340px)_1fr] gap-[48px]'>
        {featured ? (
          <Link
            prefetch={false}
            href={postHref(featured)}
            onClick={onClick}
            className='group flex flex-col'
          >
            <div className='relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10 bg-white/5'>
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes='340px'
                  className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
                />
              )}
            </div>
            <span className='mt-[16px] font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7C9BFF]'>
              The latest in Playbook
            </span>
            <span className='mt-[6px] line-clamp-3 font-inter text-[22px] font-light leading-[1.15] tracking-[-0.01em] text-white transition-colors group-hover:text-[#7C9BFF]'>
              {featured.title}
            </span>
            <span className='mt-[12px] w-fit font-inter text-[15px] font-medium text-white/80'>
              Read the article →
            </span>
          </Link>
        ) : (
          <div />
        )}

        <div className='flex flex-col gap-[28px]'>
          <div>
            <span className='font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/40'>
              Sections
            </span>
            <div className='mt-[14px] grid grid-cols-3 gap-[8px]'>
              {sections.map((s) => {
                const latest = s.folderItems[0];
                return (
                  <Link
                    prefetch={false}
                    key={`${s.category}-${s.name}`}
                    href={`${PLAYBOOK}/${s.category}?sub-category=${s.name}`}
                    onClick={onClick}
                    className='group flex flex-col rounded-[12px] p-[12px] transition-colors duration-200 hover:bg-white/[0.06]'
                  >
                    <span className='font-inter text-[17px] font-medium leading-[1.2] text-white transition-colors duration-200 group-hover:text-[#7C9BFF]'>
                      {formatMenuTitle(s.name)}
                    </span>
                    <span className='mt-[3px] truncate font-inter text-[13px] leading-[1.3] text-white/50'>
                      {s.articlesCount} articles ·{' '}
                      {formatMenuItem(formatLink(latest.nameItem))}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {rest.length > 0 && (
            <div>
              <span className='font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-white/40'>
                More reads
              </span>
              <div className='mt-[14px] grid grid-cols-2 gap-[8px]'>
                {rest.slice(0, 4).map((post) => (
                  <Link
                    prefetch={false}
                    key={post.slug}
                    href={postHref(post)}
                    onClick={onClick}
                    className='group flex items-center gap-[16px] rounded-[12px] p-[12px] transition-colors duration-200 hover:bg-white/[0.06]'
                  >
                    <div className='relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-[8px] border border-white/10 bg-white/5'>
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes='112px'
                          className='object-cover object-center'
                        />
                      )}
                    </div>
                    <span className='line-clamp-3 font-inter text-[15px] font-medium leading-[1.25] text-white transition-colors duration-200 group-hover:text-[#7C9BFF]'>
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
