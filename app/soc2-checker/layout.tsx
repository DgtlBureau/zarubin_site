import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SOC 2 & GDPR Compliance Checker | The BrightByte',
  description:
    'Free assessment tool to evaluate your organization\'s compliance with SOC 2 Type II and GDPR requirements. Get instant compliance score, gap analysis, and actionable recommendations in minutes.',
  keywords: [
    'SOC 2 compliance checker',
    'GDPR compliance assessment',
    'SOC 2 Type II audit readiness',
    'data protection compliance',
    'security audit tool',
    'compliance gap analysis',
    'free compliance assessment',
  ],
  openGraph: {
    title: 'Free SOC 2 & GDPR Compliance Checker',
    description:
      'Get your compliance score in 2 minutes. Free gap analysis for SOC 2 Type II and GDPR requirements.',
    type: 'website',
  },
};

export default function Soc2CheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the SOC 2 & GDPR Compliance Checker assess?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The checker evaluates 5 compliance domains: Security Controls, Access Management, Monitoring & Incident Response, Data Protection, and Governance & Privacy. It maps your answers to actual SOC 2 Type II and GDPR audit requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the compliance assessment really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The full 25-question assessment is 100% free with no email required. You get an instant compliance score, gap analysis, days-to-audit estimate, and downloadable PDF report.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the assessment take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The quick assessment takes 2 minutes (5 questions) and gives you a preview score. The full assessment takes 5 more minutes (20 additional questions) for comprehensive gap analysis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is this compliance checker for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is designed for CTOs, compliance officers, and founders at SaaS companies, FinTech startups, and HealthTech companies who need to understand their SOC 2 and GDPR readiness before engaging auditors.',
        },
      },
    ],
  };

  // FAQ schema is hardcoded structured data for search engines, not user input
  const schemaHtml = JSON.stringify(faqSchema);

  return (
    <div className="regfo-wrapper min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-50 to-blue-50 font-proxima">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaHtml }}
      />
      {children}
    </div>
  );
}
