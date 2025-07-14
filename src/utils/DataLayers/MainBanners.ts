import buildings from '@/public/assets/images/main/heroSlide/buildings.webp';
import conference from '@/public/assets/images/main/heroSlide/conference-room.webp';
import hockey from '@/public/assets/images/main/heroSlide/hockey.webp';
import street from '@/public/assets/images/main/heroSlide/street.webp';
import { StaticImageData } from 'next/image';
import { MenuItems } from '../enums';

interface IMainBanners {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  date: string;
  link: string;
  linkName: string;
}

export const mainBanners: IMainBanners[] = [
  {
    id: 1,
    title: 'Sport Systems and Marketing for clubs',
    description: '',
    image: hockey,
    date: '14-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: MenuItems.CASES,
  },
  {
    id: 2,
    title: 'Practical Systems for Fast-Moving Industries',
    description: '',
    image: buildings,
    date: '15-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}/expertise`,
    linkName: 'Learn more',
  },
  {
    id: 3,
    title: 'Consulting & Custom Engineering for Complex Cases',
    description: '',
    image: conference,
    date: '13-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}/expertise`,
    linkName: MenuItems.PLAYBOOK,
  },
  {
    id: 4,
    title: 'Digital Products With Measurable Business Impact',
    description: '',
    image: street,
    date: '12-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}/insights`,
    linkName: 'Insights',
  },
];
