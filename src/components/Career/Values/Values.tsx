import ValuesBody from '../../svg/TeamValuesBodySvg';
import { ValuesBodyTablet } from '../../svg/TeamValuesBodyTabletSvg';
import { ValueItemMobile } from './ValueItemMobile/ValueItemMobile';

const VALUES_ITEMS = [
  {
    title: 'Compliance by default',
    description:
      'Audit trails, data governance, and regulatory guardrails go in at the architecture stage. Not after launch. Not in v2. The first build your compliance team sees is the one that passes.',
  },
  {
    title: 'Ship, then polish',
    description:
      'A working prototype in 2 weeks beats a perfect plan in 4 months. We get real AI outputs in front of your team fast, then iterate based on what actually matters.',
  },
  {
    title: 'Transparency',
    description:
      'Stuck on something? Say it. Found a problem with the approach? Raise it now, not at the demo. We would rather have an uncomfortable conversation on Monday than a failed audit on Friday.',
  },
  {
    title: 'Own the outcome',
    description:
      "We don't hand off a repo and disappear. If the agent hallucinates in production, that's our problem too. We stay on retainer because we care about what happens after launch.",
  },
  {
    title: 'Always learning',
    description:
      'The tooling changes every quarter. Our team runs experiments, publishes what we learn, and brings new patterns into client projects.',
  },
  {
    title: 'Builder culture',
    description:
      'We built Regfo to prove our own compliance AI works. We use AI-native dev tools daily. We write code, ship products, and fix things at 2am when it matters.',
  },
];
export const Values = () => {
  return (
    <div className='flex flex-col gap-[40px] tablet:gap-[98px]'>
      <h2 className='section-headings font-unbound font-bold uppercase leading-[1] tablet:leading-[1.3] desktop:leading-[1.1]'>
        values that help achieve results
      </h2>
      <div className='hidden h-auto desktop:block'>
        <ValuesBody />
      </div>
      <div className='hidden h-auto tablet:block desktop:hidden'>
        <ValuesBodyTablet />
      </div>
      <div className='flex h-auto flex-col gap-[40px] tablet:hidden desktop:hidden'>
        {VALUES_ITEMS.map((item, index) => (
          <ValueItemMobile
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
