import React, { ReactNode } from 'react';

interface IPreposition {
  text: string;
  tag: keyof React.JSX.IntrinsicElements;
  className: string;
  children?: ReactNode;
}

export const NextLinePreposition = ({ text, tag, className }: IPreposition) => {
  const prepositions = [
    'and',
    'or',
    'but',
    'for',
    'nor',
    'so',
    'yet',
    'the',
    'is',
    'to',
    'we',
    'in',
    'a',
    'as',
    'it',
    'of',
    'from',
    'with',
    'on',
    'not',
    'are',
    'an',
  ];

  const regex = new RegExp(`\\s(${prepositions.join('|')})\\s`, 'gi');

  const newText = text.replace(regex, ' $1&nbsp;');

  return React.createElement(tag, {
    className,
    dangerouslySetInnerHTML: { __html: newText },
  });
};
