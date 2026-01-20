import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { formattedDate } from '@/src/utils/formattedDate';
import Image from 'next/image';
import { NextLinePreposition } from '../NextLinePreposition/NextLinePreposition';

interface Props {
  tag: string;
  title: string;
  description: string;
  date: string;
  image: string | undefined;
}

export const SmallBlogCard = ({
  tag,
  title,
  description,
  date,
  image,
}: Props) => {
  const formatDate = formattedDate(date);
  const tags = tag?.split(',');

  return (
    <div className='group flex h-full flex-col pr-[10px]'>
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
        <div className='flex h-[260px] w-full flex-1 flex-col items-stretch rounded-b-[5px] bg-card-bg px-[20px] py-[24px] tablet:px-[30px] tablet:py-[28px]'>
          <NextLinePreposition
            tag='h3'
            text={title}
            className='mt-[12px] line-clamp-3 overflow-hidden font-proxima text-[16px] font-bold leading-[1.25] text-text-dark duration-300 group-hover:underline tablet:text-[18px]'
          />
          <NextLinePreposition
            tag='p'
            text={description}
            className='mb-auto mt-[12px] line-clamp-2 overflow-hidden font-proxima text-[14px] leading-[1.4] text-text-dark/60 tablet:text-[16px]'
          />
          {date && (
            <span className='mt-[14px] text-text-dark/60'>{formatDate}</span>
          )}
        </div>
      </div>
    </div>
  );
};
