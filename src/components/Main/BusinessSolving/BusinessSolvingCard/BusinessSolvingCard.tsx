import { LinkArrow } from '@/src/ui-kit/LinkArrow/LinkArrow';
import { IImage } from '@/src/utils/types';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  link: string;
  tags: string[];
  image: IImage;
}

export const BusinessSolvingCard = ({
  title,
  description,
  link,
  tags,
  image,
}: Props) => {
  return (
    <div className='relative flex h-full w-full flex-col rounded-[6px] bg-dark-blue p-[40px_20px]'>
      <div className='z-10 flex h-full w-full flex-col'>
        <div className='flex items-center gap-[8px]'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`flex h-[38px] items-center justify-center rounded-[5px] bg-white px-[10px] font-proxima text-[21px] font-bold uppercase leading-[0.8] text-text-dark [&:nth-child(even)]:bg-main-gray [&:nth-child(even)]:text-white `}
            >
              {`${idx % 2 !== 0 ? '#' : ''}${tag}`}
            </span>
          ))}
        </div>
        <h3 className='mt-[58px] flex-1 font-proxima text-[28px] font-bold leading-[1.14] tablet:mt-[46px] laptop:text-[36px] desktop:text-[40px] desktop-big:mt-[56px]'>
          {title}
        </h3>
        <p className='mb-[32px] mt-[10px] flex-1 font-proxima text-[20px] leading-[1.2]'>
          {description}
        </p>
        <div className='h-fit w-fit'>
          <LinkArrow title='Go to the solution' link={link} />
        </div>
      </div>
      <div className='absolute inset-0 z-0 h-full w-[auto] overflow-hidden'>
        <Image
          src={image}
          fill
          alt='bg-image'
          className='h-full w-[auto] object-cover'
        />
      </div>
    </div>
  );
};
