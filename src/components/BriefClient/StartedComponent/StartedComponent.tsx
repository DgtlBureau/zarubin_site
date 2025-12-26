'use client';

interface IStartProps {
  onClick: () => void;
}

export const StartedComponent = ({ onClick }: IStartProps) => {
  return (
    <div className='flex flex-col items-center py-[60px] text-text-dark  tablet:py-[30px] desktop-hard:py-[165px]'>
      <h1 className='section-headings text-center font-unbound font-bold uppercase leading-[1.14] tablet:leading-[1.1]'>
        FREE 40-minute Blueprint Creation Session
      </h1>
      <p className='mt-[20px] text-center font-proxima text-[12px] leading-[1.15] tablet:text-[16px] tablet:leading-[1.25]'>
        {
          "Get your 100% FREE no-obligation 40-minutes app blueprint creation session ($1,000 value) and we'll show you our proprietary product development blueprint - to not only turn your idea into real-shipped app, but bring it to the market successfully."
        }
      </p>

      <button
        type='button'
        onClick={onClick}
        className='mt-[40px] rounded-[6px] bg-main-blue p-[13px_32px] font-proxima text-[20px] font-bold leading-[1.1] text-white duration-300 hover:bg-main-blue-hover'
      >
        Get Started
      </button>
    </div>
  );
};
