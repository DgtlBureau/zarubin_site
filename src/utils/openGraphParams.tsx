export const openGraphImage = (
  imagePath?: string | undefined,
  alt?: string | undefined,
) => {
  return {
    images: [{ url: imagePath || '/assets/images/info/default_image.jpg' }],
    alt: alt || 'The BrightByte - Consulting and advisory',
  };
};
