import { RevantaProductKey } from './routes';

export interface RevantaFaq {
  question: string;
  answer: string;
}

/** Icon keys rendered by src/components/Revanta/RevantaIcons.tsx. */
export type RevantaIconKey =
  | 'award'
  | 'chart'
  | 'bot'
  | 'network'
  | 'ticket'
  | 'building'
  | 'calendar'
  | 'users'
  | 'shield'
  | 'mobile'
  | 'trend'
  | 'dumbbell'
  | 'clipboard'
  | 'map'
  | 'trophy'
  | 'wallet'
  | 'file'
  | 'message'
  | 'mail'
  | 'gift'
  | 'download'
  | 'qr'
  | 'newspaper'
  | 'megaphone'
  | 'shirt'
  | 'package'
  | 'truck'
  | 'tag'
  | 'user'
  | 'layers'
  | 'history'
  | 'zap'
  | 'workflow'
  | 'target';

export interface RevantaFeature {
  title: string;
  text: string;
  icon?: RevantaIconKey;
}

export interface RevantaScenario {
  title: string;
  text: string;
  video: string;
  /** Small uppercase label above the scenario title. */
  tag?: string;
  icon?: RevantaIconKey;
  /** Numbered click path shown next to the recording. */
  steps?: string[];
}

export interface RevantaBenefit {
  title: string;
  text: string;
}

/** Hub "who it suits" tab: the panel is assembled from that product's content. */
export interface RevantaAudienceTab {
  tab: string;
  product: RevantaProductKey;
}

export interface RevantaComparisonRow {
  job: string;
  them: string;
  us: string;
  /**
   * Кто сильнее в этой работе. Ставится руками и только там, где разница
   * действительно есть: по нему таблица подсвечивает наши преимущества и
   * считает итог под заголовком. Без поля — паритет.
   */
  edge?: 'us' | 'them';
}

export interface RevantaPageContent {
  key: RevantaProductKey | 'hub';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  eyebrow: string;
  h1: string;
  lead: string;
  heroImage: string;
  heroAlt: string;
  audience: {
    heading: string;
    items: string[];
    /** Portrait photo next to the audience chips on product pages. */
    image?: string;
    /** Hub only: segment tabs that open a panel per product. */
    tabs?: RevantaAudienceTab[];
  };
  problem: {
    heading: string;
    before: string;
    after: string;
  };
  features: {
    heading: string;
    intro?: string;
    items: RevantaFeature[];
  };
  scenarios?: {
    heading: string;
    items: RevantaScenario[];
  };
  benefits?: {
    heading: string;
    items: RevantaBenefit[];
  };
  facts: {
    heading: string;
    items: string[];
    /** Icons for fact cells, same order as items. */
    icons?: RevantaIconKey[];
  };
  comparison?: {
    heading: string;
    competitor: string;
    intro: string;
    rows: RevantaComparisonRow[];
    note?: string;
  };
  faq: RevantaFaq[];
  articles?: { title: string; href: string }[];
}
