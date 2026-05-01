import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { NotFound } from '@/src/components/NotFound/NotFound';
import { getArticlesList } from '@/src/utils/articlesMenu';
import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import './globals.css';

const expertiseSubMenu = getArticlesList('expertise');
const insightsSubMenu = getArticlesList('insights');
const expertiseMetadata = getExpertiseMetadata();

export default function NotFoundPage() {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/assets/images/icons/favicon.svg' sizes='any' />
      </head>
      <body className='flex flex-col gap-[60px] bg-main-bg text-white'>
        <Header
          expertiseMetadata={expertiseMetadata}
          expertiseSubmenu={expertiseSubMenu}
          insightsSubmenu={insightsSubMenu}
        />
        <main>
          <NotFound />
        </main>
        <Footer />
      </body>
    </html>
  );
}
