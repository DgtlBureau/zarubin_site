import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { MenuItems } from './enums';
import { Post } from './types';

export interface Case {
  title: string;
  description: string;
  readingTime: string | null | undefined;
  date: string | null | undefined;
  category: string;
  subCategory: string | undefined | null;
  tag: string;
  slug: string;
  image: string;
  authorName: string;
  authorImage: string;
}

const getMarkdownFiles = (dir: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
};

export const getInsightsMetadata = (): Post[] => {
  const markdownFiles = getMarkdownFiles(
    `src/${MenuItems.PLAYBOOK.toLowerCase()}/insights`,
  );

  const posts = markdownFiles.map((filePath: string): Post => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      tag: matterResult.data.tag,
      readingTime: matterResult.data.readingTime,
      date: matterResult.data.date,
      category: matterResult.data.category,
      subCategory: matterResult.data.subCategory,
      slug: path.basename(filePath, '.md'),
      image: matterResult.data.image,
      authorName: matterResult.data.authorName,
      authorImage: matterResult.data.authorImage,
    };
  });

  return posts;
};
