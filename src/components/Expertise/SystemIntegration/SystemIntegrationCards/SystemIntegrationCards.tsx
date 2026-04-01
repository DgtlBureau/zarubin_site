import classNames from 'classnames';

const CARDS_DATA = [
  'create a unified infrastructure',
  'enhancing data flow',
  'operational efficiency',
];

export const SystemIntegrationCards = () => {
  return (
    <div className='grid tablet:grid-cols-3'>
      {CARDS_DATA.map((text, index) => (
        <div
          key={text}
          className={classNames(
            'relative -ml-[1px] -mt-[1px] flex h-[176px] flex-col justify-end border-[1px] border-solid border-[var(--blue-hover)] p-[20px] tablet:h-[300px] desktop-big:h-[496px]',
            index === CARDS_DATA.length - 1
              ? 'bg-white text-text-dark'
              : 'text-[var(--main-gray)]',
          )}
        >
          <div className='absolute inset-[20px] w-[69px] tablet:w-[176px]'>
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 176 154'
              fill='none'
              preserveAspectRatio='xMinYMin meet'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0H176L0 154V0Z' fill='#013EDF' />
            </svg>
          </div>
          <div className='font-inter text-[26px] font-bold desktop-big:text-[40px]'>
            {text}
          </div>
        </div>
      ))}
    </div>
  );
};
