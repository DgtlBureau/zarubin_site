import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { MenuItems } from './enums';

export const formatMenuItem = (menuItem: string) => {
  const newMenuItem = menuItem
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
  return newMenuItem;
};

export const finalLink = (str: string) => {
  const splitStr = str.split('.');
  return splitStr[0];
};

export const getArticlesList = (articlePath: string) => {
  const folder = `src/${MenuItems.PLAYBOOK.toLowerCase()}/${articlePath}`;
  const directories = fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((direct) => direct.isDirectory())
    .map((direct) => direct.name);

  const articleList = directories.map((directory) => {
    const files = fs
      .readdirSync(path.join(folder, directory))
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(folder, directory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        return {
          nameItem: file,
          link: `/${file}`,
          date: data.date,
        };
      });

    return {
      name: directory,
      folderItems: files,
    };
  });
  return articleList;
};
