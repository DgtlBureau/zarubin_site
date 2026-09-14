// Фото слайдов — те же, что на главной digitalburo.tech
import athletes from '@/public/assets/images/main/heroSlide/bct-athletes-hd.webp';
import conference from '@/public/assets/images/main/heroSlide/bct-conference-room.webp';
import stands from '@/public/assets/images/main/heroSlide/bct-stands-hd.webp';
import street from '@/public/assets/images/main/heroSlide/bct-street.webp';
import arena from '@/public/assets/images/main/heroSlide/bct-virazh-arena.webp';
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
  // Slide copy mirrors the digitalburo.tech hero, adapted for Revanta
  {
    id: 1,
    tag: 'Sports platform',
    title: 'Revanta',
    description:
      'One platform to run sports clubs, academies and event organisers.',
    image: arena,
    date: '14-09-2026',
    link: '/revanta',
    linkName: 'Take a look',
  },
  {
    id: 2,
    tag: 'Sports tech',
    title: 'We grow sport',
    description:
      'We digitalise and automate sports federations and organisations.',
    image: stands,
    date: '14-09-2026',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'Learn more',
  },
  {
    id: 3,
    tag: 'Playbook',
    title: 'From juniors to professionals',
    description: 'We bring new business solutions to where sport meets IT.',
    image: athletes,
    date: '14-09-2026',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}`,
    linkName: 'Read',
  },
  {
    id: 4,
    tag: 'Cases',
    title: 'Service you can see through',
    description: 'A company you want to grow alongside.',
    image: conference,
    date: '14-09-2026',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'Our work',
  },
  {
    id: 5,
    tag: 'Investments',
    title: 'Entrepreneurship',
    description:
      'We pilot many ideas of our own and always help others develop theirs.',
    image: street,
    date: '14-09-2026',
    link: `/${MenuItems.INVESTMENTS.toLowerCase()}`,
    linkName: 'Products',
  },
];
