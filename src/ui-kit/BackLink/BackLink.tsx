import Back from '@/public/assets/images/icons/back.svg';
import Link from 'next/link';

interface Props {
  linkName: string;
}

export const BackLink = ({ linkName }: Props) => {
  return (
    <div className='absolute flex !h-full min-h-screen w-fit items-end'>
      <Link
        href={`/${linkName}`}
        className='sticky bottom-4 left-0 z-[5] h-fit w-fit items-center gap-[10px] font-inter text-[20px] font-bold text-text-dark desktop:flex'
      >
        <Back className='w-[24px]' />
        Back to {linkName}
      </Link>
    </div>
  );
};
