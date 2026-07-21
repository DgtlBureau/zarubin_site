import { MenuItems } from './enums';

interface MenuListItem {
  id: number;
  name: string;
  link: string;
  isHighlighted?: boolean;
  isExternal?: boolean;
}

export const menuListLayer: MenuListItem[] = [
  {
    id: 1,
    name: MenuItems.PLAYBOOK,
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}`,
  },
  { id: 2, name: MenuItems.CASES, link: `/${MenuItems.CASES.toLowerCase()}` },
  {
    id: 3,
    name: MenuItems.INVESTMENTS,
    link: `/${MenuItems.INVESTMENTS.toLowerCase()}`,
  },
  { id: 4, name: MenuItems.CAREER, link: `/${MenuItems.CAREER.toLowerCase()}` },
  {
    id: 5,
    name: MenuItems.COMPARISON,
    link: `/${MenuItems.COMPARISON.toLowerCase()}`,
  },
  {
    id: 6,
    name: MenuItems.REVANTA_SPORTS,
    link: '/revanta',
    isHighlighted: true,
    // Static page in /public — needs a full page load, not client-side routing
    isExternal: true,
  },
];
