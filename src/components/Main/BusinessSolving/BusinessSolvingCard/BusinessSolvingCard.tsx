import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';
import { LinkArrow } from '@/src/ui-kit/LinkArrow/LinkArrow';
import { IImage } from '@/src/utils/types';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  industries: string[];
  link: string;
  tag: string;
  image: IImage | string;
}

export const BusinessSolvingCard = ({
  title,
  description,
  link,
  industries,
  tag,
  image,
}: Props) => {
  const joinTag = tag.replace(' ', '');

  return (
    <div className='relative flex h-full w-full flex-col rounded-[6px] bg-dark-blue p-[40px_20px]'>
      <div className='z-10 flex h-full w-full flex-col'>
        <div className='flex flex-wrap items-center gap-[8px]'>
          <NextLinePreposition
            tag='span'
            text={industries[0]}
            className={`flex max-w-fit items-center justify-start rounded-[5px] bg-white p-[10px] font-inter text-[18px] font-bold uppercase leading-[0.8] text-text-dark laptop:text-[21px] [&:nth-child(even)]:bg-main-gray [&:nth-child(even)]:text-white `}
          />
          <span className='flex items-center justify-start rounded-[5px] bg-main-gray p-[10px] font-inter text-[18px] font-bold uppercase leading-[0.8] text-white laptop:text-[21px]'>
            #{joinTag}
          </span>
        </div>
        <NextLinePreposition
          tag='h3'
          text={title}
          className='mt-[58px] flex-1 font-inter text-[28px] font-bold leading-[1.14] tablet:mt-[46px] laptop:text-[36px] desktop:text-[40px] desktop-big:mt-[56px]'
        />
        <NextLinePreposition
          tag='p'
          text={description}
          className='mb-[32px] mt-[10px] flex-1 font-inter text-[20px] leading-[1.2]'
        />
        <div className='h-fit w-fit'>
          <LinkArrow title='Go to the solution' link={link} />
        </div>
      </div>
      <div className='absolute inset-0 z-0 h-full w-[auto] overflow-hidden'>
        <Image
          src={image}
          fill
          sizes='(min-width: 1800px) 860px, (min-width: 1600px) 760px, (min-width: 1440px) 680px, (min-width: 1280px) 600px, (min-width: 1200px) 560px, (min-width: 768px) 728px, 90vw'
          alt='bg-image'
          className='h-full w-auto object-cover'
          loading='lazy'
        />
      </div>
    </div>
  );
};
