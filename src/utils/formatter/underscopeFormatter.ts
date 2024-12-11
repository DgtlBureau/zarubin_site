export const underscopeFormatter = (word: string | null | undefined) => {
  if (!word) return '';
  return word.replaceAll(' ', '_');
};

export const underscopeReverter = (word: string | null | undefined) => {
  if (!word) return '';
  return word.replaceAll('_', ' ');
};
