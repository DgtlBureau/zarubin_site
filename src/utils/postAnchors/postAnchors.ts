const generateMarkdownJSXId = (raw: string) => {
  const withoutMarkdown = raw
    .replace(/[*_`~]+/g, '')
    .trim()
    .toLowerCase();

  const startsWithSymbol = /^[^a-z0-9]/.test(withoutMarkdown);

  const slug = withoutMarkdown
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return (startsWithSymbol ? '-' : '') + slug;
};

const regexImage = /!\[.*?\]\(.*?\)/g;

export const generateParagraphs = (allPosts: string) => {
  const paragraphs = allPosts
    .split(/\n(?=#)/)
    .filter((p) => /^#{1,2}\s/.test(p))
    .map((p) => {
      const cleanedContent = p
        .replace(regexImage, '')
        .replace(/(^[ \t]*\n)/gm, '');

      const titleMatch = cleanedContent.match(/^##\s+(.*)/);
      const title = titleMatch ? titleMatch[1].split('\n')[0] : '';

      const anchor = generateMarkdownJSXId(title);

      return {
        title,
        anchor,
      };
    });
  return paragraphs;
};
