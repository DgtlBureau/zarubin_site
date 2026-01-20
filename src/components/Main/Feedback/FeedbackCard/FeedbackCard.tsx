import { IImage } from '@/src/utils/types';
import Image from 'next/image';

interface Data {
  id: number;
  name: string;
  job: string;
  image: IImage;
  feedback: string;
  logo: IImage;
  date: string;
}

interface Props {
  data: Data;
  length: number;
  indexNumber: number;
}

export const FeedbackCard = ({ data }: Props) => {
  return (
    <div className='flex h-full flex-col justify-between gap-[10px] rounded-t-[5px] bg-white px-[10px] py-[20px] mobile-big:px-[20px] mobile-big:py-[20px] tablet:p-[40px]'>
      <div>
        <div className='flex gap-[20px] tablet:gap-[40px]'>
          <Image
            src={data.image}
            quality={80}
            alt={data.name}
            className='h-[86px] w-[86px] rounded-full object-cover transition-opacity duration-500 mobile-big:h-[168px] mobile-big:w-[168px]'
            loading='lazy'
          />
          <div className='relative flex-col justify-between gap-[75px] tablet:pt-[25px]'>
            <div className='transition-opacity duration-500'>
              <h3 className='font-proxima text-[28px] font-bold text-text-dark mobile-big:text-[40px]'>
                {data.name}
              </h3>
              <span className='font-proxima text-[16px] text-text-dark mobile-big:text-[20px] tablet:text-[24px]'>
                {data.job}
              </span>
            </div>
          </div>
        </div>
        <p className='mt-[40px] font-proxima text-[16px] leading-[24px] text-text-dark mobile-big:text-[20px]'>
          {data.feedback}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <Image
          src={data.logo}
          quality={80}
          alt='Logo'
          className='h-auto max-h-[50px] max-w-[120px] w-auto object-contain'
          loading='lazy'
        />
        <span className='font-proxima text-text-dark opacity-50 mobile-big:text-[16px] tablet:text-[20px]'>
          {data.date}
        </span>
      </div>
    </div>
  );
};
