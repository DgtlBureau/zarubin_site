import fs from 'fs';
import matter from 'gray-matter';

export interface Case {
  title: string;
  description: string;
  slug: string;
  logo: string;
  link?: string | undefined;
  linkTitle?: string | undefined;
  type?: string | undefined;
  image: string | undefined | null;
}

export const getExpertiseAreasMetadata = () => {
  const basePath = 'src/main/expertise_areas';
  const folder = basePath + '/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map((filename): Case => {
    const fileContent = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      slug: filename.replace('.md', ''),
      logo: matterResult.data.logo,
      link: matterResult.data.link,
      linkTitle: matterResult.data.linkTitle,
      type: matterResult.data.type,
      image: matterResult.data.image,
    };
  });

  return posts;
};
