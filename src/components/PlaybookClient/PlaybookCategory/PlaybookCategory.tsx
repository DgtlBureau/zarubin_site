'use client';

import { underscopeFormatter } from '@/src/utils/formatter/underscopeFormatter';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface ICategoryProps {
  category: ICategory[];
}

interface ICategory {
  category: string;
  subCategory: (string | null | undefined)[];
}

const paramsCorrect = (word: string | null | undefined) => {
  if (!word) return '';
  const newWord = word.replace(' ', '_');
  return newWord;
};

export const PlaybookCategory = ({ category }: ICategoryProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('subCategory');

  return (
    <div className='mt-[10px]'>
      {category && category.length !== 0 && (
        <ul className='flex flex-col gap-[4px]'>
          <li className=''>
            <Link
              href='/playbook'
              className={`font-proxima text-[16px] capitalize leading-[1.8] ${pathname === '/playbook' ? 'font-bold' : ''}`}
            >
              all
            </Link>
          </li>
          {category.map((item) => (
            <li
              key={item.category}
              className='flex flex-col items-start gap-[2px]'
            >
              <Link
                href={`/playbook/${item.category}${item.subCategory.length > 1 ? '?' : `?subCategory=${paramsCorrect(item.subCategory[0]).toLowerCase()}`}`}
                className={`font-proxima text-[16px] capitalize duration-300 ${pathname.includes(item.category.trim().toLowerCase()) ? 'font-bold' : ''}`}
              >
                {item.category}
              </Link>
              <ul className='ml-[10px] flex flex-col gap-[2px]'>
                {item.subCategory &&
                  item.subCategory.map((el) => (
                    <li
                      key={el}
                      className={`font-proxima text-[16px] leading-[1.8] duration-300 ${el && subCategory && subCategory === underscopeFormatter(el.trim().toLowerCase()) ? 'font-bold' : ''}`}
                    >
                      <Link
                        href={`/playbook/${item.category}?subCategory=${underscopeFormatter(el).toLowerCase()}`}
                        className='relative'
                      >
                        {el}
                        <span
                          className={`absolute bottom-0 left-0 block h-[1px] w-full duration-300 ${el && underscopeFormatter(subCategory).toLowerCase() === underscopeFormatter(el.trim().toLowerCase()) ? 'bg-main-blue' : ''}`}
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
