'use client';

import { BurgerIcon } from '@/src/ui-kit/BurgerIcon/BurgerIcon';
import { ContactUsBtn } from '@/src/ui-kit/LeagueLink/ContactUsBtn';
import { Logo } from '@/src/ui-kit/LogoIcon/Logo';
import { menuListLayer } from '@/src/utils/menuListLayer';
import { ISubmenu, Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { MainList } from '../NavList/MainList';
import { Container } from '../shared/Container/Container';

enum Hide {
  BONUSES = 'bonuses',
}

const DynamicExpertiseMenu = dynamic(() =>
  import('../Expertise/ExpertiseSubMenu/ExpertiseSubMenu').then(
    (mod) => mod.ExpertiseSubMenu,
  ),
);

interface Props {
  expertiseSubmenu: ISubmenu[];
  expertiseMetadata: Post[];
}

export const Header = ({
  expertiseSubmenu = [],
  expertiseMetadata = [],
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const pathname = usePathname();

  const isBonusePage = pathname.includes(Hide.BONUSES);

  const handleChangeActiveMenu = (isActive: boolean) => {
    setActiveSubmenu(isActive);
  };

  const isMobile = useMediaQuery('<laptop-big');

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMobile) return;
    setIsOpen(false);
  }, [isMobile]);

  return (
    <header
      onMouseLeave={() => handleChangeActiveMenu(false)}
      className={`${isBonusePage ? 'absolute' : 'sticky bg-main-bg'} top-0 z-50 mx-auto h-[100px] w-full`}
    >
      <Container
        className={`relative z-50 flex h-full items-center overflow-hidden ${isBonusePage ? '' : 'bg-main-bg'} `}
      >
        <Logo />
        {!isBonusePage && (
          <>
            <nav className='mx-[auto] w-fit'>
              <MainList
                list={menuListLayer}
                activeSubmenu={activeSubmenu}
                onMenuItemHover={handleChangeActiveMenu}
              />
            </nav>
            <ContactUsBtn />
            {isMobile && (
              <>
                <MobileMenu
                  isOpen={isOpen}
                  onClick={() => setIsOpen(false)}
                  expertiseSubMenu={expertiseSubmenu}
                  data={expertiseMetadata}
                />
                <BurgerIcon isOpen={isOpen} setIsOpen={handleOpen} />
              </>
            )}
          </>
        )}
      </Container>

      {!isBonusePage && (
        <div
          className={`scrollbar-thin relative z-20 mx-[auto] max-h-[600px] w-fit transform overflow-y-scroll bg-main-bg px-[20px] transition-all duration-300 ease-in-out ${
            activeSubmenu ? 'translate-y-0' : '-translate-y-full'
          } ${isMobile ? 'hidden' : 'visible'}`}
        >
          <DynamicExpertiseMenu
            onClick={() => handleChangeActiveMenu(false)}
            expertiseSubMenu={expertiseSubmenu}
            expertiseMetadata={expertiseMetadata}
          />
        </div>
      )}
    </header>
  );
};
