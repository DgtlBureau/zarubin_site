import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { MenuItems } from '@/src/utils/enums';
import { formattedDate } from '@/src/utils/formattedDate';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  tag: string | undefined;
  description: string;
  downloadLink: string | undefined;
  slug: string;
  subCategory: string | undefined | null;
  image: string | undefined | null;
  date?: string;
  category: string;
}

export const NewInsightsCard = ({
  tag,
  title,
  description,
  downloadLink,
  slug,
  subCategory,
  image,
  date,
  category,
}: Props) => {
  const tags = tag?.split(',');

  return (
    <Link
      href={`/${MenuItems.PLAYBOOK.toLowerCase()}/${category.toLowerCase()}/${slug}`}
      className='group flex h-full flex-col pr-[10px]'
    >
      <div className='hover:shadow-lg'>
        <div className='image-container flex aspect-[16/9] transition-transform duration-500 before:opacity-0 before:duration-300 group-hover:before:opacity-20'>
          {image ? (
            <Image
              src={image}
              alt={title}
              width={450}
              height={250}
              className='absolute h-full w-full object-cover object-center'
              quality={80}
            />
          ) : (
            <Image
              src={defaultImg}
              alt={title}
              width={450}
              height={250}
              className='absolute h-full w-full object-cover object-center'
              quality={80}
            />
          )}
          <div className='z-60 relative mt-auto flex gap-[10px] p-[20px] text-text-dark'>
            {tags?.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className={`w-fit rounded-[5px] p-[6px_10px] font-proxima text-[16px] font-bold uppercase text-text-dark ${idx === 0 ? 'bg-main-orange' : 'bg-white'}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className='flex h-full w-full flex-1 flex-col items-stretch rounded-b-[5px] bg-card-bg px-[20px] py-[40px] tablet:px-[40px]'>
          <NextLinePreposition
            tag='h3'
            text={title}
            className='mt-[25px] line-clamp-3 overflow-hidden font-unbound text-[18px] font-bold uppercase leading-[1] text-text-dark duration-300 group-hover:underline tablet:text-[24px] tablet:leading-[1.16]'
          />
          <NextLinePreposition
            tag='p'
            text={description}
            className='mt-[19px] line-clamp-3 overflow-hidden font-proxima text-[16px] leading-[1.25] text-text-dark/60 tablet:text-[20px]'
          />
          {date && (
            <span className='mt-[14px] text-text-dark/60'>
              {formattedDate(date)}
            </span>
          )}
          {subCategory === 'Research' && downloadLink && (
            <div className='mt-[25px]'>
              <DownloadLink link={downloadLink} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
