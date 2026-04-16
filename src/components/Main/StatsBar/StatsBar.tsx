import { Container } from '../../shared/Container/Container';

const stats = [
  { value: '50+', label: 'Projects shipped', accent: false },
  { value: '99.8%', label: 'Uptime', accent: true },
  { value: '2 weeks', label: 'To prototype', accent: false },
  { value: '0', label: 'Data breaches', accent: true },
];

export const StatsBar = () => {
  return (
    <section className='relative bg-[#060816]'>
      {/* Subtle top border glow */}
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main-blue/40 to-transparent' />

      <Container>
        <div className='grid grid-cols-2 tablet:grid-cols-4'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='group relative flex flex-col items-center py-[24px] tablet:py-[32px] desktop:py-[36px]'
            >
              {/* Vertical divider (not on first item) */}
              {idx > 0 && (
                <div className='absolute left-0 top-1/2 hidden h-[40%] w-px -translate-y-1/2 bg-white/[0.08] tablet:block' />
              )}

              <span
                className={`font-inter text-[28px] font-bold leading-[1] tracking-[-0.03em] tablet:text-[36px] desktop:text-[42px] ${
                  stat.accent
                    ? 'bg-gradient-to-r from-main-blue to-[#4B7BF5] bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {stat.value}
              </span>

              <span className='mt-[8px] font-inter text-[11px] font-medium uppercase tracking-[0.08em] text-white/35 tablet:mt-[10px] tablet:text-[12px]'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Subtle bottom border */}
      <div className='absolute inset-x-0 bottom-0 h-px bg-white/[0.06]' />
    </section>
  );
};
