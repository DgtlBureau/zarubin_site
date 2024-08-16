import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  list: List[];
  dark?: boolean;
}

interface List {
  id: number;
  name: string;
  link: string;
}

export const MainList = ({ list, dark = true }: Props) => {
  const pathname = usePathname();
  return (
    <ul className='hidden justify-center gap-[44px] laptop-big:flex'>
      {list.map((item) => (
        <li key={item.id}>
          <Link
            href={item.link}
            className={classNames(
              `border-solid border-main-blue font-proxima leading-[1.87] hover:border-b-[2px]`,
              dark
                ? 'text-[22px] text-white desktop:text-[26px]'
                : 'text-[16px] text-[black]',
              {
                'border-b-[2px]': pathname.startsWith(item.link),
              },
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
