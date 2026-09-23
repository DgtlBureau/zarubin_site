import { GenerateIcon } from '@/src/utils/generateIcon/GenerateIgon';
import { CARD_GRID_COLUMNS, coverSizes, withBox } from '@/src/utils/imageSizes';
import Image from 'next/image';

// Faded background photo; the card is taller than the photos' ratio, so
// cover never draws them wider than the card.
const BACKGROUND_SIZES = coverSizes(
  undefined,
  withBox(CARD_GRID_COLUMNS, { boxAspect: 1 }),
);

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
      className={`relative flex flex-col items-start gap-[24px] rounded-[8px] p-[24px] tablet:p-[28px] ${idx % 2 === 0 ? 'gradientR' : 'gradientL'}`}
    >
      {data.image && (
        <Image
          fill
          sizes={BACKGROUND_SIZES}
          src={data.image}
          alt={title}
          className='-z-10 opacity-20 object-cover object-center'
        />
      )}
      <div className='mr-auto flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-white'>
        <GenerateIcon path={logo} color='rgba(105, 105, 105, 1)' />
      </div>
      <div className='mt-auto flex flex-col gap-[12px]'>
        <h3 className='font-inter text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-main-bg tablet:text-[16px]'>
          {title}
        </h3>
        {description && (
          <p className='line-clamp-3 font-inter text-[13px] leading-[1.55] text-text-dark/60 tablet:text-[14px]'>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
