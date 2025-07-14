import Arrow from '@/public/assets/images/icons/arrow.svg';
import { MenuItems } from '@/src/utils/enums';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  list: List[];
  dark?: boolean;
  activeSubmenu: boolean;
  onMenuItemHover: (isActive: boolean) => void;
}

interface List {
  id: number;
  name: string;
  link: string;
}

export const MainList = ({
  list,
  dark = true,
  activeSubmenu,
  onMenuItemHover,
}: Props) => {
  const pathname = usePathname();

  return (
    <ul className='hidden justify-center gap-[44px] laptop-big:flex'>
      {list.map((item) => (
        <li
          onMouseEnter={
            item.name.toLowerCase() === `${MenuItems.PLAYBOOK.toLowerCase()}`
              ? () => onMenuItemHover(true)
              : () => onMenuItemHover(false)
          }
          key={item.id}
          className='flex items-center justify-center gap-[10px]'
        >
          <Link
            href={item.link}
            className={classNames(
              `group relative border-b-[2px] border-transparent font-proxima leading-[1.87]`,
              dark
                ? 'text-[16px] text-white desktop:text-[16px]'
                : 'text-[16px] text-[black]',
              {
                'border-b-[2px] !border-main-blue': pathname.startsWith(
                  item.link,
                ),
              },
            )}
          >
            {item.name}
            <div className='absolute h-[2px] w-0 bg-main-blue transition-all duration-200 group-hover:w-full' />
          </Link>

          {item.name.toLowerCase() === 'expertise' && (
            <div className='h-fit w-fit'>
              <Arrow
                className={`h-[auto] w-[25px]  transition-transform duration-300 ease-in-out hover:fill-main-blue ${dark ? 'fill-white' : 'fill-main-bg'} ${activeSubmenu ? '-rotate-[-90deg]' : '-rotate-30'}`}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
