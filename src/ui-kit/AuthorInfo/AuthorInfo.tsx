import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  date: string;
}

export const AuthorInfo = ({ image, name, date }: Props) => {
  return (
    <div className='flex items-center gap-[12px] tablet:gap-[20px]'>
      <Image
        src={image}
        width={49}
        height={49}
        alt={name}
        className='w-[49px] rounded-full tablet:h-[80px] tablet:w-[80px]'
      />
      <div className='flex w-full flex-col '>
        <span className='font-inter text-[18px] font-bold leading-[1.33] text-text-dark tablet:min-w-[309px] tablet:max-w-[309px]'>
          Written by {name}
        </span>
        <span className='font-inter text-[18px] leading-[1.33] text-text-dark'>
          {date}
        </span>
      </div>
    </div>
  );
};
