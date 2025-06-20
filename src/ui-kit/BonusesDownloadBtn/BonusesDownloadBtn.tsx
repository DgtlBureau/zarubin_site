import DownloadIcon from '@/public/assets/images/icons/file.svg';

interface IBtnProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const BonusesDownloadBtn = ({
  title,
  description,
  onClick,
}: IBtnProps) => {
  return (
    <button
      type='button'
      className='flex gap-[12px] rounded-[6px] bg-gradient-to-r from-main-orange to-main-orange-hover p-[10px]'
      onClick={onClick}
    >
      <DownloadIcon />
      <div className='flex flex-col items-start gap-[4px] font-proxima text-text-dark'>
        <p className='text-start text-[20px] font-bold leading-[1]'>
          File: {title}
        </p>
        <span className='font-regulag text-[12px] leading-[1.6]'>
          {description}
        </span>
      </div>
    </button>
  );
};
