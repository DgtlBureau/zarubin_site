import { DateTime } from 'luxon';
import {
  HeaderMenuData,
  ISubmenu,
  MenuArticle,
  MenuSection,
  Post,
} from './types';

/** Featured article + 4 "More reads" in the desktop mega menu (mobile shows the first 2). */
export const MENU_LATEST_ARTICLES = 5;
/** Links per sub-category in the mobile menu; the desktop menu uses the first one. */
export const MENU_SECTION_ITEMS = 6;

const DATE_FORMAT = 'dd-MM-yyyy';

/** Newest first. Same comparator the menus used on the client before, so the order is unchanged. */
const byDateDesc = (a: { date: string }, b: { date: string }) =>
  DateTime.fromFormat(b.date, DATE_FORMAT).toMillis() -
  DateTime.fromFormat(a.date, DATE_FORMAT).toMillis();

const toMenuSection = ({ name, folderItems }: ISubmenu): MenuSection => ({
  name,
  articlesCount: folderItems.length,
  folderItems: [...folderItems]
    .sort(byDateDesc)
    .slice(0, MENU_SECTION_ITEMS)
    .map(({ nameItem, link }) => ({ nameItem, link })),
});

const toMenuArticle = ({
  slug,
  title,
  description,
  image,
  imageAspect,
  category,
}: Post): MenuArticle => ({
  slug,
  title,
  description,
  image,
  imageAspect,
  category,
});

/**
 * Server-side projection of the playbook data the header needs. Sorting and
 * trimming happen here so the client receives only the handful of items the
 * menus render instead of every article's metadata, and luxon stays out of
 * the client bundle.
 */
export const buildHeaderMenuData = (
  expertiseSubmenu: ISubmenu[],
  insightsSubmenu: ISubmenu[],
  posts: Post[],
): HeaderMenuData => ({
  expertiseSubmenu: expertiseSubmenu.map(toMenuSection),
  insightsSubmenu: insightsSubmenu.map(toMenuSection),
  latestArticles: [...posts]
    .sort(byDateDesc)
    .slice(0, MENU_LATEST_ARTICLES)
    .map(toMenuArticle),
});
