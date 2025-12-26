import Figma from '@/public/assets/images/case/technology/figma.svg';
import Flutter from '@/public/assets/images/case/technology/flutter.svg';
import Go from '@/public/assets/images/case/technology/go.svg';
import PHP from '@/public/assets/images/case/technology/php.svg';
import React from '@/public/assets/images/case/technology/react.svg';
import Ruby from '@/public/assets/images/case/technology/ruby.svg';
import Next from '@/public/assets/images/case/technology/next.svg';
import ReactNative from '@/public/assets/images/case/technology/react-native.svg';
import Laravel from '@/public/assets/images/case/technology/laravel.svg';
import Claude from '@/public/assets/images/case/technology/claude.svg';
import Unity from '@/public/assets/images/case/technology/unity.svg';
import Ml from '@/public/assets/images/case/technology/ml.svg';
import type { FC } from 'react';

type IconComponentType = FC<React.SVGProps<SVGSVGElement>>;

export type InstrumentKey =
  | 'flutter'
  | 'figma'
  | 'react'
  | 'react-native'
  | 'next'
  | 'laravel'
  | 'triboom'
  | 'ml'
  | 'claude'
  | 'unity'
  | 'php'
  | 'go'
  | 'ruby';

type InstrumentIconItem = {
  name: string;
  icon: IconComponentType | null;
};

export type InstrumentIconsType = Record<InstrumentKey, InstrumentIconItem>;

export const InstrumentIcons: InstrumentIconsType = {
  flutter: { name: 'Flutter', icon: Flutter },
  figma: { name: 'Figma', icon: Figma },
  react: { name: 'React.JS', icon: React },
  php: { name: 'PHP', icon: PHP },
  go: { name: 'GO', icon: Go },
  ruby: { name: 'Ruby', icon: Ruby },
  'react-native': { name: 'React.Native', icon: ReactNative },
  next: { name: 'Next.JS', icon: Next },
  laravel: { name: 'Laravel', icon: Laravel },
  claude: { name: 'Claude', icon: Claude },
  unity: { name: 'Unity', icon: Unity },
  ml: { name: 'TensorFlow', icon: Ml },
  triboom: { name: '', icon: null },
};
