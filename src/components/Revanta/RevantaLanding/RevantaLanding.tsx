import { REVANTA_CONTENT } from '@/src/data/revanta/content';
import { RevantaPageContent } from '@/src/data/revanta/types';
import { RevantaHeroSplit } from '../RevantaHero/RevantaHeroSplit';
import { RevantaScenarios } from '../RevantaScenarios/RevantaScenarios';
import { RevantaArticles } from '../RevantaSections/RevantaArticles';
import { RevantaBenefits } from '../RevantaSections/RevantaBenefits';
import { RevantaContact } from '../RevantaSections/RevantaContact';
import { RevantaFacts } from '../RevantaSections/RevantaFacts';
import { RevantaFaq } from '../RevantaSections/RevantaFaq';
import { RevantaModuleCards } from '../RevantaSections/RevantaModuleCards';
import { RevantaProblem } from '../RevantaSections/RevantaProblem';
import { Reveal } from '../ui/Reveal';
import { H2_CLASS, RevantaContainer, RevantaSection } from '../ui/layout';
import {
  AudiencePanel,
  RevantaAudienceSwitcher,
} from './RevantaAudienceSwitcher';

/** Scenarios shown before the benefits block; the rest follow it. */
const SCENARIOS_BEFORE_BENEFITS = 3;

/** Hub page /revanta. */
export const RevantaLanding = ({ content }: { content: RevantaPageContent }) => {
  const panels: AudiencePanel[] = (content.audience.tabs ?? []).map((t) => {
    const product = REVANTA_CONTENT[t.product];
    return {
      tab: t.tab,
      product: t.product,
      title: product.problem.heading,
      text: product.lead,
      points: product.audience.items.slice(0, 4),
    };
  });
  const scenarios = content.scenarios?.items ?? [];

  return (
    <>
      <RevantaHeroSplit
        eyebrow={content.eyebrow}
        h1={content.h1}
        lead={content.lead}
        image={content.heroImage}
        imageAlt={content.heroAlt}
      />

      {/* Who it suits */}
      <RevantaSection className='pt-[60px] tablet:pt-[80px] desktop:pt-[90px]'>
        <RevantaContainer>
          <Reveal>
            <h2 className={H2_CLASS}>{content.audience.heading}</h2>
            <ul className='mt-[24px] flex flex-wrap gap-[10px]'>
              {content.audience.items.map((item) => (
                <li
                  key={item}
                  className='rounded-full border border-revanta-ink/10 bg-[#F5F5F5] px-[14px] py-[7px] font-inter text-[15px] text-revanta-ink/70'
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          {panels.length > 0 && (
            <Reveal delay={0.06} className='mt-[36px] tablet:mt-[48px]'>
              <RevantaAudienceSwitcher panels={panels} />
            </Reveal>
          )}
        </RevantaContainer>
      </RevantaSection>

      <RevantaProblem problem={content.problem} />

      {content.scenarios && (
        <RevantaScenarios
          id='how-it-works'
          heading={content.scenarios.heading}
          items={scenarios.slice(0, SCENARIOS_BEFORE_BENEFITS)}
        />
      )}

      {content.benefits && (
        <RevantaBenefits
          heading={content.benefits.heading}
          items={content.benefits.items}
        />
      )}

      <RevantaScenarios
        items={scenarios.slice(SCENARIOS_BEFORE_BENEFITS)}
        startIndex={SCENARIOS_BEFORE_BENEFITS}
      />

      <RevantaModuleCards
        heading={content.features.heading}
        intro={content.features.intro}
        items={content.features.items}
      />

      <RevantaFacts
        heading={content.facts.heading}
        items={content.facts.items}
        icons={content.facts.icons}
      />

      <RevantaFaq items={content.faq} />
      <RevantaArticles items={content.articles} />
      <RevantaContact />
    </>
  );
};
