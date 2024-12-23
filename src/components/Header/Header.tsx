'use client';

import { BurgerIcon } from '@/src/ui-kit/BurgerIcon/BurgerIcon';
import { ContactUsBtn } from '@/src/ui-kit/LeagueLink/ContactUsBtn';
import { Logo } from '@/src/ui-kit/LogoIcon/Logo';
import { menuListLayer } from '@/src/utils/menuListLayer';
import { ISubmenu, Post } from '@/src/utils/types';
import useMediaQuery from '@/src/utils/useMediaQuery';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { MainList } from '../NavList/MainList';
import { Container } from '../shared/Container/Container';

const DynamicExpertiseMenu = dynamic(() =>
  import('../Expertise/ExpertiseSubMenu/ExpertiseSubMenu').then(
    (mod) => mod.ExpertiseSubMenu,
  ),
);

interface Props {
  dark?: boolean;
  expertiseSubmenu: ISubmenu[];
  expertiseMetadata: Post[];
}

export const Header = ({
  dark = true,
  expertiseSubmenu = [],
  expertiseMetadata = [],
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);

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
      className={`sticky top-0 z-50 mx-auto h-[100px] w-full ${dark ? 'bg-main-bg' : 'bg-white'}`}
    >
      <Container
        className={`relative flex h-full items-center overflow-hidden ${dark ? 'bg-main-bg' : 'bg-white'}`}
      >
        <Logo dark={dark} />
        <nav className='mx-[auto] w-fit'>
          <MainList
            list={menuListLayer}
            dark={dark}
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
              dark={dark}
              expertiseSubMenu={expertiseSubmenu}
              data={expertiseMetadata}
            />
            <BurgerIcon isOpen={isOpen} setIsOpen={handleOpen} dark={dark} />
          </>
        )}
      </Container>

      <div
        className={`scrollbar-thin relative z-[-1] mx-[auto] max-h-[600px] w-fit transform overflow-y-scroll px-[20px] transition-all duration-300 ease-in-out ${dark ? 'bg-main-bg' : 'bg-white'} ${
          activeSubmenu ? 'translate-y-0' : '-translate-y-full'
        } ${isMobile ? 'hidden' : 'visible'}`}
      >
        <DynamicExpertiseMenu
          onClick={() => handleChangeActiveMenu(false)}
          expertiseSubMenu={expertiseSubmenu}
          expertiseMetadata={expertiseMetadata}
        />
      </div>
    </header>
  );
};
