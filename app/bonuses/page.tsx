import { Bonuses } from '@/src/components/Bonuses/Bonuses';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getBonuseMetadata } from '@/src/utils/filesMetadata/getBonuseMetadata';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';

const title = pageMetadata.bonuse.title;
const description = contentTrimming(
  pageMetadata.bonuse.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.bonuse.keywords;

export async function generateMetadata() {
  return Seo({
    title,
    description,
    ...(!keywords.length ? {} : { keywords }),
    ogUrlPath: 'bonuses',
  });
}

const data = getBonuseMetadata();

export default function BonusesPage() {
  return <Bonuses data={data} />;
}
