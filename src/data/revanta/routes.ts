// Single source of truth for Revanta URLs: menu, pages, sitemap and redirects read from here.

export const REVANTA_BASE = '/revanta';
export const REVANTA_IMAGES = '/assets/images/revanta';
export const REVANTA_VIDEOS = '/assets/videos/revanta';

export type RevantaProductKey =
  | 'sportschool'
  | 'loyalty'
  | 'venues'
  | 'sites'
  | 'ecom';

export interface RevantaProductLink {
  key: RevantaProductKey;
  slug: string;
  name: string;
  slogan: string;
  image: string;
}

export const REVANTA_PRODUCTS: RevantaProductLink[] = [
  {
    key: 'sportschool',
    slug: 'sports-academy-software',
    name: 'Revanta SportSchool',
    slogan: 'Registration, teams and schedules for clubs and academies',
    image: `${REVANTA_IMAGES}/sportschool-hero.webp`,
  },
  {
    key: 'loyalty',
    slug: 'sports-crm',
    name: 'Revanta Loyalty',
    slogan: 'Tickets, season passes and fan loyalty in one CRM',
    image: `${REVANTA_IMAGES}/loyalty-cover.webp`,
  },
  {
    key: 'venues',
    slug: 'sports-facility-software',
    name: 'Revanta Venues',
    slogan: 'Rentals, public sessions and QR entry for rinks and facilities',
    image: `${REVANTA_IMAGES}/arena.webp`,
  },
  {
    key: 'sites',
    slug: 'sports-club-website',
    name: 'Revanta Sites',
    slogan: 'A club website fed by live schedules, rosters and stats',
    image: `${REVANTA_IMAGES}/sites-cover.webp`,
  },
  {
    key: 'ecom',
    slug: 'club-merch-store',
    name: 'Revanta e-com',
    slogan: 'A merch store that knows your fan',
    image: `${REVANTA_IMAGES}/ecom-cover.webp`,
  },
];

export const revantaHref = (slug: string) => `${REVANTA_BASE}/${slug}`;
