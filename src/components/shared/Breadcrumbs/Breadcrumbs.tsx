import Link from 'next/link';

interface IBreadProps {
  breadcrumbs: Breadcrumb[];
  light?: boolean;
  lastLink?: string;
  underlineLastLink?: boolean;
}

export type Breadcrumb = {
  title: string;
  link?: string;
};

export const Breadcrumbs = ({
  breadcrumbs,
  light = false,
  lastLink,
  underlineLastLink = false,
}: IBreadProps) => {
  return (
    <div
      className={`z-10 flex flex-wrap items-center gap-x-[20px] gap-y-[10px] font-proxima text-[20px]  ${light ? 'text-text-dark' : 'text-white'}`}
    >
      {breadcrumbs.map(({ title, link }, index) => (
        <>
          {index !== 0 && <>/</>}
          {link ? (
            <Link key={title} href={link}>
              {title}
            </Link>
          ) : (
            <div
              className={` opacity-80 ${light ? 'text-[var(--blue-hover)]' : 'text-[var(--main-gray)]'}`}
              key={title}
            >
              {title}
            </div>
          )}
        </>
      ))}
      {lastLink && (
        <div className='flex gap-[20px]'>
          <span>/</span>
          <Link
            href={lastLink}
            className={`text-teal-300 ${underlineLastLink ? 'underline' : ''}`}
          >
            Watch online
          </Link>
        </div>
      )}
    </div>
  );
};
