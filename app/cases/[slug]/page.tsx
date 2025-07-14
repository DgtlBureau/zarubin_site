import { Hero } from '@/src/components/BusinessObjectives/SingleCasePage/Hero/Hero';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';
import { Insights } from '@/src/components/Main/Insights/Insights';
import { Container } from '@/src/components/shared/Container/Container';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Section } from '@/src/components/shared/Section/Section';
import {
  BASE_URL,
  SEO_DESCRIPTION_SIZE,
  SEO_TITLE_SIZE,
  SITE_NAME,
} from '@/src/utils/alias';
import { contentTrimming } from '@/src/utils/contentTrimming';
import {
  InstrumentIcons,
  InstrumentIconsType,
} from '@/src/utils/DataLayers/InstrumentsIcon';
import { getCaseMetadata } from '@/src/utils/getCaseMetadata';
import { openGraphImage } from '@/src/utils/openGraphParams';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import NotFoundPage from '../not-found';
import styles from './Case.module.css';
import { MenuItems } from '@/src/utils/enums';

const getCaseContent = (slug: string) => {
  const folder = 'src/cases/';
  const file = folder + `${slug}.md`;

  try {
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
};

export const generateStaticParams = async () => {
  const posts = getCaseMetadata('src/cases');
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getCaseContent(params.slug);

  if (!post) {
    return {
      title: 'Page Not Found',
      description: 'This page does not exist',
    };
  }
  const title = contentTrimming(post.data.title, SEO_TITLE_SIZE);
  const description = contentTrimming(
    post.data.description,
    SEO_DESCRIPTION_SIZE,
  );
  const slug = params.slug;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${MenuItems.CASES.toLowerCase()}/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      ...openGraphImage,
      title,
      description,
      url: `${BASE_URL}/${MenuItems.CASES.toLowerCase()}/${slug}`,
    },
  };
}

export default async function CasePage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getCaseContent(slug);

  if (!post) {
    return <NotFoundPage slug={slug} />;
  }

  const { industries, title, tag, images, instruments } = post.data;

  const Instruments = ({
    instruments,
  }: {
    instruments: (keyof InstrumentIconsType)[];
  }) => {
    return (
      <div className='flex gap-4'>
        {instruments.map((item) => {
          const IconComponent = InstrumentIcons[item];
          if (!IconComponent) {
            return null;
          }
          return <IconComponent key={item} width={60} height={60} />;
        })}
      </div>
    );
  };

  const hashtagRegex = /#[A-Za-z_]+/g;
  const regexFont = /<font color='(.+?)'>(.+?)<\/font>/g;
  const regexImage = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;

  const extractedHashtags = post.content.match(hashtagRegex) ?? [];

  const allPosts = post.content.replace(regexFont, () => {
    const tags = extractedHashtags
      .map((hashtag) => {
        const tag = hashtag.split('#');
        return `<li class="${styles.tagItem}">
                  <span class="${styles.tag}">${tag[1]}</span>
                </li>`;
      })
      .join('');

    return `<ul class="${styles.tagList}">${tags}</ul>`;
  });

  const paragraphs = allPosts
    .split('## ')
    .slice(1)
    .map((p, index) => ({
      index,
      images: p.match(regexImage)?.join() || '',
      content: '## ' + p.replace(regexImage, '').replace(/(^[ \t]*\n)/gm, ''),
    }));

  return (
    <>
      <Section id='hero' className='relative py-0 tablet:py-0 desktop:pb-0'>
        <Container>
          <Hero title={title} tag={tag} industries={industries} />
        </Container>
      </Section>
      <Section light>
        <Container className='grid grid-cols-1 gap-[40px] desktop:grid-cols-2'>
          <div className='flex flex-col gap-[60px]'>
            {paragraphs.map((p, index) => (
              <ScrollAnimationWrapper key={index} showOnLoad={index === 0}>
                <Markdown
                  className={`${styles.markdown} flex w-full flex-col gap-[20px] font-proxima`}
                >
                  {p.content}
                </Markdown>
              </ScrollAnimationWrapper>
            ))}
            <ScrollAnimationWrapper>
              <div>
                <Instruments instruments={instruments} />
              </div>
            </ScrollAnimationWrapper>
          </div>
          <div className='flex flex-col gap-[40px]'>
            {images.map((image: string, idx: number) => (
              <Image
                key={idx}
                src={image}
                width={700}
                height={900}
                quality={80}
                alt={`${slug} project image`}
                className='h-[auto] w-full'
              />
            ))}
          </div>
        </Container>
      </Section>
      <Section id='insights' className='py-0 tablet:py-0 desktop:py-0'>
        <ScrollAnimationWrapper>
          <Insights />
        </ScrollAnimationWrapper>
      </Section>{' '}
      <Section
        id='contacts'
        light
        className='py-[40px] tablet:py-[80px] desktop:py-[80px]'
      >
        <Container>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
