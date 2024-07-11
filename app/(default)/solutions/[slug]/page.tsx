import { Hero } from '@/src/components/BusinessObjectives/SingleCasePage/Hero/Hero';
import { Container } from '@/src/components/shared/Container/Container';
import { Section } from '@/src/components/shared/Section/Section';
import matter from 'gray-matter';
import fs from 'fs';
import Markdown from 'markdown-to-jsx';
import styles from './Case.module.css';
import { ScrollAnimationWrapper } from '@/src/components/shared/ScrollAminationWrapper/ScrollAnimationWrapper';
import { Insights } from '@/src/components/Main/Insights/Insights';
import { getCaseMetadata } from '@/src/utils/getCaseMetadata';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { ContactForm } from '@/src/components/Main/ContactForm/ContactForm';

const getCaseContent = (slug: string) => {
  const folder = 'src/cases/';
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, 'utf8');

  const matterResult = matter(content);

  return matterResult;
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
  const title = post.data.title;
  const description = contentTrimming(post.data.description, 150);

  return {
    title: title,
    description,
    openGraph: {
      images: [{ url: post.data.image }],
      title: title,
      description,
    },
  };
}

export default async function CasePage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getCaseContent(slug);

  const { industries, title, tag } = post.data;

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
    <main className='flex flex-col gap-[60px] overflow-hidden'>
      <Section id='hero' className='relative py-0 tablet:py-0 desktop:pb-0'>
        <Container>
          <Hero title={title} tag={tag} industries={industries} />
        </Container>
      </Section>
      <Section light>
        <Container className='flex flex-col gap-[60px]'>
          {paragraphs.map((p, index) => (
            <ScrollAnimationWrapper key={p.index} showOnLoad={index === 0}>
              <div className='grid gap-[40px] desktop:grid-cols-2'>
                <Markdown
                  className={`${styles.markdown} flex w-full flex-col gap-[20px] font-proxima`}
                >
                  {p.content}
                </Markdown>
                <Markdown>{p.images}</Markdown>
              </div>
            </ScrollAnimationWrapper>
          ))}
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
          <ScrollAnimationWrapper>
            <ContactForm />
          </ScrollAnimationWrapper>
        </Container>
      </Section>
    </main>
  );
}
