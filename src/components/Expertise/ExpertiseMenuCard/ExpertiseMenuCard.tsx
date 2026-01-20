import defaultImg from '@/public/assets/images/banner/default_insights.webp';
import { MenuItems } from '@/src/utils/enums';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  tag: string | undefined;
  description: string;
  slug: string;
  subCategory: string | undefined | null;
  category: string | undefined | null;
  image: string | undefined | null;
  onClick: () => void;
}

export const ExpertiseMenuCard = ({
  title,
  description,
  category,
  slug,
  image,
  onClick,
}: Props) => {
  return (
    <Link
      href={`/${MenuItems.PLAYBOOK.toLowerCase()}/${category?.toLowerCase()}/${slug}`}
      onClick={onClick}
      className='flex w-full flex-col'
    >
      <div className='relative aspect-[16/9] w-full overflow-hidden'>
        <Image
          src={image || defaultImg}
          alt={title || 'post image'}
          width={450}
          height={250}
          className='h-full w-full object-cover object-center'
          quality={80}
        />
      </div>
      <div className='flex h-full w-full flex-1 flex-col items-stretch rounded-b-[5px] bg-white p-[16px]'>
        <h3 className='line-clamp-3 overflow-hidden font-unbound text-[11px] font-bold uppercase leading-[1.4] text-text-dark'>
          {title}
        </h3>
        <p className='mt-[8px] line-clamp-3 overflow-hidden font-proxima text-[13px] leading-[1.35] text-text-dark/70'>
          {description}
        </p>
      </div>
    </Link>
  );
};
