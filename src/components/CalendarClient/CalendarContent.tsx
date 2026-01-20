import avatar from '@/public/assets/images/brief/ceo_founder.webp';
import Image from 'next/image';

export const CalendarContent = () => {
  return (
    <div className='flex h-full gap-[20px] font-proxima laptop-big:max-w-[306px] laptop-big:flex-col laptop-big:justify-between'>
      <div className='flex w-full flex-col items-center py-[10px] tablet:py-[55px] laptop-big:p-0'>
        <h3 className='text-center text-[20px] font-bold leading-[1] text-text-dark'>
          40-Minute Blueprint Creation Session
        </h3>
        <p className='mt-[8px] text-center text-[16px] leading-[1.2] text-text-dark'>
          Please make sure you choose the appropriate time zone for you.
        </p>
        <p className='mt-[40px] max-w-[180px] text-center text-[16px] font-bold leading-[1.2] text-main-blue-hover'>
          {"But please do not book if you're unwilling to"}
        </p>
      </div>
      <div className='flex w-full flex-col items-center justify-center border-l-[1px] border-[#e6e6e6] laptop-big:border-l-0 laptop-big:border-t-[1px] laptop-big:py-[36px]'>
        <Image
          src={avatar}
          width={136}
          height={139}
          quality={80}
          alt='ceo-founder'
          className='h-[auto] w-[107px] rounded-[20px] tablet:w-[136px]'
        />
        <p className='mt-[24px] text-center text-[16px] font-bold leading-[1.2]'>
          Vitaly Z.
        </p>
        <span className='mt-[4px] text-center text-[16px] leading-[1.2]'>
          CEO The BrightByte
        </span>
      </div>
    </div>
  );
};
