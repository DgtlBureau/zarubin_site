import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { getExpertiseList } from '@/src/utils/expertiseMenu';
import { openGraphImage } from '@/src/utils/openGraphParams';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import 'swiper/css';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Bright Byte is a consulting agency specializing in innovation in development and system integration. We use modern and cost-effective solutions for complex challenges.',
  description: 'Case studies, research and experience in detail',
  metadataBase: new URL('https://www.thebrightbyte.com'),
  icons: {
    icon: '/assets/images/info/main_meta.png',
  },
  alternates: {
    canonical: 'https://www.thebrightbyte.com/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BrightByte.com',
    ...openGraphImage,
    title: 'Ultimative IT Development mobile & web apps | Bright Byte',
    description:
      'Bright Byte is a consulting agency specializing in innovation in development and system integration. We use modern and cost-effective solutions for complex challenges.',
    url: 'https://www.thebrightbyte.com',
  },
};

const testList = getExpertiseList();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/assets/images/icons/favicon.svg' sizes='any' />
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-FXGP2J4QFD'
        ></Script>
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXGP2J4QFD');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} flex flex-col bg-white text-text-dark`}
      >
        <Header dark={false} expertiseSubmenu={testList} />
        <main className='relative'>{children}</main>
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
