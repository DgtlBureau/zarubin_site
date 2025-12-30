import fs from 'fs';
import matter from 'gray-matter';

export interface Case {
  industries: string[];
  title: string;
  name: string;
  description: string;
  tag: string;
  slug: string;
  logo: string;
  logo_hover: string | null | undefined;
  instruments: string[] | [];
  bannerImage: string;
  date: string | undefined;
  type: string;
  link: string;
}

export const getCaseMetadata = (basePath: string) => {
  const folder = basePath + '/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map((filename): Case => {
    const fileContent = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      name: matterResult.data.name,
      description: matterResult.data.description,
      industries: matterResult.data.industries,
      tag: matterResult.data.tag,
      slug: filename.replace('.md', ''),
      bannerImage: matterResult.data.bannerImage,
      logo: matterResult.data.logo,
      logo_hover: matterResult.data.logo_hover,
      instruments: matterResult.data.instruments,
      date: matterResult.data.date,
      type: matterResult.data.type,
      link: matterResult.data.link,
    };
  });

  return posts;
};
