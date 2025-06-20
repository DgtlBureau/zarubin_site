import fs from 'fs';
import matter from 'gray-matter';

export interface IBonuse {
  title: string[];
  description: string;
  btnInfo: string;
  btnSubinfo: string;
  secondSectionTitle: string;
  secondSectionDescr: string;
  image: string;
  date: string;
  slug: string;
}

export const getBonuseMetadata = () => {
  const folder = 'src/bonuse';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map((filename): IBonuse => {
    const fileContent = fs.readFileSync(`${folder}/${filename}`, 'utf8');
    const matterResult = matter(fileContent);
    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      btnInfo: matterResult.data.btnInfo,
      btnSubinfo: matterResult.data.btnSubinfo,
      slug: filename.replace('.md', ''),
      secondSectionTitle: matterResult.data.secondSectionTitle,
      secondSectionDescr: matterResult.data.secondSectionDescr,
      image: matterResult.data.image,
      date: matterResult.data.date,
    };
  });

  return posts;
};
