import Link from 'next/link';

interface IBreadProps {
  breadcrumbs: Breadcrumb[];
  light?: boolean;
}

export type Breadcrumb = {
  title: string;
  link?: string;
};

export const Breadcrumbs = ({ breadcrumbs, light = false }: IBreadProps) => {
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
    </div>
  );
};
