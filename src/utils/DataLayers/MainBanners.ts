import buildings from '@/public/assets/images/main/heroSlide/buildings.webp';
import conference from '@/public/assets/images/main/heroSlide/conference-room.webp';
import street from '@/public/assets/images/main/heroSlide/street.webp';
import { StaticImageData } from 'next/image';
import { MenuItems } from '../enums';

interface IMainBanners {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  date: string;
  link: string;
  linkName: string;
}

export const mainBanners: IMainBanners[] = [
  {
    id: 1,
    tag: 'Enterprise',
    title: 'Practical Systems for Fast-Moving Industries',
    description: 'Scalable solutions designed to adapt quickly to changing business requirements',
    image: buildings,
    date: '15-03-2025',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}/expertise`,
    linkName: 'Learn more',
  },
  {
    id: 2,
    tag: 'Consulting',
    title: 'Consulting & Custom Engineering for Complex Cases',
    description: 'Expert guidance and tailored development for unique technical challenges',
    image: conference,
    date: '13-03-2025',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}/expertise`,
    linkName: MenuItems.PLAYBOOK,
  },
  {
    id: 3,
    tag: 'Digital Products',
    title: 'Digital Products With Measurable Business Impact',
    description: 'Data-driven development focused on ROI and tangible business outcomes',
    image: street,
    date: '12-03-2025',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}/insights`,
    linkName: 'Insights',
  },
  {
    id: 4,
    tag: 'Sports Tech',
    title: 'Sport Systems and Marketing for clubs',
    description: 'Fan engagement platforms, CRM systems, and digital marketing solutions for sports organizations',
    image: '/assets/images/info/nelson-ndongala-j9a3Y1Vd9hc-unsplash.webp',
    date: '14-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: MenuItems.CASES,
  },
];
