import LinkArrow from '@/public/assets/images/icons/link_arrow.svg';
import {
  formatLink,
  formatMenuItem,
  formatMenuTitle,
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
      <div className='flex w-full flex-col gap-[20px] laptop-big:w-[464px]'>
        {data.map((item) => {
          if (item.folderItems.length === 0) return null;
          return (
            <div key={item.name} className={`flex flex-col p-[5px] text-white`}>
              <h3 className='flex w-full flex-1 items-center justify-between text-left font-proxima text-[20px] font-bold'>
                {item.name === 'it_services'
                  ? 'IT Services'
                  : formatMenuTitle(item.name)}
              </h3>
              <div
                className={`relative mt-[10px] flex w-full transform gap-x-[20px] gap-y-[20px] overflow-hidden bg-dark-blue p-[20px] px-[20px]`}
              >
                <ul
                  className={`relative grid w-full grid-cols-1 gap-x-[40px] gap-y-[12px] tablet:grid-cols-2 laptop:gap-x-[80px]`}
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
                          className='w-full font-proxima leading-[1.87]'
                          onClick={onClick}
                        >
                          <Link
                            className='relative w-full border-b-[2px] border-solid border-transparent py-[5px] font-proxima text-[16px] leading-[1.1] hover:border-main-blue'
                            href={`/expertise${formatLink(el.link)}`}
                          >
                            {formatMenuItem(formatLink(el.nameItem))}
                          </Link>
                        </li>
                      ))}
                  <span className='absolute left-[calc(50%-20px)] hidden h-full w-[1px] translate-x-[-50%] bg-[#001450] tablet:block laptop:left-[50%]' />
                </ul>
              </div>
              <Link
                href='/playbook/expertise'
                className='group mt-[12px] flex items-center gap-[10px] whitespace-nowrap font-proxima text-[20px] font-bold leading-[1] text-main-blue hover:text-main-blue-hover laptop-big:mt-[20px]'
              >
                Go to Expertise
                <LinkArrow className='h-[auto] w-[24px] fill-main-blue group-hover:fill-main-blue-hover' />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
