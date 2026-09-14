import Link from 'next/link';

export const ContactUsBtn = () => {
  return (
    <Link
      href='/brief'
      className={`hidden w-fit items-center justify-center rounded-full border border-white/70 bg-transparent px-[26px] py-[12px] font-inter text-[16px] font-normal leading-[1] text-white transition-all duration-200 hover:bg-white hover:text-main-bg laptop-big:flex desktop:text-[17px]`}
    >
      Free strategy session
    </Link>
  );
};
