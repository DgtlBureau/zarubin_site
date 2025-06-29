import { DateTime } from 'luxon';

export const formattedDate = (date: string) => {
  const newDate = DateTime.fromFormat(date, 'dd-MM-yyyy');
  const formattedDate = newDate.setLocale('en-US').toLocaleString({
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const capitalizedDate = formattedDate.replace(/\b\w+\b/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedDate;
};
