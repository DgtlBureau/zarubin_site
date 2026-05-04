import { DateTime } from 'luxon';

interface Post {
  title: string;
  description: string;
  readingTime: string | null | undefined;
  image: string | undefined;
  category: string;
  subCategory: string | null | undefined;
  slug: string;
  date: string;
  tag: string | undefined;
  authorName: string;
  authorImage: string;
  downloadLink?: string | undefined;
}

const toSortableMillis = (date: string): number => {
  const ms = DateTime.fromFormat(date, 'dd-MM-yyyy').toMillis();
  return Number.isNaN(ms) ? Number.NEGATIVE_INFINITY : ms;
};

export const postsSorting = (posts: Post[]) => {
  return posts.sort(
    (a, b) => toSortableMillis(b.date) - toSortableMillis(a.date),
  );
};
