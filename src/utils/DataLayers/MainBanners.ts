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
    tag: 'AI Automation Studio',
    title: 'Past the prototype. Your AI is in production.',
    description:
      'Fine-tuned models, RAG pipelines, multi-agent systems. From first call to working prototype in 2 weeks.',
    image: buildings,
    date: '15-03-2025',
    link: '/brief',
    linkName: 'Book a free call',
  },
  {
    id: 2,
    tag: 'FinTech & RegTech',
    title: 'KYC scoring agent: 4 hours of manual review down to 90 seconds',
    description:
      'Fine-tuned classification, real-time risk scoring, transaction monitoring with full audit trail.',
    image: conference,
    date: '13-03-2025',
    link: `/${MenuItems.CASES.toLowerCase()}`,
    linkName: 'See the case',
  },
  {
    id: 3,
    tag: 'RAG & Document Intelligence',
    title: 'Thousands of pages of due diligence. Parsed in minutes.',
    description:
      'Regfo: our own AI product for FDA, ICH, and CFTC regulatory analysis. Same stack we ship to clients.',
    image: street,
    date: '12-03-2025',
    link: 'https://regfo.com',
    linkName: 'Try Regfo',
  },
  {
    id: 4,
    tag: 'AI Agents',
    title: 'Your team syncs data between 3 systems by hand. Our agents do it at 99.8% accuracy.',
    description:
      'CRM sync, document processing, triggered workflows. Production-ready in under a month.',
    image: '/assets/images/info/nelson-ndongala-j9a3Y1Vd9hc-unsplash.webp',
    date: '14-03-2025',
    link: '/comparison',
    linkName: 'See the comparison',
  },
  {
    id: 5,
    tag: 'Security & Compliance',
    title: 'Your AI vendor should survive an audit. Ours do.',
    description:
      'Tenant-isolated data, encrypted pipelines, immutable audit logs. Built for SOC 2, HIPAA, GDPR, and FDA 21 CFR Part 11.',
    image: buildings,
    date: '16-04-2026',
    link: '/brief',
    linkName: 'Talk to us',
  },
];
