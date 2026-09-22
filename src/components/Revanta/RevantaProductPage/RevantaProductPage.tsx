import { RevantaProductKey } from '@/src/data/revanta/routes';
import { RevantaPageContent } from '@/src/data/revanta/types';
import { RevantaHeroPhoto } from '../RevantaHero/RevantaHeroPhoto';
import { RevantaScenarios } from '../RevantaScenarios/RevantaScenarios';
import { RevantaArticles } from '../RevantaSections/RevantaArticles';
import { RevantaComparison } from '../RevantaSections/RevantaComparison';
import { RevantaContact } from '../RevantaSections/RevantaContact';
import { RevantaFacts } from '../RevantaSections/RevantaFacts';
import { RevantaFaq } from '../RevantaSections/RevantaFaq';
import { RevantaFeatureGrid } from '../RevantaSections/RevantaFeatureGrid';
import { RevantaIntro } from '../RevantaSections/RevantaIntro';
import { RevantaOtherProducts } from '../RevantaSections/RevantaOtherProducts';

/** Product page /revanta/[slug]. */
export const RevantaProductPage = ({
  product,
  content,
}: {
  product: RevantaProductKey;
  content: RevantaPageContent;
}) => (
  <>
    <RevantaHeroPhoto
      productName={content.eyebrow}
      h1={content.h1}
      image={content.heroImage}
      imageAlt={content.heroAlt}
    />
    <RevantaIntro content={content} />
    <RevantaFeatureGrid
      heading={content.features.heading}
      intro={content.features.intro}
      items={content.features.items}
    />
    {content.scenarios && (
      <RevantaScenarios
        id='how-it-works'
        heading={content.scenarios.heading}
        items={content.scenarios.items}
      />
    )}
    <RevantaFacts
      heading={content.facts.heading}
      items={content.facts.items}
      icons={content.facts.icons}
    />
    {content.comparison && (
      <RevantaComparison comparison={content.comparison} />
    )}
    <RevantaFaq items={content.faq} />
    <RevantaArticles items={content.articles} />
    <RevantaOtherProducts current={product} />
    <RevantaContact />
  </>
);
