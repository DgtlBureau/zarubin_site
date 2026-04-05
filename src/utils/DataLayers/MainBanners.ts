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
    tag: 'AI for Regulated Industries',
    title: 'Your Auditors Won\u2019t Believe AI Built This',
    description:
      'We build AI agents, RAG systems, and automation for companies where compliance isn\u2019t optional. FinTech. Pharma. Healthcare.',
    image: buildings,
    date: '15-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'See our work',
  },
  {
    id: 2,
    tag: 'How We Work',
    title: '4 Weeks to a Working Proof of Concept. Not 4 Quarters.',
    description:
      'Compliance baked in from day one \u2014 audit trails, explainability, data governance. No rework after launch.',
    image: conference,
    date: '13-03-2025',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}/expertise`,
    linkName: 'Our approach',
  },
  {
    id: 3,
    tag: 'Proof, Not Promises',
    title: 'We Don\u2019t Just Build Compliance AI. We Ship Our Own.',
    description:
      'Regfo reads FDA regulations. Tribune runs CRM for KHL hockey clubs. Real products, real users.',
    image: street,
    date: '12-03-2025',
    link: `/${MenuItems.PLAYBOOK.toLowerCase()}/insights`,
    linkName: 'Our products',
  },
  {
    id: 4,
    tag: 'Industries',
    title: 'Where \u201CMove Fast and Break Things\u201D Gets You Fined',
    description:
      'FinTech KYC automation. HIPAA-compliant healthcare AI. FDA regulatory analysis. We know these waters.',
    image: '/assets/images/info/nelson-ndongala-j9a3Y1Vd9hc-unsplash.webp',
    date: '14-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: MenuItems.CASES,
  },
];
