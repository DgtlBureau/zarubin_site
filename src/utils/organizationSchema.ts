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
      'AI agents, fine-tuned models, and automated workflows for FinTech, HealthTech, LawTech, and RegTech. SOC2-ready. HIPAA-compliant. Audit-proof.',
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
      'Biotech Regulatory Affairs',
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'AI Agent Development',
      'LLM Fine-Tuning',
      'RAG System Development',
      'Compliance AI Automation',
      'Enterprise AI Integration',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'Regfo',
        url: 'https://regfo.com',
        applicationCategory: 'BusinessApplication',
        description:
          'AI-powered regulatory workspace for biotech. Analyzes preclinical study reports against FDA/ICH requirements, generates compliance scores, and identifies gaps.',
        operatingSystem: 'Web',
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'The BrightByte',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/images/icons/favicon.svg`,
    description:
      'AI agents, fine-tuning, and compliance automation for regulated industries.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  };
}
