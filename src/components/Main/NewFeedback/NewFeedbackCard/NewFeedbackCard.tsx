import { formattedDate } from '@/src/utils/formattedDate';
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

export const NewFeedbackCard = ({ data }: Props) => {
  return (
    <div className='flex h-full flex-col justify-between gap-[10px] rounded-t-[5px] bg-white px-[10px] py-[16px] mobile-big:px-[16px] mobile-big:py-[16px] tablet:p-[24px]'>
      <div>
        <div className='flex gap-[16px] tablet:gap-[24px]'>
          <Image
            src={data.image}
            quality={80}
            alt={data.name}
            className='h-[60px] w-[60px] rounded-full object-cover transition-opacity duration-500 mobile-big:h-[80px] mobile-big:w-[80px]'
            loading='lazy'
          />
          <div className='relative '>
            <div className='flex h-full flex-col items-center justify-center gap-[6px] transition-opacity duration-500'>
              <h3 className='font-proxima text-[16px] font-bold text-text-dark'>
                {data.name}
              </h3>
              <span className='font-proxima text-[12px] text-text-dark mobile-big:text-[13px]'>
                {data.job}
              </span>
            </div>
          </div>
        </div>
        <p className='mt-[16px] font-proxima text-[13px] leading-[1.5] text-text-dark'>
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
        {data?.date && (
          <span className='font-proxima text-[13px] text-text-dark opacity-50 mobile-big:text-[14px] tablet:text-[14px]'>
            {formattedDate(data.date)}
          </span>
        )}
      </div>
    </div>
  );
};
