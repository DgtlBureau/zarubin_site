import { GenerateIcon } from '@/src/utils/generateIcon/GenerateIgon';
import Image from 'next/image';

interface IExpertiseCard {
  data: {
    title: string;
    logo: string;
    description: string;
    image: string | undefined | null;
  };
  idx: number;
}

export const ExpertiseCard = ({ data, idx }: IExpertiseCard) => {
  const { logo, title, description } = data;

  return (
    <div
      className={`relative flex flex-col items-start gap-[36px] rounded-[5px] p-[30px] ${idx % 2 === 0 ? 'gradientR' : 'gradientL'}`}
    >
      {data.image && (
        <Image
          fill
          objectFit='cover'
          objectPosition='center'
          src={data.image}
          alt=''
          className='-z-10 opacity-25'
        />
      )}
      <div className='mr-auto flex h-[50px] w-[50px] items-center justify-center rounded-[6px] bg-white'>
        <GenerateIcon path={logo} color='rgba(105, 105, 105, 1)' />
      </div>
      <div className='mt-auto flex flex-col gap-[24px]'>
        <h3 className='font-unbound text-[20px] font-bold uppercase leading-[1.1] text-main-bg desktop:text-[24px]'>
          {title}
        </h3>
        {description && (
          <p className='font-regular text-[16px]'>{description}</p>
        )}
      </div>
    </div>
  );
};
