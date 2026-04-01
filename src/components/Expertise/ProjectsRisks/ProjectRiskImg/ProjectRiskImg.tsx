import Image from 'next/image';

import img1 from '@/public/assets/images/expertise/project_risk_1.webp';
import img2 from '@/public/assets/images/expertise/project_risk_2.webp';
import { NextLinePreposition } from '@/src/components/NextLinePreposition/NextLinePreposition';

export const ProjectRiskImg = () => {
  return (
    <div className='grid h-[140px] w-full grid-cols-2 gap-[20px] tablet:h-[241px] desktop:h-[362px]'>
      <div className='relative flex flex-col justify-end p-[12px] after:absolute after:inset-0 after:bg-gradient-to-t after:from-white after:to-[rgba(255,255,255,0)]'>
        <NextLinePreposition
          tag='p'
          text='Analyzing the current situation'
          className='z-10 font-inter text-[18px] font-bold leading-[1.3] text-slate-900 tablet:text-[36px]'
        />
        <Image
          src={img1}
          fill
          className='absolute inset-0 object-cover'
          alt='Analyzing the current situation'
          loading='lazy'
        />
      </div>
      <div className='after:to-[#FF 013EDF] relative flex flex-col justify-end p-[12px] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#013EDF]'>
        <NextLinePreposition
          tag='p'
          text='Making an action plan'
          className='z-10 font-inter text-[18px] font-bold leading-[1.3] text-white tablet:text-[36px]'
        />
        <Image
          src={img2}
          fill
          className='absolute inset-0 object-cover'
          alt='Making an action plan'
          loading='lazy'
        />
      </div>
    </div>
  );
};
