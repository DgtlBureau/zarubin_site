import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { MenuItems } from './enums';

export const getArticlesCategory = () => {
  const folder = `src/${MenuItems.PLAYBOOK.toLowerCase()}/`;

  const categories = fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((direct) => direct.isDirectory())
    .map((direct) => direct.name);

  const articleList = categories.map((category) => {
    const categoryPath = path.join(folder, category);

    const subCategories = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((direct) => direct.isDirectory())
      .map((direct) => direct.name);

    const folderItems = subCategories.flatMap((subCategory) => {
      const subCategoryPath = path.join(categoryPath, subCategory);

      return fs
        .readdirSync(subCategoryPath)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const filePath = path.join(subCategoryPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(fileContent);

          return {
            nameItem: file,
            link: `/${file}`,
            date: data.date,
          };
        });
    });

    return {
      category,
      sub_category: subCategories,
      folderItems,
    };
  });

  return articleList;
};
