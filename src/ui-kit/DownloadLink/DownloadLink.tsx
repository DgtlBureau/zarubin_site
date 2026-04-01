import DownloadIcon from '@/public/assets/images/icons/download.svg';
import Link from 'next/link';

interface Props {
  link: string;
}

export const DownloadLink = ({ link }: Props) => {
  return (
    <Link
      href={link}
      download
      rel='noopener'
      target='_blank'
      className='flex items-start gap-[12px] rounded-[5px] bg-main-bg p-[10px] transition hover:bg-main-blue-hover'
    >
      <DownloadIcon className='h-[auto] w-[20px]' />
      <div className='flex flex-col gap-[4px] text-white'>
        <span className='font-inter text-[12px] font-bold leading-[1.33] tablet:text-[20px] tablet:leading-[1]'>
          Download the research
        </span>
        <span className='font-inter text-[12px] leading-[1.16]'>
          Downloaded 152 times already
        </span>
      </div>
    </Link>
  );
};
