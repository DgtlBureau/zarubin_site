import Arrow from '@/public/assets/images/icons/arrow.svg';

const BG = {
  DEFAULT: 'default',
  LIGHT: 'light',
  DARK: 'dark',
};
interface Props {
  prevPage: () => void;
  nextPage: () => void;
  bg?: string;
}

export const NextPrevBtn = ({ prevPage, nextPage, bg = BG.DEFAULT }: Props) => {
  return (
    <div className='flex items-center gap-[10px] desktop:gap-[20px]'>
      <button
        type='button'
        className={`group flex h-[40px] w-[40px] items-center justify-center rounded-[6px] duration-300 desktop:h-[50px] desktop:w-[50px] ${
          bg === BG.LIGHT
            ? 'border-[1px] border-main-bg bg-none hover:bg-card-bg-deep'
            : bg === BG.DARK
              ? 'border-[1px] border-white bg-none hover:bg-card-bg-deep'
              : 'bg-main-blue hover:bg-main-blue-hover'
        }`}
        onClick={prevPage}
        aria-label='Previous'
      >
        <Arrow
          aria-hidden='true'
          className={`rotate-[180deg] group-hover:fill-main-bg ${bg === BG.LIGHT ? 'fill-main-bg' : bg === BG.DARK ? 'fill-white' : 'fill-white'}`}
        />
      </button>
      <button
        type='button'
        className={`group flex h-[40px] w-[40px] items-center justify-center rounded-[6px] duration-300 desktop:h-[50px] desktop:w-[50px] ${
          bg === BG.LIGHT
            ? 'border-[1px] border-main-bg bg-none hover:bg-card-bg-deep'
            : bg === BG.DARK
              ? 'border-[1px] border-white bg-none hover:bg-card-bg-deep'
              : 'bg-main-blue hover:bg-main-blue-hover'
        }`}
        onClick={nextPage}
        aria-label='Next'
      >
        <Arrow
          aria-hidden='true'
          className={`group-hover:fill-main-bg ${
            bg === BG.LIGHT
              ? 'fill-main-bg'
              : bg === BG.DARK
                ? 'fill-white'
                : 'fill-white'
          }`}
        />
      </button>
    </div>
  );
};
