import { Footer } from '@/src/components/Footer/Footer';
import { Header } from '@/src/components/Header/Header';
import { NotFound } from '@/src/components/NotFound/NotFound';
import { getArticlesList } from '@/src/utils/articlesMenu';
import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { buildHeaderMenuData } from '@/src/utils/headerMenu';
import './globals.css';

const headerMenu = buildHeaderMenuData(
  getArticlesList('expertise'),
  getArticlesList('insights'),
  getExpertiseMetadata(),
);

export default function NotFoundPage() {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/assets/images/icons/favicon.svg' sizes='any' />
      </head>
      <body className='flex flex-col gap-[60px] bg-main-bg text-white'>
        <Header {...headerMenu} />
        <main>
          <NotFound />
        </main>
        <Footer />
      </body>
    </html>
  );
}
