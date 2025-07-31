'use client';

import Arrow from '@/public/assets/images/icons/arrow.svg';
import { footerLinks } from '@/src/utils/footerLinks/footerLinks';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export const FooterLinks = () => {
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <ul className='grid grid-cols-2 gap-[19px] tablet:grid-cols-3 tablet:gap-[30px] desktop:grid-cols-6'>
        {footerLinks.map((item) => {
          const isExpanded = expandedItems[item.id] || false;
          const hasMore = item.links.length > 6;
          const firstLinks = item.links.slice(0, 6);
          const remainingLinks = item.links.slice(6);

          return (
            <li key={item.id}>
              <p className='font-proxima text-[20px] font-bold'>{item.title}</p>
              <ul className='mt-[20px] flex flex-col gap-[12px]'>
                {firstLinks.map((el, idx) => (
                  <>
                    <li key={idx}>
                      {el.link ? (
                        <Link
                          href={el.link}
                          className={`font-regular font-proxima text-[16px] leading-[1.2] text-white/60 duration-300 hover:text-white`}
                        >
                          {el.name}
                        </Link>
                      ) : (
                        <p className='font-regular font-proxima text-[16px] leading-[1.2] text-white/20'>
                          {el.name}
                        </p>
                      )}
                    </li>
                  </>
                ))}
              </ul>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key='more'
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='m-0 overflow-hidden p-0'
                  >
                    <ul className='mt-[12px] flex flex-col gap-[12px]'>
                      {remainingLinks.map((el, index) => (
                        <li key={index}>
                          {el.link ? (
                            <Link
                              href={el.link}
                              className={`font-regular font-proxima text-[16px] leading-[1.2] text-white/60 duration-300 hover:text-white`}
                            >
                              {el.name}
                            </Link>
                          ) : (
                            <p className='font-regular font-proxima text-[16px] leading-[1.2] text-white/20'>
                              {el.name}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              {hasMore && (
                <button
                  type='button'
                  onClick={() => toggleExpand(item.id)}
                  className='mt-[10px]'
                >
                  <Arrow
                    className={`w-[24px] duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`}
                  />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
