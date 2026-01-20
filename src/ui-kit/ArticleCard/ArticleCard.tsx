import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { formattedDate } from '@/src/utils/formattedDate';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Unified ArticleCard component for displaying article/insight/blog previews.
 * Replaces: SmallBlogCard, NewInsightsCard, InsightsCard, ExpertiseMenuCard, BlogCard
 *
 * Size variants:
 * - xs: Extra small for menus (11px title)
 * - sm: Small for compact displays (13-14px title)
 * - md: Medium default (16-18px title)
 * - lg: Large for featured content (18-20px title)
 */

export type ArticleCardSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ArticleCardProps {
  title: string;
  description?: string;
  image?: string | null;
  date?: string;
  tag?: string;
  slug?: string;
  href?: string;
  size?: ArticleCardSize;
  showTagsOverlay?: boolean;
  maxTags?: number;
  downloadLink?: string;
  showDownloadLink?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeConfig = {
  xs: {
    title: 'font-inter text-[11px] font-medium leading-[1.4] tracking-[-0.01em] tablet:text-[12px]',
    description: 'text-[11px] leading-[1.5] tablet:text-[12px]',
    tag: 'text-[9px] p-[3px_6px]',
    content: 'p-[12px]',
    date: 'text-[10px]',
    gap: 'gap-[6px]',
    titleClamp: 'line-clamp-2',
    descClamp: 'line-clamp-2',
  },
  sm: {
    title: 'font-inter text-[13px] font-semibold leading-[1.35] tracking-[-0.01em] tablet:text-[14px]',
    description: 'text-[12px] leading-[1.5] tablet:text-[13px]',
    tag: 'text-[10px] p-[4px_8px]',
    content: 'p-[14px] tablet:p-[18px]',
    date: 'text-[11px]',
    gap: 'gap-[8px]',
    titleClamp: 'line-clamp-3',
    descClamp: 'line-clamp-2',
  },
  md: {
    title: 'font-inter text-[14px] font-semibold leading-[1.35] tracking-[-0.01em] tablet:text-[15px]',
    description: 'text-[12px] leading-[1.55] tablet:text-[13px]',
    tag: 'text-[10px] p-[4px_10px]',
    content: 'p-[16px] tablet:p-[20px]',
    date: 'text-[11px]',
    gap: 'gap-[10px]',
    titleClamp: 'line-clamp-3',
    descClamp: 'line-clamp-2',
  },
  lg: {
    title: 'font-inter text-[15px] font-semibold leading-[1.35] tracking-[-0.015em] tablet:text-[16px] desktop:text-[17px]',
    description: 'text-[13px] leading-[1.55] tablet:text-[14px]',
    tag: 'text-[10px] p-[5px_12px]',
    content: 'p-[18px] tablet:p-[24px]',
    date: 'text-[12px]',
    gap: 'gap-[12px]',
    titleClamp: 'line-clamp-3',
    descClamp: 'line-clamp-3',
  },
};

export const ArticleCard = ({
  title,
  description,
  image,
  date,
  tag,
  slug,
  href,
  size = 'md',
  showTagsOverlay = true,
  maxTags = 2,
  downloadLink,
  showDownloadLink = false,
  onClick,
  className = '',
}: ArticleCardProps) => {
  const config = sizeConfig[size];
  const tags = tag?.split(',').slice(0, maxTags);
  const formattedDateStr = date ? formattedDate(date) : null;
  const linkHref = href || (slug ? slug : '#');

  const CardContent = (
    <div className={`group flex h-full flex-col ${className}`}>
      <div className='overflow-hidden rounded-t-[8px] transition-shadow duration-300 hover:shadow-lg'>
        {/* Image Container */}
        <div className='image-container relative flex aspect-[16/9] overflow-hidden transition-transform duration-500 before:opacity-0 before:duration-300 group-hover:before:opacity-20'>
          <Image
            src={image || defaultImg}
            alt={title}
            width={450}
            height={250}
            className='absolute h-full w-full object-cover object-center'
            quality={80}
          />

          {/* Tags Overlay */}
          {showTagsOverlay && tags && tags.length > 0 && (
            <div className='relative z-10 mt-auto flex gap-[8px] p-[12px] tablet:p-[16px]'>
              {tags.map((item, idx) => (
                <span
                  key={idx}
                  className={`w-fit rounded-[4px] font-inter font-bold uppercase text-text-dark ${config.tag} ${
                    idx === 0 ? 'bg-main-orange' : 'bg-white'
                  }`}
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`flex w-full flex-1 flex-col items-stretch rounded-b-[8px] bg-card-bg ${config.content}`}
        >
          {/* Tags below image (when not overlay) */}
          {!showTagsOverlay && tags && tags.length > 0 && (
            <div className={`flex flex-wrap ${config.gap} mb-[8px]`}>
              {tags.map((item, idx) => (
                <span
                  key={idx}
                  className={`w-fit rounded-[4px] bg-gray-200 font-inter font-semibold uppercase text-text-dark ${config.tag}`}
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className={`${config.title} ${config.titleClamp} overflow-hidden text-text-dark duration-300 group-hover:underline`}
          >
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p
              className={`mt-[8px] ${config.description} ${config.descClamp} overflow-hidden font-inter text-text-dark/60`}
            >
              {description}
            </p>
          )}

          {/* Date */}
          {formattedDateStr && (
            <span className={`mt-[8px] ${config.date} text-text-dark/50`}>
              {formattedDateStr}
            </span>
          )}

          {/* Download Link */}
          {showDownloadLink && downloadLink && (
            <div className='mt-[16px]'>
              <DownloadLink link={downloadLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Return with or without Link wrapper
  if (onClick) {
    return (
      <button type='button' onClick={onClick} className='w-full text-left'>
        {CardContent}
      </button>
    );
  }

  if (linkHref && linkHref !== '#') {
    return (
      <Link href={linkHref} className='flex h-full flex-col'>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};
