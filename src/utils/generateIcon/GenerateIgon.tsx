'use client';

import { useEffect, useState } from 'react';

export const GenerateIcon = ({
  path,
  color,
}: {
  path: string;
  color: string;
}) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'image/svg+xml');
        const pathElements = doc.querySelectorAll('path');
        pathElements.forEach((el) => el.setAttribute('fill', color));
        setSvgContent(doc.documentElement.outerHTML);
      });
  }, [path, color]);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      className='h-[40px] w-[40px] stroke-white'
      suppressHydrationWarning
    />
  );
};
