import Link from 'next/link';

export const ContactUsBtn = () => {
  return (
    <Link
      href='/brief'
      className={`hidden w-fit items-center justify-center rounded-[6px] border-[1px] border-main-orange p-[14px_32px] font-inter text-[18px] font-bold leading-[1] text-white duration-300 hover:bg-main-orange-hover  hover:text-text-dark  laptop-big:flex desktop:text-[20px]`}
    >
      Free strategy session
    </Link>
  );
};
