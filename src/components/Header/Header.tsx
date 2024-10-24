'use client';

import { BurgerIcon } from '@/src/ui-kit/BurgerIcon/BurgerIcon';
import { ContactUsBtn } from '@/src/ui-kit/LeagueLink/ContactUsBtn';
import { Logo } from '@/src/ui-kit/LogoIcon/Logo';
import { menuListLayer } from '@/src/utils/menuListLayer';
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
  expertiseSubmenu?: Submenu[];
}

interface Submenu {
  name: string;
  folderItems: { nameItem: string; link: string }[];
}

export const Header = ({ dark = true, expertiseSubmenu = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setActiveSubmenu(!activeSubmenu);
  };

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
        <nav className='mx-[auto] w-full'>
          <MainList
            list={menuListLayer}
            dark={dark}
            activeSubmenu={activeSubmenu}
            toggleSubmenu={toggleSubmenu}
            onMenuItemHover={handleChangeActiveMenu}
          />
        </nav>
        <ContactUsBtn dark={dark} />
        {isMobile && (
          <>
            <MobileMenu
              isOpen={isOpen}
              onClick={() => setIsOpen(false)}
              dark={dark}
              expertiseSubMenu={expertiseSubmenu}
            />
            <BurgerIcon isOpen={isOpen} setIsOpen={handleOpen} dark={dark} />
          </>
        )}
      </Container>

      <div
        className={`relative z-[-1] w-full transform px-[20px] transition-all duration-300 ease-in-out ${dark ? 'bg-main-bg' : 'bg-white'} ${
          activeSubmenu ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <DynamicExpertiseMenu
          toggleSubmenu={toggleSubmenu}
          expertiseSubMenu={expertiseSubmenu}
          dark={dark}
        />
      </div>
    </header>
  );
};
