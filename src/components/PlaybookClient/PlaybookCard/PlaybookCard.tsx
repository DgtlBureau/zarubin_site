'use client';

import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { formattedDate } from '@/src/utils/formattedDate';
import {
    underscopeFormatter,
    underscopeReverter
} from '@/src/utils/formatter/underscopeFormatter';
import { Post } from '@/src/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface IArticleProps {
  data: Post;
}

export const PlaybookCard = ({ data }: IArticleProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const subCategory = searchParams.get('subCategory');
  const tag = searchParams.get('tag');
  const allSearchParams = `${subCategory ? `subCategory=${subCategory}&` : ''}`;

  const formatedDate = formattedDate(data.date);
  const tags = data.tag
    ? data.tag.split(',').filter((tag) => tag.trim() !== '')
    : [];

  return (
    <div className='group flex flex-col gap-[40px] laptop:flex-row'>
      <Link
        href={`/playbook/${data.category.toLowerCase()}/${data.slug}`}
        className='relative aspect-[16/9] min-w-[360px] flex-1 overflow-hidden duration-300 group-hover:shadow-2xl laptop-big:max-h-[210px]'
      >
        <Image
          src={data.image || defaultImg}
          width={549}
          height={308}
          alt={data.title}
          className='h-full w-full object-cover object-center duration-300'
          quality={80}
          priority
        />
        <div className='absolute inset-0 bg-text-dark opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-30' />
      </Link>
      <div className='flex w-full flex-col gap-[20px] laptop-big:w-[70%]'>
        <h2 className='w-full font-unbound text-[18px] font-bold leading-[1.2] text-text-dark duration-300 group-hover:underline laptop-big:text-[24px]'>
          <Link href={`/playbook/${data.category.toLowerCase()}/${data.slug}`}>
            {data.title}
          </Link>
        </h2>
        <p className='w-full font-proxima text-[16px] leading-[1.2] text-text-dark'>
          <Link href={`/playbook/${data.category.toLowerCase()}/${data.slug}`}>
            {data.description}
          </Link>
        </p>
        <div className='flex w-full flex-col-reverse items-start gap-[20px] '>
          <span className='whitespace-nowrap font-proxima text-[14px] text-text-dark/60'>
            {formatedDate.toUpperCase()}
          </span>
          {tags && tags.length !== 0 && (
            <ul className='flex flex-wrap gap-[8px] desktop:gap-[24px]'>
              {tags.map((item) => (
                <li key={item} className='h-fit w-fit'>
                  <Link
                    href={`${pathname}?${allSearchParams}tag=${underscopeFormatter(item.trim())}`}
                    className={`border-text-text-dark/60 block rounded-[4px] border-[1px] p-[10px] font-proxima text-[12px] font-bold capitalize transition-transform 
                      duration-300 ease-in-out hover:bg-gray-300 focus:outline-none active:scale-95 tablet:text-[16px] ${underscopeReverter(tag).toLowerCase() === item.trim().toLowerCase() ? 'bg-gray-300' : 'bg-gray-200'}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
