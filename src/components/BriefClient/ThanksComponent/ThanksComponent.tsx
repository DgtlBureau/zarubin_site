'use client';

import { useRouter } from 'next/navigation';
import { useQuestion } from '../../Contexts/QuestionContext';

export const ThanksComponent = () => {
  const { handleClearPage, handleClearData } = useQuestion();
  const router = useRouter();

  const handleExit = () => {
    handleClearData();
    handleClearPage();
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center gap-[20px] py-[60px] tablet:py-[101px] desktop-hard:py-[146px]'>
      <h2 className='flex flex-col text-center font-unbound text-[45px] font-bold uppercase leading-[1] text-main-blue-hover tablet:text-[50px] tablet:leading-[1.3] desktop:text-[70px] desktop:leading-[1.1]'>
        <span>Thanks!</span>
        <span>You are one step</span>
        <span>closer!</span>
      </h2>
      <p className='text-center font-inter text-[16px] leading-[1.2] text-text-dark'>
        {"But it's still a lot of work to do. We will come back ASAP."}
      </p>
      <button
        type='button'
        onClick={handleExit}
        className='rounded-[6px] bg-main-blue p-[13px_32px] font-inter text-[22px] font-bold leading-[1.1] text-white duration-300 hover:bg-main-blue-hover'
      >
        Go Bright
      </button>
    </div>
  );
};
