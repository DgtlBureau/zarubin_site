import Arrow from '@/public/assets/images/icons/link_arrow.svg';
import Link from 'next/link';

interface Props {
  title: string;
  link: string;
  target?: string;
}

export const LinkArrow = ({ title, link, target = '_self' }: Props) => {
  return (
    <Link
      rel={target === '_blank' ? 'noopener' : undefined}
      href={link}
      target={target}
      className='flex h-full w-full items-center gap-[10px] rounded-[6px] bg-main-blue px-[15px] py-[13px] font-inter text-[20px] font-bold text-white hover:bg-main-blue-hover'
    >
      {title}
      <Arrow className='h-[24px] w-[24px]' />
    </Link>
  );
};
