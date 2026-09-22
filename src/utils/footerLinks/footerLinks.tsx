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
        link: '/playbook/expertise/regfo-ai-compliance-automation',
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
      { name: 'Sports & Entertainment', link: '/cases/avangard' },
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
      { name: 'Sports CRM Platform', link: '/cases/avangard' },
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
        name: 'Regfo: AI Compliance Automation',
        link: '/playbook/expertise/regfo-ai-compliance-automation',
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
        link: '/revanta/youth-sports-club-software',
      },
      { name: 'Sports CRM & ticketing', link: '/revanta/sports-crm' },
      {
        name: 'Ice rink & facility software',
        link: '/revanta/sports-facility-software',
      },
      { name: 'Club website builder', link: '/revanta/sports-club-website' },
      { name: 'Club merch store', link: '/revanta/club-merch-store' },
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
        name: 'C# for Fintech',
        link: '/playbook/expertise/All-fintech-is-about-c-sharp',
      },
    ],
  },
  {
    id: 7,
    title: 'Company Size',
    links: [
      { name: 'Startup', link: '/soc2-checker?size=startup' },
      { name: 'Mid-Market', link: '/soc2-checker?size=mid-market' },
      { name: 'Enterprise', link: '/soc2-checker?size=enterprise' },
    ],
  },
];
