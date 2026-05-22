import { BASE_URL } from './alias';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The BrightByte',
    alternateName: 'BrightByte',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/icons/favicon.svg`,
    description:
      'AI agents, fine-tuned models, and automated workflows for FinTech, HealthTech, and RegTech. Full audit trails. Working prototype in 2 weeks.',
    foundingDate: '2018',
    founder: {
      '@type': 'Person',
      name: 'Vitaliy Zarubin',
      url: 'https://www.linkedin.com/in/vitaliy-zarubin-397844102/',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/in/vitaliy-zarubin-397844102/',
      'https://www.linkedin.com/company/thebrightbyte/',
    ],
    knowsAbout: [
      'AI Agent Security',
      'AI Red Teaming',
      'Prompt Injection Defense',
      'Indirect Prompt Injection',
      'MCP Server Security',
      'LLM Security Audit',
      'AI Governance Audit Trail',
      'Immutable AI Logging',
      'AI Compliance Audit',
      'Compliance-Friendly AI Agents',
      'AI Fine-Tuning',
      'RAG Systems',
      'Automated Workflows',
      'FinTech AI',
      'HealthTech AI',
      'LawTech AI',
      'RegTech Solutions',
      'SOC2 Compliance',
      'HIPAA Compliance',
      'FDA Regulatory Compliance',
      'FDA 21 CFR Part 11',
      'EU AI Act Compliance',
      'DORA Compliance',
      'PCI DSS 4.0',
      'Biotech Regulatory Affairs',
      'Claude API',
      'Anthropic SDK',
      'Gemini API',
      'MCP Servers',
      'Multi-Agent Systems',
      'Agentic Workflows',
      'Claude Code',
      'Cursor AI',
      'LLM Fine-Tuning',
      'Vector Databases',
      'Embeddings',
      'LangChain',
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'AI Agent Security Audit',
      'AI Compliance Audit',
      'MCP Security Audit',
      'LLM Red Teaming',
      'AI Agent Development',
      'LLM Fine-Tuning',
      'RAG System Development',
      'Compliance AI Automation',
      'Enterprise AI Integration',
      'Multi-Agent System Development',
      'MCP Server Infrastructure',
      'Compliance AI Consulting',
    ],
    makesOffer: {
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
      'AI agent security, compliance audits, and custom AI development for fintech, biotech, and healthcare. SOC 2, HIPAA, FDA 21 CFR Part 11, EU AI Act, DORA.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
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
      name: 'AI Security and Compliance Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agent Security Audit',
            description:
              'Threat modeling, prompt-injection testing, MCP server review, and remediation roadmap for production AI agents.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Compliance Audit',
            description:
              'Gap analysis against SOC 2, HIPAA, FDA 21 CFR Part 11, EU AI Act, and DORA. Audit-trail review, documentation, and remediation plan.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'LLM Red Teaming',
            description:
              'Adversarial testing of LLM-based products for prompt injection, jailbreaks, data exfiltration, and the lethal-trifecta agent pattern.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'MCP Security Audit',
            description:
              'Security review of Model Context Protocol servers and clients used by Claude Code, Cursor, and other AI development workflows.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Development',
            description:
              'Compliance-first AI agents, RAG systems, and fine-tuned models for regulated industries. 4-8 week prototype.',
          },
        },
      ],
    },
  };
}
