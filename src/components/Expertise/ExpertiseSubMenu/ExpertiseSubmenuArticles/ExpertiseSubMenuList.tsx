import LinkArrow from '@/public/assets/images/icons/link_arrow.svg';
import { MenuItems } from '@/src/utils/enums';
import {
    formatLink,
    formatMenuItem,
    formatMenuTitle
} from '@/src/utils/formattedMenuItem';
import { ISubmenu } from '@/src/utils/types';
import { DateTime } from 'luxon';
import Link from 'next/link';

interface IProps {
  data: ISubmenu[];
  onClick: () => void;
}

export const ExpertiseSubMenuList = ({ data, onClick }: IProps) => {
  return (
    <div>
      <div className='flex w-full flex-col gap-[16px] laptop-big:w-[560px]'>
        {data.map((item) => {
          if (item.folderItems.length === 0) return null;
          return (
            <div key={item.name} className={`flex flex-col p-[5px] text-white`}>
              <h3 className='flex w-full flex-1 items-center justify-between text-left font-unbound text-[16px] font-bold uppercase'>
                {formatMenuTitle(item.name)}
              </h3>
              <div
                className={`relative mt-[8px] flex w-full transform gap-x-[16px] gap-y-[16px] overflow-hidden bg-dark-blue p-[16px] px-[16px]`}
              >
                <ul
                  className={`relative grid w-full grid-cols-1 gap-x-[32px] gap-y-[8px] tablet:grid-cols-2 laptop:gap-x-[48px]`}
                >
                  {item.folderItems.length !== 0 &&
                    item.folderItems
                      .sort(
                        (a, b) =>
                          DateTime.fromFormat(b.date, 'dd-MM-yyyy').toMillis() -
                          DateTime.fromFormat(a.date, 'dd-MM-yyyy').toMillis(),
                      )
                      .slice(0, 6)
                      .map((el) => (
                        <li
                          key={el.nameItem}
                          className='w-full overflow-hidden font-proxima leading-[1.4]'
                          onClick={onClick}
                        >
                          <Link
                            className='block truncate border-b-[2px] border-solid border-transparent py-[4px] font-proxima text-[14px] leading-[1.2] text-link-gray hover:text-white'
                            href={`/${MenuItems.PLAYBOOK.toLowerCase()}/expertise${formatLink(el.link)}`}
                            title={formatMenuItem(formatLink(el.nameItem))}
                          >
                            {formatMenuItem(formatLink(el.nameItem))}
                          </Link>
                        </li>
                      ))}
                  <span className='absolute left-[calc(50%-20px)] hidden h-full w-[1px] translate-x-[-50%] bg-[#001450] tablet:block laptop:left-[50%]' />
                </ul>
              </div>
              <Link
                href={`/${MenuItems.PLAYBOOK.toLowerCase()}/expertise?sub-category=${item.name}`}
                onClick={onClick}
                className='group mt-[10px] flex items-center gap-[8px] whitespace-nowrap font-proxima text-[14px] font-bold leading-[1] text-link-gray hover:text-white laptop-big:mt-[12px]'
              >
                Go to {formatMenuTitle(item.name)}
                <LinkArrow className='h-[auto] w-[18px] fill-link-gray group-hover:fill-white' />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
