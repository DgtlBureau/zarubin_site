import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { NextLinePreposition } from '../../NextLinePreposition/NextLinePreposition';

export const ImprovingMetrcsCard = () => {
  return (
    <div className='z-[5] rounded-[5px] bg-white p-[20px]'>
      <div className='max-w-[500px]'>
        <NextLinePreposition
          tag='h3'
          text='Top 15 Best Practices for Improving Metrics in Sports'
          className='font-unbound text-[24px] font-bold uppercase leading-[1.16] text-text-dark tablet:text-[22px] tablet:leading-[1.2] desktop-hard:text-[24px] desktop-hard:leading-[1.16]'
        />
        <NextLinePreposition
          tag='p'
          text='Implement it in order to increase metrics and change the attitude of the audience to the brand'
          className='mt-[12px] font-inter text-[20px] leading-[1.2] text-text-dark desktop:mt-[19px]'
        />
      </div>
      <div className='mt-[20px] flex flex-col gap-[25px] tablet:flex-row desktop:mt-[25px]'>
        <DownloadLink link='https://drive.google.com/file/d/1eXyUyvjlXv0i7gtawqK7D1jtEYGfC4nR/view' />
      </div>
    </div>
  );
};
