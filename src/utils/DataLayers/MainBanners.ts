import athletes from '@/public/assets/images/main/heroSlide/hero-athletes-hd.webp';
import conference from '@/public/assets/images/main/heroSlide/hero-conference-room.webp';
import stands from '@/public/assets/images/main/heroSlide/hero-stands-hd.webp';
import street from '@/public/assets/images/main/heroSlide/hero-street.webp';
import arena from '@/public/assets/images/main/heroSlide/hero-revanta-arena.webp';
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
  // Slide copy for the Revanta hero
  {
    id: 1,
    tag: 'Sports platform',
    title: 'Revanta',
    description:
      'Sports club software for clubs, academies and rinks: registration, ticketing, fan loyalty and facility booking.',
    image: arena,
    date: '14-09-2026',
    link: '/revanta',
    linkName: 'Explore Revanta',
  },
  {
    id: 2,
    tag: 'Sports tech',
    title: 'Software for sport',
    description:
      'Apps, CRM, websites and data platforms for clubs, leagues and federations.',
    image: stands,
    date: '14-09-2026',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'See sports cases',
  },
  {
    id: 3,
    tag: 'Insights',
    title: 'Playbook',
    description:
      'Guides and news on AI agents, compliance and sports technology from our team.',
    image: athletes,
    date: '14-09-2026',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}`,
    linkName: 'Read the Playbook',
  },
  {
    id: 4,
    tag: 'Cases',
    title: 'Projects we shipped',
    description:
      'AI agents, fintech and sports platforms, each with the problem, the build and the result.',
    image: conference,
    date: '14-09-2026',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'View cases',
  },
  {
    id: 5,
    tag: 'Investments',
    title: 'Our own products',
    description:
      'We launch products of our own, such as Revanta and Regfo, and help founders build theirs.',
    image: street,
    date: '14-09-2026',
    link: `/${MenuItems.INVESTMENTS.toLowerCase()}`,
    linkName: 'See investments',
  },
];
