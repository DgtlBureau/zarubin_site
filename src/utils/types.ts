export interface Post {
  slug: string;
  title: string;
  description: string;
  image: string | undefined;
  /** width / height of `image` (local files only), for next/image `sizes`. */
  imageAspect?: number;
  category: string;
  subCategory: string | null | undefined;
  date: string;
  tag: string | undefined;
  readingTime: string | null | undefined;
  authorName: string;
  authorImage: string;
  downloadLink?: string | undefined;
}

export interface IImage {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

export interface IFeedback {
  id: number;
  name: string;
  job: string;
  image: IImage;
  feedback: string;
  logo: IImage;
  date: string;
}

export interface IProduct {
  name: string;
  image: string;
  link: string;
  slug: string;
  open: boolean;
  date: string;
}

export interface ISubmenuData {
  nameItem: string;
  link: string;
  date: string;
}

export interface ISubmenu {
  name: string;
  folderItems: ISubmenuData[];
}

/** Article fields the header menus render (desktop mega menu + mobile menu). */
export type MenuArticle = Pick<
  Post,
  'slug' | 'title' | 'description' | 'image' | 'imageAspect' | 'category'
>;

export interface MenuSectionItem {
  nameItem: string;
  link: string;
}

/** A playbook sub-category as the header menus show it: newest items first. */
export interface MenuSection {
  name: string;
  articlesCount: number;
  folderItems: MenuSectionItem[];
}

export interface HeaderMenuData {
  expertiseSubmenu: MenuSection[];
  insightsSubmenu: MenuSection[];
  latestArticles: MenuArticle[];
}
