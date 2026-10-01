// Single source of truth for Revanta URLs: menu, pages, sitemap and redirects read from here.

export const REVANTA_BASE = '/revanta';
export const REVANTA_IMAGES = '/assets/images/revanta';
export const REVANTA_VIDEOS = '/assets/videos/revanta';
export const REVANTA_LINKEDIN =
  'https://www.linkedin.com/company/revanta-sports';

export type RevantaProductKey =
  | 'loyalty'
  | 'ticketing'
  | 'sportschool'
  | 'venues'
  | 'ecom'
  | 'sites';

export interface RevantaProductLink {
  key: RevantaProductKey;
  slug: string;
  name: string;
  slogan: string;
  image: string;
}

export const REVANTA_PRODUCTS: RevantaProductLink[] = [
  {
    key: 'loyalty',
    slug: 'loyalty',
    name: 'Revanta Loyalty',
    slogan: 'One fan profile, loyalty tiers and campaigns the club owns',
    image: `${REVANTA_IMAGES}/loyalty-cover.webp`,
  },
  {
    key: 'ticketing',
    slug: 'ticketing',
    name: 'Revanta Ticketing',
    slogan: 'Tickets and season tickets sold in the club’s own system',
    image: `${REVANTA_IMAGES}/ticketing-cover.webp`,
  },
  {
    key: 'sportschool',
    slug: 'sportschool',
    name: 'Revanta SportSchool',
    slogan: 'Registration, teams and schedules for clubs and academies',
    image: `${REVANTA_IMAGES}/sportschool-hero.webp`,
  },
  {
    key: 'venues',
    slug: 'venues',
    name: 'Revanta Venues',
    slogan: 'Rentals, public sessions and QR entry for rinks and facilities',
    image: `${REVANTA_IMAGES}/arena.webp`,
  },
  {
    key: 'ecom',
    slug: 'ecom',
    name: 'Revanta e-com',
    slogan: 'A merch store that knows your fan',
    image: `${REVANTA_IMAGES}/ecom-cover.webp`,
  },
  {
    key: 'sites',
    slug: 'sites',
    name: 'Revanta Sites',
    slogan: 'A club website fed by live schedules, rosters and stats',
    image: `${REVANTA_IMAGES}/sites-cover.webp`,
  },
];

export const revantaHref = (slug: string) => `${REVANTA_BASE}/${slug}`;
