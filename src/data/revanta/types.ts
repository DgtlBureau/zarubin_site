import { RevantaProductKey } from './routes';

export interface RevantaFaq {
  question: string;
  answer: string;
}

export interface RevantaFeature {
  title: string;
  text: string;
}

export interface RevantaScenario {
  title: string;
  text: string;
  video: string;
}

export interface RevantaComparisonRow {
  job: string;
  them: string;
  us: string;
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
  facts: {
    heading: string;
    items: string[];
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
