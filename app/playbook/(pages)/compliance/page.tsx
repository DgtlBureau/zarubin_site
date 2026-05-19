import { PlaybookClient } from '@/src/components/PlaybookClient/PlaybookClient';
import { Container } from '@/src/components/shared/Container/Container';
import { BASE_URL } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { MenuItems } from '@/src/utils/enums';
import { generateCollectionPageSchema } from '@/src/utils/faqSchema';
import { getComplianceMetadata } from '@/src/utils/getComplianceMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { postsSorting } from '@/src/utils/postsSorting';
import { Seo } from '@/src/utils/Seo/Seo';
import Link from 'next/link';
import { Suspense } from 'react';

const title = pageMetadata.compliance.title;
const description = contentTrimming(pageMetadata.compliance.description, 155);
const keywords = pageMetadata.compliance.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    alternatesTitle: 'The BrightByte Compliance',
    rssPath: `${MenuItems.PLAYBOOK.toLowerCase()}/compliance/rss`,
    keywords,
    ogUrlPath: `${MenuItems.PLAYBOOK.toLowerCase()}/compliance`,
    ogType: 'article',
  });
}

const complianceArticles = getComplianceMetadata();
const sortedComplianceArticles = postsSorting(complianceArticles);

const HUB_URL = `${BASE_URL}/playbook/compliance`;

const frameworks: { name: string; blurb: string }[] = [
  {
    name: 'EU AI Act',
    blurb:
      'Article 9-14 obligations for high-risk AI: risk management, logging, human oversight, technical documentation.',
  },
  {
    name: 'DORA',
    blurb:
      'ICT risk management for financial entities. 4-hour incident reports, 5-year log retention, third-party oversight.',
  },
  {
    name: 'PCI DSS 4.0.1',
    blurb:
      'Payment security after the March 2025 deadline. MFA expansion, e-skimming controls, customised approach.',
  },
  {
    name: 'SOC 2',
    blurb:
      'CC6.1, CC8.1, CC3.2 controls that auditors actually test. Type II rollout patterns for AI coding agents.',
  },
  {
    name: 'HIPAA',
    blurb:
      'ePHI handling, immutable audit logs, 6-year retention, and the January 2025 proposed Security Rule update.',
  },
  {
    name: 'FDA / ICH',
    blurb:
      '21 CFR Part 11 electronic records, ICH guidelines for preclinical and clinical AI use in biotech.',
  },
  {
    name: 'NIS2',
    blurb:
      'EU cybersecurity directive for essential and important entities. Incident reporting and supply chain risk.',
  },
  {
    name: 'EU CRA',
    blurb:
      'Cyber Resilience Act 2027 deadline. Mandatory SBOMs, 24-hour vulnerability reports, CE marking for software.',
  },
  {
    name: 'GDPR',
    blurb:
      'DPIA, lawful basis, and the AI Act overlap. Special-category data exception for bias detection under Art. 10(5).',
  },
];

const featuredSlugs: Record<string, string> = {
  'eu-ai-act-compliance-ai-agents':
    'The Articles 9-14 checklist for AI agents. What to build before the August 2026 deadline lands.',
  'dora-compliance-ai-fintech':
    'DORA treats AI as ICT risk. 4-hour incident reports, 5-year logs, third-party audits. What CTOs must ship now.',
  'ai-audit-trail-architecture-compliance':
    'How to design immutable audit logging that satisfies HIPAA, GDPR, and DORA at the same time. Schemas and tools that hold up.',
  'regfo-ai-compliance-automation':
    'How we built Regfo: AI that reads FDA, ICH, and CFTC guidelines and scores preclinical study packages in minutes.',
};

export default function CompliancePage() {
  const featured = Object.entries(featuredSlugs)
    .map(([slug, hook]) => {
      const article = sortedComplianceArticles.find((a) => a.slug === slug);
      return article ? { article, hook } : null;
    })
    .filter(
      (x): x is { article: (typeof sortedComplianceArticles)[number]; hook: string } =>
        x !== null,
    );

  const schemaJson = generateCollectionPageSchema({
    name: 'AI Compliance for Regulated Industries',
    description,
    url: HUB_URL,
    items: sortedComplianceArticles.map((a) => ({
      title: a.title,
      description: a.description,
      url: `${HUB_URL}/${a.slug}`,
      datePublished: a.date,
      image: a.image,
    })),
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/* Hero */}
      <section className='relative bg-black text-white'>
        <Container className='py-[60px] tablet:py-[90px]'>
          <span className='inline-block rounded-full border border-white/20 bg-white/5 px-[12px] py-[5px] font-inter text-[11px] font-medium uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm'>
            Compliance Playbook
          </span>
          <h1 className='mt-[16px] max-w-[820px] font-unbound text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.01em] tablet:text-[40px] desktop:text-[48px]'>
            Compliance-grade AI for regulated industries
          </h1>
          <p className='mt-[18px] max-w-[680px] font-inter text-[15px] leading-[1.55] text-white/75 tablet:text-[17px]'>
            Field notes from shipping AI agents into pre-IND biotech, niche-merchant
            fintech, and healthtech. EU AI Act, DORA, PCI DSS 4.0, SOC 2, HIPAA, FDA
            and ICH — covered at commit time, not bolted on six months later.
          </p>
          <div className='mt-[28px] flex flex-wrap gap-[12px]'>
            <Link
              href='/#contacts'
              className='rounded-[6px] bg-main-orange px-[20px] py-[10px] font-inter text-[13px] font-semibold text-text-dark transition hover:bg-main-orange/90 tablet:px-[24px] tablet:py-[12px] tablet:text-[14px]'
            >
              Book a compliance review
            </Link>
            <a
              href='#articles'
              className='rounded-[6px] border border-white/25 px-[20px] py-[10px] font-inter text-[13px] font-semibold text-white transition hover:bg-white/10 tablet:px-[24px] tablet:py-[12px] tablet:text-[14px]'
            >
              Read the playbook
            </a>
          </div>
        </Container>
      </section>

      {/* Why compliance is our brand */}
      <section className='bg-white text-text-dark'>
        <Container className='py-[50px] tablet:py-[70px]'>
          <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
            Why compliance is the whole point
          </h2>
          <div className='mt-[20px] grid gap-[22px] tablet:grid-cols-2 tablet:gap-[36px]'>
            <div className='space-y-[16px] font-inter text-[15px] leading-[1.6] text-text-dark/80 tablet:text-[16px]'>
              <p>
                We are a small studio out of North Carolina. We work with founders
                who can&apos;t afford to ship an AI feature that fails an audit six
                months in. That&apos;s pre-IND biotech with a clinical advisor on
                the call, fintech serving high-risk merchants, and healthtech with
                three founders who need to walk into a SOC 2 readiness assessment
                without flinching.
              </p>
              <p>
                For these teams compliance isn&apos;t a checkbox. It&apos;s the
                whole reason they hire a dev shop instead of going to Upwork. They
                need the audit trail working at the commit, the human-in-the-loop
                designed in from the first sprint, and the data residency story
                ready before procurement asks.
              </p>
            </div>
            <div className='space-y-[16px] font-inter text-[15px] leading-[1.6] text-text-dark/80 tablet:text-[16px]'>
              <p>
                That&apos;s the brief we keep getting. So that&apos;s the brief we
                got good at. Every project ships with logging that maps to Article
                12 of the EU AI Act, a change-management trail that survives a SOC
                2 Type II window, and an incident-response playbook your DORA
                examiner can read without translation.
              </p>
              <p>
                The articles below are the playbook we wish we&apos;d had four
                years ago. Real numbers, real deadlines, no consulting fluff. If
                you&apos;re building in a regulated industry and you want a partner
                who thinks about audit before features, you&apos;re in the right
                place.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Coverage matrix */}
      <section className='bg-card-bg text-text-dark'>
        <Container className='py-[50px] tablet:py-[70px]'>
          <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
            Frameworks we build for
          </h2>
          <p className='mt-[8px] max-w-[640px] font-inter text-[14px] leading-[1.55] text-text-dark/60 tablet:text-[15px]'>
            One system, multiple regimes. Most of our clients sit under two or
            three of these at once.
          </p>
          <div className='mt-[28px] grid grid-cols-1 gap-[16px] tablet:grid-cols-2 tablet:gap-[18px] desktop:grid-cols-3'>
            {frameworks.map((fw) => (
              <div
                key={fw.name}
                className='rounded-[8px] border border-text-dark/10 bg-white p-[20px]'
              >
                <h3 className='font-unbound text-[15px] font-bold uppercase tracking-[0.02em] text-text-dark tablet:text-[16px]'>
                  {fw.name}
                </h3>
                <p className='mt-[8px] font-inter text-[13px] leading-[1.55] text-text-dark/65 tablet:text-[14px]'>
                  {fw.blurb}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured articles */}
      {featured.length > 0 && (
        <section className='bg-white text-text-dark'>
          <Container className='py-[50px] tablet:py-[70px]'>
            <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
              Start here
            </h2>
            <p className='mt-[8px] max-w-[640px] font-inter text-[14px] leading-[1.55] text-text-dark/60 tablet:text-[15px]'>
              Four pieces that cover most of what regulated buyers ask us first.
            </p>
            <div className='mt-[28px] grid gap-[18px] tablet:grid-cols-2 tablet:gap-[22px]'>
              {featured.map(({ article, hook }) => (
                <Link
                  key={article.slug}
                  href={`/playbook/compliance/${article.slug}`}
                  className='group flex flex-col rounded-[8px] border border-text-dark/10 bg-card-bg p-[22px] transition hover:border-main-orange/60 hover:shadow-md'
                >
                  <h3 className='font-unbound text-[16px] font-bold uppercase leading-[1.25] tracking-[0.01em] text-text-dark group-hover:underline tablet:text-[17px]'>
                    {article.title}
                  </h3>
                  <p className='mt-[12px] font-inter text-[14px] leading-[1.55] text-text-dark/70 tablet:text-[15px]'>
                    {hook}
                  </p>
                  <span className='mt-[14px] font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-main-orange'>
                    Read the article →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All compliance articles listing */}
      <section id='articles' className='bg-white text-text-dark'>
        <Container className='pt-[20px]'>
          <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
            All compliance articles
          </h2>
        </Container>
        <Suspense fallback={<div className='h-[400px] w-full bg-white' />}>
          <PlaybookClient data={sortedComplianceArticles} />
        </Suspense>
      </section>

      {/* Featured case: Regfo */}
      <section className='bg-card-bg text-text-dark'>
        <Container className='py-[50px] tablet:py-[70px]'>
          <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
            Case study
          </h2>
          <Link
            href='/cases/regfo'
            className='group mt-[20px] flex flex-col gap-[20px] rounded-[10px] border border-text-dark/10 bg-white p-[24px] transition hover:border-main-orange/60 hover:shadow-md tablet:flex-row tablet:items-center tablet:p-[32px]'
          >
            <div className='flex-1'>
              <span className='font-inter text-[11px] font-semibold uppercase tracking-[0.08em] text-text-dark/50'>
                Regfo · Biotech / Pharma
              </span>
              <h3 className='mt-[8px] font-unbound text-[18px] font-bold uppercase leading-[1.25] text-text-dark group-hover:underline tablet:text-[22px]'>
                AI regulatory workspace for biotech
              </h3>
              <p className='mt-[12px] font-inter text-[14px] leading-[1.55] text-text-dark/70 tablet:text-[15px]'>
                Regfo reads FDA, ICH, and CFTC guidelines, scores preclinical
                study packages against compliance requirements, and tells you
                exactly where the gaps are. 24 ICH guidelines parsed. 1,054
                rules encoded. Minutes instead of weeks.
              </p>
              <span className='mt-[14px] inline-block font-inter text-[12px] font-semibold uppercase tracking-[0.08em] text-main-orange'>
                Read the case →
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* CTA */}
      <section className='bg-black text-white'>
        <Container className='py-[60px] tablet:py-[80px]'>
          <div className='flex flex-col items-start gap-[20px] tablet:flex-row tablet:items-center tablet:justify-between'>
            <div className='max-w-[640px]'>
              <h2 className='font-unbound text-[22px] font-bold uppercase leading-[1.2] tracking-[-0.01em] tablet:text-[30px]'>
                Need a compliance-grade AI build?
              </h2>
              <p className='mt-[12px] font-inter text-[14px] leading-[1.55] text-white/75 tablet:text-[16px]'>
                Free 30-minute strategy session. We&apos;ll map your AI roadmap
                against EU AI Act, DORA, SOC 2, or whichever regime is keeping
                your legal team up at night.
              </p>
            </div>
            <Link
              href='/#contacts'
              className='rounded-[6px] bg-main-orange px-[24px] py-[12px] font-inter text-[14px] font-semibold text-text-dark transition hover:bg-main-orange/90 tablet:px-[28px] tablet:py-[14px] tablet:text-[15px]'
            >
              Book a strategy session
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
