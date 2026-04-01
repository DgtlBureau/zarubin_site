import { DefaultImage } from '@/src/ui-kit/DefaultImage/DefaultImage';
import { formattedDate } from '@/src/utils/formattedDate';
import Image from 'next/image';
import Link from 'next/link';
import { NextLinePreposition } from '../NextLinePreposition/NextLinePreposition';

interface Data {
  title: string;
  description: string;
  image: string | undefined;
  subCategory: string | null | undefined;
  date: string;
  tag: string | undefined;
  slug: string;
}

interface Props {
  post: Data;
}

export const BlogCard = ({ post }: Props) => {
  const date = formattedDate(post.date);
  const tags = post.tag?.split(',');

  return (
    <Link href={`/insights/${post.slug}`} className='w-full'>
      <div className='flex w-full flex-col gap-[8px]'>
        <div className='relative h-[150px] w-full overflow-hidden rounded-[12px] bg-main-blue/20 tablet:h-[300px] desktop:h-[378px]'>
          {post.image ? (
            <Image
              src={post.image}
              alt={`Image ${post.slug}`}
              fill
              className='w-full object-cover object-center'
              quality={80}
            />
          ) : (
            <DefaultImage type={post.subCategory} />
          )}
        </div>
        <div className='flex flex-col items-start gap-[24px] rounded-[12px] bg-main-beige p-[14px_16px_16px] tablet:gap-[24px] tablet:p-[40px_24px_24px] desktop:p-[40px]'>
          <div className='flex flex-wrap gap-[12px]'>
            {post.tag?.length !== 0 &&
              tags?.map((item) => (
                <span
                  key={item}
                  className='rounded-[2px] bg-white p-[10px] font-inter text-[20px]'
                >
                  {item}
                </span>
              ))}
          </div>
          <NextLinePreposition
            tag='h3'
            text={post.title}
            className='font-inter text-[28px] font-bold leading-[1.14] tablet:text-[36px] tablet:leading-[1.1] desktop:text-[40px]'
          />
          <p className='line-clamp-2 overflow-hidden font-inter text-[20px] opacity-[70%]'>
            {post.description}
          </p>
          <span className='font-inter text-[16px] text-[#010C2C] opacity-[50%]'>
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
};
