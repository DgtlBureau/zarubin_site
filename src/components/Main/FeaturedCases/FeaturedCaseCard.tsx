'use client';

import { cn } from '@/src/lib/utils';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import Image from 'next/image';
import Link from 'next/link';

export interface FeaturedCaseData {
  slug: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  bannerImage: string;
}

interface FeaturedCaseCardProps {
  data: FeaturedCaseData;
  className?: string;
}

export const FeaturedCaseCard = ({ data, className }: FeaturedCaseCardProps) => {
  return (
    <Link
      href={`/cases/${data.slug}`}
      className={cn('group flex h-full flex-col', className)}
    >
      <div className='overflow-hidden rounded-t-[5px] hover:shadow-lg'>
        {/* Image container with tags */}
        <div className='image-container relative flex aspect-[16/9] transition-transform duration-500 before:opacity-0 before:duration-300 group-hover:before:opacity-20'>
          <Image
            src={data.bannerImage}
            alt={data.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover object-center'
            quality={80}
          />
          {/* Tags at bottom of image */}
          <div className='relative z-10 mt-auto flex flex-wrap gap-[8px] p-[16px] text-text-dark'>
            {data.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className={cn(
                  'w-fit rounded-[5px] px-[10px] py-[6px] font-proxima text-[13px] font-bold uppercase text-text-dark',
                  idx === 0 ? 'bg-main-orange' : 'bg-white'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='flex h-full w-full flex-1 flex-col items-stretch rounded-b-[5px] bg-card-bg px-[16px] py-[16px] tablet:px-[20px]'>
          {/* Name */}
          <span className='font-proxima text-[11px] font-semibold uppercase tracking-[0.05em] text-text-dark/50'>
            {data.name}
          </span>

          {/* Title */}
          <NextLinePreposition
            tag='h3'
            text={data.title}
            className='mt-[8px] line-clamp-2 overflow-hidden font-unbound text-[14px] font-bold uppercase leading-[1.2] text-text-dark duration-300 group-hover:underline tablet:text-[15px]'
          />

          {/* Description */}
          <NextLinePreposition
            tag='p'
            text={data.description}
            className='mt-[8px] line-clamp-2 overflow-hidden font-proxima text-[13px] leading-[1.4] text-text-dark/60'
          />
        </div>
      </div>
    </Link>
  );
};
