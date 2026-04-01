import Link from 'next/link';

export const ContactWrapper = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={`flex flex-col gap-[20px]`}>
      <Link
        href='/brief'
        onClick={onClick}
        className={`flex w-fit items-center justify-center rounded-[6px] border-[1px] border-[#f8ae3c] p-[14px_32px] font-inter text-[20px] font-bold leading-[1] text-white`}
      >
        Free strategy session
      </Link>
      <Link
        href='mailto:access@thebrightbyte.com '
        className={`font-inter text-[18px] font-bold leading-[1.1] text-white`}
      >
        access@thebrightbyte.com
      </Link>
    </div>
  );
};
