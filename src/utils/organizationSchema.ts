import { BASE_URL } from './alias';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'The BrightByte',
    legalName: 'The BrightByte Capital LLC',
    alternateName: 'BrightByte',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/icons/favicon.svg`,
    description:
      'Fan loyalty programs, ticketing, apps and CRM for sports clubs, leagues and venues. Integrations and automation from a team in sports tech since 2018.',
    foundingDate: '2018',
    founder: {
      '@type': 'Person',
      name: 'Vitaliy Zarubin',
      url: 'https://www.linkedin.com/in/vitaliy-zarubin-397844102/',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/in/vitaliy-zarubin-397844102/',
      'https://www.linkedin.com/company/thebrightbyte/',
    ],
    knowsAbout: [
      'Fan Loyalty Programs',
      'Sports Ticketing',
      'Sports Club CRM',
      'Fan Engagement Apps',
      'Facility and Rink Booking',
      'RFM Segmentation',
      'Push and SMS Campaigns',
      'Sports Data Platforms',
      'Payment and Ticketing Integrations',
      'Workflow Automation',
      'AI Agents',
      'Multi-Agent Systems',
      'Agentic Workflows',
      'AI Agent Security',
      'Prompt Injection Defense',
      'MCP Servers',
      'LLM Fine-Tuning',
      'RAG Systems',
      'Vector Databases',
      'Embeddings',
      'Claude API',
      'Anthropic SDK',
      'Gemini API',
      'Claude Code',
      'Cursor AI',
      'LangChain',
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'Fan Loyalty Program Development',
      'Ticketing Platform Development',
      'Sports Club CRM Implementation',
      'Mobile App Development',
      'System Integration and Automation',
      'AI Agent Development',
      'LLM Fine-Tuning',
      'RAG System Development',
      'Multi-Agent System Development',
      'MCP Server Infrastructure',
      'AI Agent Security Audit',
    ],
    brand: [
      {
        '@type': 'Brand',
        name: 'Revanta',
        url: `${BASE_URL}/revanta`,
        sameAs: ['https://www.linkedin.com/company/revanta-sports'],
      },
      { '@type': 'Brand', name: 'Regfo', url: 'https://regfo.com' },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          '@id': `${BASE_URL}/revanta#software`,
          name: 'Revanta',
          url: `${BASE_URL}/revanta`,
          applicationCategory: 'BusinessApplication',
          description:
            'Sports club software by The BrightByte: registration and schedules for clubs and academies, ticketing and fan loyalty for spectator clubs, bookings and QR entry for rinks and arenas.',
          operatingSystem: 'Web',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Regfo',
          url: 'https://regfo.com',
          applicationCategory: 'BusinessApplication',
          description:
            'AI-powered regulatory workspace for biotech. Analyzes preclinical study reports against FDA, ICH, and CFTC requirements, generates compliance scores, and identifies gaps.',
          operatingSystem: 'Web',
        },
      },
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#service`,
    name: 'The BrightByte',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/icons/favicon.svg`,
    image: `${BASE_URL}/assets/images/icons/favicon.svg`,
    description:
      'Fan loyalty, ticketing, CRM, mobile apps and AI agents for sports clubs, leagues and entertainment venues. Integrations and automation since 2018.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'European Union' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sports Software and AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fan Loyalty Program',
            description:
              'Loyalty mechanics, points and rewards, RFM segmentation, push and SMS campaigns, tied to the ticketing and CRM of the club.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ticketing Platform',
            description:
              'Ticket sales, season passes, QR entry and payments, integrated with the CRM and loyalty program of the club.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sports Club CRM and Integrations',
            description:
              'CRM setup and integration with ticketing, payments, access control and marketing tools. Data syncs and automation on top.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fan and Club Mobile Apps',
            description:
              'iOS and Android apps for fans, academies and venues: schedules, tickets, loyalty, bookings and content.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agents and Automation',
            description:
              'AI agents, RAG systems and fine-tuned models for club operations, support and content. Working prototype in weeks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agent Security Audit',
            description:
              'Threat modeling, prompt-injection testing, MCP server review and remediation plan for production AI agents.',
          },
        },
      ],
    },
  };
}
