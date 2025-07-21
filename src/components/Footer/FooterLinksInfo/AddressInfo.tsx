import Link from 'next/link';

export const AddressInfo = () => {
  return (
    <div className='mt-[32px] flex flex-col gap-[20px] tablet:mt-[60px] laptop:mt-0 laptop:flex-row laptop:gap-[32px]'>
      <div className='flex flex-col gap-[12px] font-proxima'>
        <h4 className='tablet:leading-1 text-[18px] font-bold leading-[1.3] tablet:text-[20px]'>
          Cary, NC 27519, USA
        </h4>
        <Link
          href='tel:+13055282091'
          className='text-[16px] leading-[1.25] desktop:text-[20px] desktop:leading-[1.2]'
        >
          {''}
        </Link>
      </div>
      <div className='flex flex-col gap-[12px] font-proxima'>
        <h4 className='tablet:leading-1 text-[18px] font-bold leading-[1.3] tablet:text-[20px]'>
          Jurija Gagarina, Belgrade, Serbia
        </h4>
        <Link
          href='tel:+381637742270'
          className='text-[16px] leading-[1.25] desktop:text-[20px] desktop:leading-[1.2]'
        >
          {''}
        </Link>
      </div>
    </div>
  );
};
