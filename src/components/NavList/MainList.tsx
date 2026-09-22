import Arrow from '@/public/assets/images/icons/arrow.svg';
import { MenuItems } from '@/src/utils/enums';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  list: List[];
  dark?: boolean;
  activeSubmenu: boolean;
  onMenuItemHover: (isActive: boolean, kind?: 'expertise' | 'revanta') => void;
}

interface List {
  id: number;
  name: string;
  link: string;
  isHighlighted?: boolean;
  isExternal?: boolean;
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
            item.name === MenuItems.REVANTA_SPORTS
              ? () => onMenuItemHover(true, 'revanta')
              : item.name.toLowerCase() ===
                  `${MenuItems.PLAYBOOK.toLowerCase()}`
                ? () => onMenuItemHover(true, 'expertise')
                : () => onMenuItemHover(false)
          }
          key={item.id}
          className='flex items-center justify-center gap-[10px]'
        >
          {item.name === MenuItems.REVANTA_SPORTS ? (
            // Revanta is shown as its wordmark, not a button; hovering opens the product menu
            <Link
              href={item.link}
              className='group relative block h-[14px] w-[96px]'
            >
              {/* Hover crossfades to the blue wordmark instead of swapping src — no blank frame on first hover */}
              <Image
                src='/assets/images/revanta/wordmark-white.webp'
                alt='Revanta'
                fill
                sizes='96px'
                className='object-contain transition-opacity duration-200 group-hover:opacity-0'
              />
              <Image
                src='/assets/images/brand/revanta-wordmark-blue.webp'
                alt=''
                fill
                sizes='96px'
                className='object-contain opacity-0 drop-shadow-[0_0_10px_rgba(59,91,246,0.6)] transition-opacity duration-200 group-hover:opacity-100'
              />
            </Link>
          ) : item.isHighlighted ? (
            item.isExternal ? (
              <a
                href={item.link}
                className='rounded-lg bg-gradient-to-r from-regfo-secondary to-regfo-accent px-4 py-2 font-inter text-[14px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-regfo-secondary/25'
              >
                {item.name}
              </a>
            ) : (
              <Link
                href={item.link}
                className='rounded-lg bg-gradient-to-r from-regfo-secondary to-regfo-accent px-4 py-2 font-inter text-[14px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-regfo-secondary/25'
              >
                {item.name}
              </Link>
            )
          ) : (
            <Link
              href={item.link}
              className={classNames(
                `group relative border-b-[2px] border-transparent font-inter leading-[1.87]`,
                dark ? 'text-[18px] text-white' : 'text-[16px] text-[black]',
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
          )}

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
