import Back from '@/public/assets/images/icons/back.svg';
import LinkArrowIcon from '@/public/assets/images/icons/link_arrow.svg';

interface IButton {
  onClick: () => void;
  pageInfo: number;
  length: number;
}

export const TestNextBackButton = ({ onClick, pageInfo, length }: IButton) => {
  const isLastQuestion = pageInfo === length;

  return (
    <div
      className={`mt-[40px] flex w-full items-center justify-between font-inter text-[20px] font-bold leading-[1]`}
    >
      <button
        type='button'
        onClick={onClick}
        className='flex items-center justify-center gap-[10px]'
      >
        <Back className='w-[24px]' />
        Back
      </button>

      <button
        type='submit'
        className={`flex items-center gap-[10px] rounded-[6px] bg-main-blue font-inter ${isLastQuestion ? 'p-[13px_15px]' : 'p-[13px_32px]'} text-[20px] leading-[1] text-white duration-300 hover:bg-main-blue-hover`}
      >
        {isLastQuestion ? 'Book a meeting' : 'Next'}
        {isLastQuestion && <LinkArrowIcon className='h-[22px] w-[22px]' />}
      </button>
    </div>
  );
};
