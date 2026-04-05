import { Container } from '../../shared/Container/Container';

const stats = [
  { value: '50+', label: 'Projects shipped' },
  { value: '50', label: 'Engineers' },
  { value: '4 weeks', label: 'To a working PoC' },
  { value: 'SOC 2', label: 'Ready' },
];

export const StatsBar = () => {
  return (
    <section className='border-b border-white/10 bg-black py-[16px] tablet:py-[20px]'>
      <Container>
        <div className='flex items-center justify-between gap-[16px] overflow-x-auto tablet:gap-[32px]'>
          {stats.map((stat, idx) => (
            <div key={idx} className='flex min-w-fit items-center gap-[8px]'>
              <span className='font-inter text-[18px] font-bold leading-[1] tracking-[-0.02em] text-white tablet:text-[22px] desktop:text-[26px]'>
                {stat.value}
              </span>
              <span className='font-inter text-[11px] leading-[1.3] text-white/50 tablet:text-[12px]'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
