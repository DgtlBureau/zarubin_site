import Back from '@/public/assets/images/icons/back.svg';

interface IBtnProps {
  step: number;
  nextClick: () => void;
  backClick: () => void;
}

export const NextBackButton = ({ step, nextClick, backClick }: IBtnProps) => {
  const isStarted = step !== 0;

  return (
    <div
      className={`mt-[40px] flex w-full items-center font-inter text-[20px] font-bold leading-[1] ${isStarted ? 'justify-between' : 'justify-center'}`}
    >
      {isStarted && (
        <button
          type='button'
          onClick={backClick}
          className='flex items-center justify-center gap-[10px]'
        >
          <Back className='w-[24px]' />
          Back
        </button>
      )}
      <button
        type='button'
        onClick={nextClick}
        className='rounded-[6px] bg-main-blue p-[13px_32px] text-[20px] leading-[1] text-white duration-300 hover:bg-main-blue-hover'
      >
        {isStarted ? 'Next' : 'Get Started'}
      </button>
    </div>
  );
};
