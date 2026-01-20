import { NewContactForm } from '@/src/components/Main/NewContactForm/NewContactForm';
import { NewExpertise } from '@/src/components/Main/NewExpertise/NewExpertise';
import { NewFeedback } from '@/src/components/Main/NewFeedback/NewFeedback';
import { NewHero } from '@/src/components/Main/NewHero/NewHero';
import { NewInsights } from '@/src/components/Main/NewInsights/NewInsights';
import { SuccessStories } from '@/src/components/Main/SuccessStories/SuccessStories';
import { Section } from '@/src/components/shared/Section/Section';
import { getCaseMetadata } from '@/src/utils/getCaseMetadata';
import { getExpertiseAreasMetadata } from '@/src/utils/getExpertiseAreasMetadata';
import { DateTime } from 'luxon';

const data = getExpertiseAreasMetadata();
const casesMetadata = getCaseMetadata('src/cases');
const sortedCases = casesMetadata.sort((a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;

  const dateA = DateTime.fromFormat(a.date, 'dd-MM-yyyy');
  const dateB = DateTime.fromFormat(b.date, 'dd-MM-yyyy');

  if (!dateA.isValid && !dateB.isValid) return 0;
  if (!dateA.isValid) return 1;
  if (!dateB.isValid) return -1;

  return dateB.toMillis() - dateA.toMillis();
});

export const MainPageComponent = () => {
  return (
    <div className='oveflow-hidden flex flex-col'>
      <NewHero />
      {/* <SuccessStories cases={sortedCases} /> */}
      <NewExpertise data={data} />
      <NewInsights />
      <Section>
        <NewFeedback />
      </Section>
      <Section
        light
        className='px-0 py-0 tablet:px-0 tablet:py-0 desktop:px-0 desktop:py-0'
      >
        <NewContactForm />
      </Section>
    </div>
  );
};
