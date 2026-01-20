import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { ToastProvider } from '@/src/components/ToastProvider';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { getArticlesList } from '@/src/utils/articlesMenu';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import React from 'react';
import 'swiper/css';
import './globals.css';

const expertiseSubMenu = getArticlesList('expertise');
const playbookMetaData = getAllArticles();

const title = pageMetadata.main.title;
const description = contentTrimming(
  pageMetadata.main.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.main.keywords;

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  return Seo({
    title,
    description,
    keywords,
    canonicalPath: params.category,
    ogUrlPath: params.category,
    ogType: 'article',
  });
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const Unbound = localFont({
  src: [
    {
      path: '../public/fonts/unbounded/Unbounded-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/unbounded/Unbounded-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/unbounded/Unbounded-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-unbound',
  adjustFontFallback: false,
});

const Proxima = localFont({
  src: [
    {
      path: '../public/fonts/proxima-nova/proxima_nova_regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/proxima-nova/proxima_nova_bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-proxima',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClassname = classNames(inter.variable, Unbound.variable, Proxima.variable);

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/assets/images/icons/favicon.svg'
        />
        <style>
          {`* {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }

            :root {
              --bg-color: #090215;
              font-size: 14px;
              scroll-behavior: smooth;
            }
  
            h1,h2,h3,h4,h5,h6,ul,ol,li,p,a {
              margin: 0;
              padding: 0;
        }`}
        </style>
      </head>
      <body className={`flex flex-col bg-main-bg text-white ${bodyClassname}`}>
        <Header
          expertiseSubmenu={expertiseSubMenu}
          expertiseMetadata={playbookMetaData}
        />
        <main className='flex flex-col'>{children}</main>
        <ToastProvider />
        <Footer />
        <Script id='replain'>
          {`window.replainSettings = { id: '07c36061-dbc9-4cb8-85cb-9e69876b9d34' };
            (function(u){var s=document.createElement('script');s.async=true;s.src=u;
            var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
            })('https://widget.replain.cc/dist/client.js');`}
        </Script>
      </body>
    </html>
  );
}
