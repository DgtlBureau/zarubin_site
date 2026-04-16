import { Container } from '../../shared/Container/Container';

const pillars = [
  {
    title: 'Your Data Stays Yours',
    description:
      'Tenant-isolated environments. AES-256 encryption at rest, TLS 1.3 in transit. Your data never enters a shared pipeline. Full deletion on project close.',
  },
  {
    title: 'AI That Knows Its Limits',
    description:
      'Structured validation on every model output: schema checks, confidence thresholds, domain-specific guardrails. Below threshold, the system escalates to a human.',
  },
  {
    title: 'One Query to Any AI Decision',
    description:
      'Immutable decision logs with timestamps, user context, and model version. Role-based access with least-privilege defaults.',
  },
  {
    title: 'Framework-Aligned from Day One',
    description:
      'Our architecture maps to SOC 2 Type II controls, HIPAA Technical Safeguards, GDPR Art. 25, PCI DSS, and FDA 21 CFR Part 11.',
  },
];

const frameworks = [
  'SOC 2',
  'HIPAA',
  'GDPR',
  'PCI DSS',
  'FDA 21 CFR Part 11',
  'EU AI Act',
  'NIST AI RMF',
];

export const TrustAndSecurity = () => {
  return (
    <section className='bg-white py-[40px] tablet:py-[60px]'>
      <Container>
        <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
          Security & Compliance
        </h2>
        <p className='mt-[8px] font-inter text-[14px] leading-[1.5] text-text-dark/60 tablet:text-[15px]'>
          Every system we ship is built for regulated environments.
        </p>

        <div className='mt-[32px] grid grid-cols-1 gap-[20px] tablet:mt-[40px] tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-[32px]'>
          {pillars.map((pillar, idx) => (
            <div key={idx} className='flex flex-col'>
              <h3 className='font-inter text-[15px] font-semibold leading-[1.3] text-text-dark tablet:text-[16px]'>
                {pillar.title}
              </h3>

              <p className='mt-[8px] font-inter text-[13px] leading-[1.55] text-text-dark/60 tablet:text-[14px]'>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-[32px] flex flex-col items-center tablet:mt-[40px]'>
          <div className='flex flex-wrap justify-center gap-[8px]'>
            {frameworks.map((framework) => (
              <span
                key={framework}
                className='rounded-full bg-text-dark/5 px-[12px] py-[5px] font-inter text-[11px] font-medium text-text-dark/50 tablet:text-[12px]'
              >
                {framework}
              </span>
            ))}
          </div>
          <p className='mt-[12px] font-inter text-[12px] text-text-dark/40'>
            Compliance frameworks we build for
          </p>
        </div>
      </Container>
    </section>
  );
};
