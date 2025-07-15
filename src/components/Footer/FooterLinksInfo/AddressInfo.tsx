import Link from 'next/link';

export const AddressInfo = () => {
  return (
    <div className='mt-[32px] flex flex-col gap-[20px] tablet:mt-[60px] laptop:mt-0 laptop:flex-row laptop:gap-[32px]'>
      <div className='flex flex-col gap-[12px] font-proxima'>
        <h4 className='tablet:leading-1 text-[18px] font-bold leading-[1.3] tablet:text-[20px]'>
          121 union mills Way Cary, NC 27519
        </h4>
        <Link
          href='tel:+13055282091'
          className='text-[16px] leading-[1.25] desktop:text-[20px] desktop:leading-[1.2]'
        >
          {'+1 (305) 528 2091'}
        </Link>
      </div>
    </div>
  );
};
