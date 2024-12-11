import { getExpertiseMetadata } from './getExpertiseMetadata';
import { getPostMetadata } from './getPostMetadata';
import { postsSorting } from './postsSorting';

const expertiseArticles = getExpertiseMetadata();
const insightsArticles = getPostMetadata('src/posts');
const sortedData = postsSorting([...expertiseArticles, ...insightsArticles]);

export const getAllArticles = () => {
  return sortedData;
};
