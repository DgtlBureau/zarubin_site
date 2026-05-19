import { getComplianceMetadata } from './getComplianceMetadata';
import { getExpertiseMetadata } from './getExpertiseMetadata';
import { getInsightsMetadata } from './getInsightsMetadata';
import { postsSorting } from './postsSorting';

const expertiseArticles = getExpertiseMetadata();
const insightsArticles = getInsightsMetadata();
const complianceArticles = getComplianceMetadata();
const sortedData = postsSorting([
  ...expertiseArticles,
  ...insightsArticles,
  ...complianceArticles,
]);

export const getAllArticles = () => {
  return sortedData;
};
