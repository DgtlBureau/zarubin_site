import { useEffect, useState } from 'react';

type Conditions = string | string[];

export const breakpoints = {
  mobile: 320,
  'mobile-big': 375,
  tablet: 768,
  laptop: 1200,
  'laptop-big': 1280,
  desktop: 1440,
  'desktop-big': 1800,
  'desktop-hard': 1920,
};

const getOperator = (condition: string) =>
  ['>=', '>', '<=', '<'].find((operator) =>
    condition.startsWith(operator),
  ) as string;

const getPrefix = (operator: string) =>
  ['<', '<='].includes(operator) ? 'max' : 'min';

const getValue = (condition: string, operator: string) => {
  const rawValue = condition.replace(operator, '');
  let value =
    breakpoints[rawValue as keyof typeof breakpoints] || Number(rawValue);
  if (operator === '>') {
    value += 1;
  } else if (operator === '<') {
    value -= 1;
  }
  return value;
};

const parse = (conditions: Conditions) =>
  (Array.isArray(conditions) ? conditions : [conditions]).map((condition) => {
    const operator = getOperator(condition);
    const prefix = getPrefix(operator);
    const value = getValue(condition, operator);
    return `(${prefix}-width: ${value}px)`;
  });

const useMediaQuery = (
  conditions: Conditions,
  joinOperator: 'and' | 'or' = 'and',
  defaultValue: boolean = false,
) => {
  // Use null to indicate "not yet determined" to prevent hydration mismatch
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const query = parse(conditions).join(` ${joinOperator} `);
    const mkl = window.matchMedia(query);
    setMatches(mkl.matches);
    const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

    mkl.addEventListener('change', updateMatches);

    return () => mkl.removeEventListener('change', updateMatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions.toString(), joinOperator]);

  // Return defaultValue during SSR and initial client render to prevent hydration mismatch
  return matches ?? defaultValue;
};

export default useMediaQuery;
