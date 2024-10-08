import Back from '@/public/assets/images/icons/back.svg';
import Link from 'next/link';

interface Props {
  linkName: string;
}

export const BackLink = ({ linkName }: Props) => {
  return (
    <Link
      href={`/${linkName}`}
      className='stickyLink z-[5] ml-[33px] hidden w-fit items-center gap-[10px] font-proxima text-[20px] font-bold text-text-dark desktop:flex'
    >
      <Back className='w-[24px]' />
      Back to {linkName}
    </Link>
  );
};
