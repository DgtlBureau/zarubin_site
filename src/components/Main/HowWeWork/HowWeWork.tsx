import { Container } from '../../shared/Container/Container';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'You describe the problem and your compliance requirements. We tell you if we can solve it.',
    detail: '30 min. Free.',
  },
  {
    number: '02',
    title: 'Technical Scope',
    description:
      'We map data sources, pick the right model architecture, design the inference pipeline, define access controls, and spec the audit trail before writing code.',
    detail: '~1 week',
  },
  {
    number: '03',
    title: 'Working Prototype',
    description:
      'A working system on your real data in a tenant-isolated environment. Your team reviews AI outputs and the audit log. Fixed scope.',
    detail: '~2 weeks',
  },
  {
    number: '04',
    title: 'Production & Compliance',
    description:
      'Scale, integrate, hand off with full documentation for your compliance team. Or we stay on retainer.',
    detail: 'Ongoing',
  },
];

export const HowWeWork = () => {
  return (
    <section className='bg-white py-[40px] tablet:py-[60px]'>
      <Container>
        <h2 className='font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-text-dark/50 tablet:text-[14px]'>
          How We Work
        </h2>
        <p className='mt-[8px] font-inter text-[14px] leading-[1.5] text-text-dark/60 tablet:text-[15px]'>
          From first call to production in weeks.
        </p>

        <div className='mt-[32px] grid grid-cols-1 gap-[20px] tablet:mt-[40px] tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-[32px]'>
          {steps.map((step, idx) => (
            <div key={idx} className='relative flex flex-col'>
              {/* Connector line on desktop */}
              {idx < steps.length - 1 && (
                <div className='absolute right-0 top-[20px] hidden h-[1px] w-[32px] translate-x-full bg-text-dark/10 desktop:block' />
              )}

              <span className='font-inter text-[32px] font-bold leading-[1] tracking-[-0.04em] text-text-dark/10 tablet:text-[40px]'>
                {step.number}
              </span>

              <h3 className='mt-[12px] font-inter text-[15px] font-semibold leading-[1.3] text-text-dark tablet:text-[16px]'>
                {step.title}
              </h3>

              <p className='mt-[8px] font-inter text-[13px] leading-[1.55] text-text-dark/60 tablet:text-[14px]'>
                {step.description}
              </p>

              <span className='mt-[12px] inline-block w-fit rounded-full bg-text-dark/5 px-[10px] py-[4px] font-inter text-[11px] font-medium text-text-dark/50 tablet:text-[12px]'>
                {step.detail}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
