import { Featured } from '@/src/components/Featured/Featured';
import { SocialFollow } from '@/src/components/SocialFollow/SocialFollow';
import { AuthorInfo } from '@/src/ui-kit/AuthorInfo/AuthorInfo';
import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { GoBackLink } from '@/src/ui-kit/GoBackLink/GoBackLink';
import { AnchorHamburger } from '@/src/ui-kit/PostAnchors/AnchorHamburger';
import { PostAnchors } from '@/src/ui-kit/PostAnchors/PostAnchors';
import { ReadingProgressBar } from '@/src/ui-kit/ReadingProgressBar/ReadingProgressBar';
import { BASE_URL, SITE_NAME } from '@/src/utils/alias';
import { cleanMetaTitle } from '@/src/utils/cleanMetaTitle';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { MenuItems } from '@/src/utils/enums';
import { generateFAQSchema, generateArticleSchema } from '@/src/utils/faqSchema';
import { formattedDate } from '@/src/utils/formattedDate';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { ideaMarking } from '@/src/utils/IdeaMarking/ideaMarking';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { generateParagraphs } from '@/src/utils/postAnchors/postAnchors';
import { postsSorting } from '@/src/utils/postsSorting';
import fs from 'fs';
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import Markdown from 'markdown-to-jsx';
import path from 'path';
import Script from 'next/script';
import styles from './Post.module.css';

const findMarkdownFile = (dir: string, slug: string): string | null => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const result = findMarkdownFile(filePath, slug);
      if (result) return result;
    } else if (file.endsWith('.md') && file.replace('.md', '') === slug) {
      return filePath;
    }
  }
  return null;
};

const getPostContent = (slug: string) => {
  const folder = `src/${MenuItems.PLAYBOOK.toLowerCase()}/insights/`;
  const file = findMarkdownFile(folder, slug);

  if (file) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const matterResult = matter(content);
      return matterResult;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  } else {
    console.error('File not found');
    return null;
  }
};

const getAllPosts = () => {
  const postMetadata = getInsightsMetadata();
  return postsSorting(postMetadata);
};

export const generateStaticParams = async () => {
  const posts = getInsightsMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostContent(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist',
    };
  }

  const cleanTitle = cleanMetaTitle(post.data.title);
  const slug = params.slug || '';
  const { tag, image } = post.data;
  const keywords = tag.split(',');

  const title = contentTrimming(cleanTitle, 105);
  const description = contentTrimming(post.data.description, 155);

  const publishedDateISO = DateTime.fromFormat(
    post.data.date,
    'dd-MM-yyyy',
  ).toISO();

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/insights/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: SITE_NAME,
      ...openGraphImage(image),
      title,
      description,
      url: `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/insights/${slug}`,
      modifiedTime: publishedDateISO,
      publishedTime: publishedDateISO,
      authors: post.data.authorImage ? [post.data.authorImage] : null,
    },
    keywords,
  };
}

export default function InsightsPostPage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  if (!post) {
    return null;
  }

  const date = formattedDate(post.data.date);

  const { tag, title, authorName, authorImage, downloadLink, readingTime, faq, image } =
    post.data;

  // Generate structured data
  const publishedDateISO = DateTime.fromFormat(post.data.date, 'dd-MM-yyyy').toISO() || '';
  const articleUrl = `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/insights/${slug}`;

  const articleSchemaJson = generateArticleSchema({
    title,
    description: post.data.description,
    image,
    datePublished: publishedDateISO,
    authorName,
    url: articleUrl,
  });

  const faqSchemaJson = faq ? generateFAQSchema(faq) : null;

  const hashtagRegex = /#[A-Za-z_]+/g;
  const regexFont = /<font color='(.+?)'>(.+?)<\/font>/g;

  const ideaRegx = /\[\[(.*?)\]\]/g;
  const ideaMatches = post.content.match(ideaRegx);

  const extractedHashtags = post.content.match(hashtagRegex) ?? [];

  const allPosts = post.content
    .replace(regexFont, () => {
      const tags = extractedHashtags
        .map((hashtag) => {
          const tag = hashtag.split('#');
          return `<li class="${styles.tagItem}">
      <span class="${styles.tag}">${tag[1]}</span>
    </li>`;
        })
        .join('');

      return `<ul class="${styles.tagList}">${tags}</ul>`;
    })

    .replace(ideaRegx, () => {
      if (!ideaMatches) {
        return '';
      }
      let matches;
      while ((matches = ideaRegx.exec(post.content)) !== null) {
        const content = matches[1];
        return ideaMarking(content);
      }

      return '';
    });

  const paragraphs = generateParagraphs(allPosts);

  const mainAnchorData = {
    title,
    anchor: 'title',
  };

  return (
    <div className='relative w-full bg-white px-[10px] pb-[30px] tablet:px-[40px] tablet:pb-[40px] desktop:pb-[60px]'>
      {/* Article Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchemaJson }}
      />
      {/* FAQ Schema (if available) */}
      {faqSchemaJson && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
        />
      )}
      <ReadingProgressBar />
      <div className='flex'>
        <div className='relative flex-1 pr-[20px]'>
          <PostAnchors data={paragraphs} mainAnchorData={mainAnchorData} />
          <GoBackLink />
        </div>
        <div className='mx-[auto] h-auto max-w-[869px] overflow-hidden pb-[30px]'>
          <div className='mt-[60px]'>
            {readingTime && (
              <span className='mb-[10px] block font-proxima text-[16px] leading-[1.25] text-text-dark opacity-[50%]'>
                Reading time: {readingTime}
              </span>
            )}
            <h1
              id={'title'}
              className={`font-proxima text-[28px] font-bold leading-[1.1] text-text-dark`}
            >
              {title}
            </h1>
            <div className='flex flex-col tablet:flex-col-reverse'>
              {downloadLink && tag === 'Research' && (
                <DownloadLink link={downloadLink} />
              )}
              <div
                className={`mb-[10px] mt-[20px] flex flex-col tablet:mt-[40px] tablet:flex-row tablet:justify-between desktop:mb-[40px] desktop:mt-[20px]`}
              >
                <AuthorInfo image={authorImage} name={authorName} date={date} />
              </div>
            </div>
          </div>
          <article
            className={`prose w-full max-w-[100%] pb-[30px] text-white prose-p:text-[16px] prose-p:text-text-dark/80 prose-li:text-[16px] prose-li:text-text-dark/80 tablet:pb-[40px] desktop:pb-[60px]`}
          >
            <Markdown className={`${styles.markdown} z-20 w-full font-proxima`}>
              {allPosts}
            </Markdown>
          </article>
          <SocialFollow />
          <div className='desktop:bp-0 relative z-[5] mt-[60px] pb-[20px]'>
            <Featured slug={slug} posts={getAllPosts()} />
          </div>
        </div>
        <div className='flex-1'></div>
      </div>
      <AnchorHamburger data={paragraphs} mainAnchorData={mainAnchorData} />
    </div>
  );
}
