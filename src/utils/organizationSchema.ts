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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
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
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'AI Agent Development',
      'LLM Fine-Tuning',
      'RAG System Development',
      'Compliance AI Automation',
      'Enterprise AI Integration',
    ],
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
