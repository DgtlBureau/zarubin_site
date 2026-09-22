import missionImg from '@/public/assets/images/about/card/card_mission.webp';
import nonesenseImg from '@/public/assets/images/about/card/card_nonsense.webp';
import remoteImg from '@/public/assets/images/about/card/card_remote.webp';
import { StaticImageData } from 'next/image';

interface ICard {
  id: number;
  tag: string;
  title: string;
  image: StaticImageData;
}

export const CardsData: ICard[] = [
  { id: 1, tag: 'Mission', title: 'Only cool projects', image: missionImg },
  {
    id: 2,
    tag: 'Remote',
    title: 'We work completely remotely',
    image: remoteImg,
  },
  {
    id: 3,
    tag: 'No nonsense',
    title: 'Only full transparency in reporting and git',
    image: nonesenseImg,
  },
];
