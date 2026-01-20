import { MenuItems } from './enums';

export const menuListLayer = [
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
    name: MenuItems.SOC2_ASSESSMENT,
    link: '/regfo',
    isHighlighted: true,
  },
];
