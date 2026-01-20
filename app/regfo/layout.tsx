import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOC 2 & GDPR Compliance Checker | The BrightByte',
  description:
    'Free assessment tool to evaluate your organization\'s compliance with SOC 2 Type II and GDPR requirements. Get instant results with actionable recommendations.',
  keywords: [
    'SOC 2 compliance',
    'GDPR compliance',
    'data protection',
    'privacy compliance',
    'security audit',
    'compliance assessment',
  ],
  openGraph: {
    title: 'SOC 2 & GDPR Compliance Checker',
    description: 'Free 5-minute assessment for compliance readiness',
    type: 'website',
  },
};

export default function RegfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="regfo-wrapper min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-50 to-blue-50 font-proxima">
      {children}
    </div>
  );
}
