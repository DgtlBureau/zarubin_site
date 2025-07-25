import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,md}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx,md}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  safelist: ['animate-slide-in', 'animate-fade-in', 'animate-fade-out'],
  theme: {
    extend: {
      boxShadow: {
        button: '0px 1px 1px #a6ffdd',
        anchor: '0px 4px 10px rgba(145, 145, 145, 0.25)',
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
        changeAfterBgColor: 'changeAfterBgColor 0.5s ease-in-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        changeAfterBgColor: {
          '0%': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
          '50%': { backgroundColor: 'white' },
          '100%': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
        },
      },
      backgroundImage: {
        'linear-shadow':
          'linear-gradient(175deg,rgba(1, 12, 44, 0) -3.51%,#00030c 85.29%)',
        'radial-primary':
          'radial-gradient(circle, rgba(0, 0, 0, 0), var(--primary) 80%)',
        'radial-white':
          'radial-gradient(circle, rgba(250, 250, 250, 0), var(--main-white) 80%)',
        'mobile-banner': "url('/assets/images/banner/mobile_main_banner.png')",
        'tablet-banner': "url('/assets/images/banner/tablet_main_banner.png')",
        'desktop-banner':
          "url('/assets/images/banner/desktop_main_banner.png')",
        radial: 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: ({ theme }: { theme: PluginAPI['theme'] }) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.text-dark'),
            },
            h2: {
              color: theme('colors.text-dark'),
            },
            h3: {
              color: theme('colors.text-dark'),
            },
            h4: {
              color: theme('colors.text-dark'),
            },
            h5: {
              color: theme('colors.text-dark'),
            },
            h6: {
              color: theme('colors.main-gray'),
            },
            strong: {
              color: theme('colors.text-dark'),
            },
          },
        },
      }),
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        unbound: ['Unbounded', 'sans-serif'],
        proxima: ['Proxima Nova', 'sans-serif'],
      },
      colors: {
        'main-beige': '#F7F7F7',
        'main-bg': '#00030C',
        'main-blue': '#013EDF',
        'main-blue-hover': '#1858FD',
        'dark-blue': '#000A25',
        'main-gray': 'rgba(255, 255, 255, 0.30)',
        'main-silver': 'rgba(239, 240, 246, 1)',
        'main-disabled': '#DCDDEB',
        'main-orange': '#F8AE3C',
        'main-orange-hover': '#FF884D',
        'orange-light': '#FFCC47',
        'main-red': '#D31900',
        'main-purple': '#9747FF',
        dark: '#1B2541',
        'text-gray': 'rgba(1, 12, 44, 0.40)',
        'text-dark': '#010C2C',
        'header-bg': '#010C2C',
        'pink-gr': '#f50c72',
        'indigo-gr': '#4d39d6',
        'accent-color': '#A854FD',
        'purple-light': '#750080',
        'black-bg': '#111111',
        'light-bg': '#1E293B',
        'btn-col': '#ECEFFA',
        'card-bg': '#F5F5F5',
        'card-bg-deep': '#F6F6F6',
        'second-gray': '#494949',
        'light-gray': '#AEAEAE',
        'gray-placeholder': 'A5A5A5',
        'yellow-light-rgb': 'rgba(248, 174, 60, 0.4)',
        'orange-light-rgb': 'rgba(211, 25, 0, 0.4)',
        modal: '#20202099',
        'link-gray': '#DCDCDC',
        'anchor-gray': 'rgba(0, 0, 0, 0.2)',
        'hamburger-anchor': 'rgba(201, 201, 201, 0.25)',
      },
    },
    screens: {
      mobile: '320px',
      'mobile-big': '568px',
      tablet: '768px',
      laptop: '1200px',
      'laptop-big': '1280px',
      desktop: '1440px',
      'desktop-light': '1600px',
      'desktop-big': '1800px',
      'desktop-hard': '1920px',
    },
    keyframes: {
      'slide-in': {
        '0%': { transform: 'translateY(100px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '100%' },
      },
      fade: {
        '0%': { opacity: '0' },
        '100%': { opacity: '100%' },
      },
    },
    animation: {
      'slide-in': 'slide-in 1s ease-in-out',
      'fade-in': 'fade 1s ease-in-out',
      'fade-out': 'fade 1s ease-in-out reverse',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tw-elements-react/dist/plugin.cjs'),
  ],
};
export default config;
