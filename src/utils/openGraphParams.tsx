export const openGraphImage = (
  imagePath?: string | undefined,
  alt?: string | undefined,
) => {
  return {
    images: [{ url: imagePath || '/assets/images/info/default_logo.png' }],
    alt: alt || 'The BrightByte - Consulting and advisory',
  };
};
