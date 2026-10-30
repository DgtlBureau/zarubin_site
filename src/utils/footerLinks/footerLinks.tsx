interface IFooterLinks {
  name: string;
  link: string;
}

interface IFooters {
  id: number;
  title: string;
  links: IFooterLinks[];
}

export const footerLinks: IFooters[] = [
  {
    id: 1,
    title: 'Directions',
    links: [
      {
        name: 'CRM Development',
        link: '/playbook/expertise/The-best-CRM',
      },
      {
        name: 'Mobile App Development',
        link: '/playbook/expertise/flutter-vs-react-native',
      },
      {
        name: 'RAG Systems',
        link: '/playbook/expertise/AI-Powered-HVAC-Ticketing',
      },
      {
        name: 'AI Agents',
        link: '/playbook/insights/sports-crm-2026-from-database-to-ai-agent',
      },
      {
        name: 'Fine-tuning & ML',
        link: '/playbook/expertise/generative-ai-for-learning',
      },
      {
        name: 'API Integrations',
        link: '/playbook/expertise/zappier-vs-uipath',
      },
    ],
  },
  {
    id: 2,
    title: 'Industries',
    links: [
      { name: 'Finance & Fintech', link: '/cases/jedipay' },
      { name: 'HVAC & Field Service', link: '/cases/personiway' },
      { name: 'Sports & Entertainment', link: '/cases/torpedo' },
      { name: 'Automotive', link: '/cases/kama' },
      { name: 'Enterprise & B2B', link: '/cases/oazis' },
      { name: 'Oil & Gas', link: '/cases/nis' },
      { name: 'Hospitality', link: '/cases/lux_today' },
    ],
  },
  {
    id: 3,
    title: 'Cases',
    links: [
      { name: 'AI Workforce Management', link: '/cases/oazis' },
      { name: 'RAG-Powered Field Ops', link: '/cases/personiway' },
      { name: 'Sports CRM Platform', link: '/cases/norilsk' },
      { name: 'Custom Development', link: '/cases/fcdm' },
      { name: 'Mobile App', link: '/cases/stocks_soccer' },
      { name: 'IT Consulting', link: '/cases/grid_capital' },
    ],
  },
  {
    id: 4,
    title: 'Latest Articles',
    links: [
      {
        name: 'Why Your CTO Is Lying About AI',
        link: '/playbook/insights/why-your-cto-is-lying-about-ai',
      },
      {
        name: 'AI Models War 2026',
        link: '/playbook/insights/ai-models-war-2025-who-is-winning',
      },
      {
        name: 'AI for Real-Time Coaching',
        link: '/playbook/expertise/ai-transforming-real-time-coaching',
      },
      {
        name: 'Why Low-Code Became a Trap',
        link: '/playbook/expertise/why-low-code-became-a-trap-2025',
      },
      {
        name: 'Building Projects That Scale',
        link: '/playbook/expertise/building-projects-that-scale',
      },
      {
        name: 'Hockey Fan App on Game Day',
        link: '/playbook/insights/fan-app-game-day-load-vibe-coded-prototype',
      },
    ],
  },
  {
    id: 5,
    title: 'Revanta',
    links: [
      { name: 'Sports club software', link: '/revanta' },
      {
        name: 'Youth sports registration',
        link: '/revanta/sportschool',
      },
      { name: 'Sports CRM & ticketing', link: '/revanta/loyalty' },
      {
        name: 'Ice rink & facility software',
        link: '/revanta/ticketing',
      },
      { name: 'Club website builder', link: '/revanta/sites' },
      { name: 'Club merch store', link: '/revanta/ecom' },
    ],
  },
  {
    id: 6,
    title: 'AI & Development',
    links: [
      {
        name: 'AI-Powered Ticketing',
        link: '/playbook/expertise/AI-Powered-HVAC-Ticketing',
      },
      {
        name: 'Flutter vs React Native',
        link: '/playbook/expertise/flutter-vs-react-native',
      },
      {
        name: 'DevOps Services',
        link: '/playbook/expertise/Why-do-we-need-Dev-Ops',
      },
      {
        name: 'AI for Learning',
        link: '/playbook/expertise/generative-ai-for-learning',
      },
      {
        name: 'Developer Rates 2024',
        link: '/playbook/expertise/Developers-Rates-2024',
      },
      {
        name: 'Fan Data Analytics',
        link: '/playbook/expertise/fan-data-analytics-sports-crm',
      },
    ],
  },
];
