'use client';

import { BurgerIcon } from '@/src/ui-kit/BurgerIcon/BurgerIcon';
import { ContactUsBtn } from '@/src/ui-kit/LeagueLink/ContactUsBtn';
import { Logo } from '@/src/ui-kit/LogoIcon/Logo';
import { menuListLayer } from '@/src/utils/menuListLayer';
import { HeaderMenuData } from '@/src/utils/types';
import { useAfterLoadIdle } from '@/src/utils/useAfterLoadIdle';
import useMediaQuery from '@/src/utils/useMediaQuery';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { MainList } from '../NavList/MainList';
import { Container } from '../shared/Container/Container';

enum Hide {
  BONUSES = '/bonuses',
}

const loadRevantaMenu = () =>
  import('../Revanta/RevantaSubMenu/RevantaSubMenu');
const loadExpertiseMenu = () =>
  import('../Expertise/ExpertiseSubMenu/ExpertiseSubMenu');

const DynamicRevantaMenu = dynamic(() =>
  loadRevantaMenu().then((mod) => mod.RevantaSubMenu),
);

export type SubmenuKind = 'expertise' | 'revanta';

const DynamicExpertiseMenu = dynamic(() =>
  loadExpertiseMenu().then((mod) => mod.ExpertiseSubMenu),
);

/**
 * Downloads the mega-menu JS once the page is idle so the first hover renders
 * without waiting for the chunk. Only code is fetched; the menu (and its
 * images) is not mounted until the visitor reaches for it.
 */
const warmMegaMenuChunks = () => {
  void loadExpertiseMenu();
  void loadRevantaMenu();
};

type Props = Partial<HeaderMenuData>;

export const Header = ({
  expertiseSubmenu = [],
  insightsSubmenu = [],
  latestArticles = [],
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const [submenuKind, setSubmenuKind] = useState<SubmenuKind>('expertise');
  // The mega menu stays unmounted (no DOM, no image requests) until the first
  // hover or keyboard focus in the header; after that it stays mounted so the
  // open/close transition works exactly as before.
  const [megaMenuMounted, setMegaMenuMounted] = useState(false);
  useAfterLoadIdle(warmMegaMenuChunks);
  const pathname = usePathname();

  const isBonusePage = pathname === Hide.BONUSES;

  const handleChangeActiveMenu = (isActive: boolean, kind?: SubmenuKind) => {
    if (kind) setSubmenuKind(kind);
    if (isActive) setMegaMenuMounted(true);
    setActiveSubmenu(isActive);
  };

  const isMobile = useMediaQuery('<laptop-big');

  // Header is transparent over the home hero, solid once scrolled or a menu is open
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const transparent =
    pathname === '/' && !scrolled && !activeSubmenu && !isOpen;

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
      onFocus={() => setMegaMenuMounted(true)}
      className={`${isBonusePage ? 'absolute' : 'sticky'} top-0 z-50 mx-auto h-[100px] w-full border-b transition-colors duration-300 ${
        isBonusePage || transparent
          ? 'border-transparent bg-transparent'
          : 'border-white/10 bg-main-bg/95 backdrop-blur-md'
      }`}
    >
      <Container className='relative z-50 flex h-full items-center overflow-hidden'>
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
                  insightsSubMenu={insightsSubmenu}
                  data={latestArticles}
                />
                <BurgerIcon isOpen={isOpen} setIsOpen={handleOpen} />
              </>
            )}
          </>
        )}
      </Container>

      {!isBonusePage && (
        <div
          onMouseEnter={() => handleChangeActiveMenu(true)}
          className={`scrollbar-thin fixed left-0 right-0 top-[100px] z-40 flex max-h-[600px] justify-center overflow-y-auto border-b border-white/10 bg-main-bg px-[20px] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)] transition-all duration-300 ease-in-out ${
            activeSubmenu
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0'
          } ${isMobile ? 'hidden' : 'visible'}`}
        >
          {megaMenuMounted &&
            (submenuKind === 'revanta' ? (
              <DynamicRevantaMenu
                onClick={() => handleChangeActiveMenu(false)}
              />
            ) : (
              <DynamicExpertiseMenu
                onClick={() => handleChangeActiveMenu(false)}
                expertiseSubMenu={expertiseSubmenu}
                insightsSubMenu={insightsSubmenu}
                latestArticles={latestArticles}
              />
            ))}
        </div>
      )}
    </header>
  );
};
