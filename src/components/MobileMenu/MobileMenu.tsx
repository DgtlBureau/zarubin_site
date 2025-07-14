import Arrow from '@/public/assets/images/icons/arrow.svg';
import { menuListLayer } from '@/src/utils/menuListLayer';
import { ISubmenu, Post } from '@/src/utils/types';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ExpertiseSubmenuArticles } from '../Expertise/ExpertiseSubMenu/ExpertiseSubmenuArticles/ExpertiseSubMenuArticles';
import { ExpertiseSubMenuList } from '../Expertise/ExpertiseSubMenu/ExpertiseSubmenuArticles/ExpertiseSubMenuList';
import { ContactWrapper } from './ContactWrapper/ContactWrapper';
import styles from './MobileMenu.module.css';
import { MenuItems } from '@/src/utils/enums';

interface Props {
  isOpen: boolean;
  onClick: () => void;
  expertiseSubMenu: ISubmenu[];
  data: Post[];
}

export const MobileMenu = ({
  isOpen,
  onClick,
  expertiseSubMenu,
  data,
}: Props) => {
  const [isOpenExpertiseSubMenu, setIsOpenexpertiseSubmenu] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsOpenexpertiseSubmenu(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(
        styles.menuWrapper,
        styles.dark,
        isOpen && styles.active,
      )}
    >
      <div className={`${styles.content}`}>
        <div
          className={`mb-[40px] w-full duration-300 ${isOpenExpertiseSubMenu ? 'opacity-0' : 'opacity-1'}`}
        >
          <ul className={styles.menuList}>
            {menuListLayer.map((item) => (
              <li key={item.id} className='flex flex-col'>
                <div className='w-100 flex items-center justify-between gap-[10px]'>
                  {item.name.toLowerCase() !==
                  `${MenuItems.PLAYBOOK.toLowerCase()}` ? (
                    <Link
                      href={item.link}
                      className={`${styles.menuLink} ${styles.dark} font-proxima`}
                      onClick={onClick}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type='button'
                      onClick={() =>
                        setIsOpenexpertiseSubmenu(!isOpenExpertiseSubMenu)
                      }
                      className={`${styles.menuLink} ${styles.dark} font-proxima`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`absolute flex w-full flex-col gap-[24px] overflow-auto bg-main-bg pb-[60px] duration-300 tablet:gap-[40px] ${isOpenExpertiseSubMenu ? 'left-0' : 'left-[-100%]'}`}
        >
          <div>
            <button
              type='button'
              onClick={() => setIsOpenexpertiseSubmenu(false)}
              className='flex items-center gap-[12px] font-unbound text-[18px] font-bold uppercase text-white tablet:text-[20px]'
            >
              <Arrow className='h-[26px] w-[26px] rotate-[180deg] fill-white' />
              Playbook
            </button>
            <div className='mt-[24px]'>
              <ExpertiseSubMenuList data={expertiseSubMenu} onClick={onClick} />
            </div>
          </div>
          <ExpertiseSubmenuArticles data={data} onClick={onClick} />
          <div className='mt-[40px]'>
            <ContactWrapper onClick={onClick} />
          </div>
        </div>
        <div className='mt-[auto] pb-[40px]'>
          <ContactWrapper onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
