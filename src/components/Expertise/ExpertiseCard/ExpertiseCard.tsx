import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { Post } from '@/src/utils/types';
import Image from 'next/image';
import Link from 'next/link';

interface IData {
  data: Post;
}

export const ExpertiseCard = ({ data }: IData) => {
  const { title, description, slug, image } = data;

  return (
    <Link
      href={`/expertise/${slug}`}
      className='flex h-full flex-col rounded-[5px] bg-card-bg'
    >
      <div className='relative aspect-[16/9] w-full overflow-hidden rounded-tl-[5px] rounded-tr-[5px]'>
        <Image
          src={image || defaultImg}
          alt={title || 'post image'}
          width={450}
          height={250}
          className='h-full w-full object-cover object-center'
          quality={80}
        />
      </div>
      <div className='flex h-full max-h-[160px] min-h-[160px] w-full flex-1 flex-col overflow-hidden rounded-b-[5px] px-[10px] py-[20px] tablet:px-[20px]'>
        <h3 className='line-clamp-5 overflow-hidden font-unbound text-[18px] font-bold uppercase leading-[1.3] text-text-dark tablet:text-[18px] tablet:leading-[1.4] desktop:line-clamp-4 desktop:text-[20px]'>
          {title}
        </h3>
        {description && (
          <p className='mt-auto line-clamp-3 overflow-hidden text-[16px] leading-[1.25]'>
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};
