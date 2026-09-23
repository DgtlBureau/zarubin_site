import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { HideOnRevanta } from '@/src/components/SiteChrome/HideOnRevanta';
import { ToastProvider } from '@/src/components/ToastProvider';
import { SEO_DESCRIPTION_SIZE } from '@/src/utils/alias';
import { getArticlesList } from '@/src/utils/articlesMenu';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { getAllArticles } from '@/src/utils/getAllArticles';
import { buildHeaderMenuData } from '@/src/utils/headerMenu';
import { pageMetadata } from '@/src/utils/pageMetadata';
import { Seo } from '@/src/utils/Seo/Seo';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './globals.css';

// Only what the header menus render; computed at build time on the server.
const headerMenu = buildHeaderMenuData(
  getArticlesList('expertise'),
  getArticlesList('insights'),
  getAllArticles(),
);

const title = pageMetadata.main.title;
const description = contentTrimming(
  pageMetadata.main.description,
  SEO_DESCRIPTION_SIZE,
);
const keywords = pageMetadata.main.keywords;

export async function generateMetadata(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const params = await props.params;
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Unbounded is declared once via @font-face in globals.css (tailwind `font-unbound`).
  const bodyClassname = classNames(inter.variable);

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
        <HideOnRevanta>
          <Header {...headerMenu} />
        </HideOnRevanta>
        <main className='flex flex-col'>{children}</main>
        <ToastProvider />
        <HideOnRevanta>
          <Footer />
        </HideOnRevanta>
        {/* Chat widget is not needed for first paint: load it once the page is idle */}
        <Script id='replain' strategy='lazyOnload'>
          {`window.replainSettings = { id: '07c36061-dbc9-4cb8-85cb-9e69876b9d34' };
            (function(u){var s=document.createElement('script');s.async=true;s.src=u;
            var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
            })('https://widget.replain.cc/dist/client.js');`}
        </Script>
      </body>
    </html>
  );
}
