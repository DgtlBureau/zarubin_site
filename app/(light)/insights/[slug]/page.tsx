import { Featured } from '@/src/components/Featured/Featured';
import { SocialFollow } from '@/src/components/SocialFollow/SocialFollow';
import { AuthorInfo } from '@/src/ui-kit/AuthorInfo/AuthorInfo';
import { DownloadLink } from '@/src/ui-kit/DownloadLink/DownloadLink';
import { GoBackLink } from '@/src/ui-kit/GoBackLink/GoBackLink';
import { BASE_URL } from '@/src/utils/alias';
import { cleanMetaTitle } from '@/src/utils/cleanMetaTitle';
import { contentTrimming } from '@/src/utils/contentTrimming';
import { formattedDate } from '@/src/utils/formattedDate';
import { getPostMetadata } from '@/src/utils/getPostMetadata';
import { ideaMarking } from '@/src/utils/IdeaMarking/ideaMarking';
import { openGraphImage } from '@/src/utils/openGraphParams';
import { postsSorting } from '@/src/utils/postsSorting';
import fs from 'fs';
import matter from 'gray-matter';
import { DateTime } from 'luxon';
import Markdown from 'markdown-to-jsx';
import NotFoundPage from '../not-found';
import styles from './Post.module.css';

const URL = process.env.NODE_ENV === 'production' ? BASE_URL : '';

const getPostContent = (slug: string) => {
  const folder = 'src/posts/';
  const file = folder + `${slug}.md`;

  try {
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
};

const getAllPosts = () => {
  const postMetadata = getPostMetadata('src/posts');
  return postsSorting(postMetadata);
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata('src/posts');
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
  const { tag } = post.data;
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
      canonical: `${BASE_URL}/insights/${params.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: 'BrightByte.com',
      ...openGraphImage,
      title,
      description,
      url: `${BASE_URL}/insights/${params.slug}`,
      article: {
        publishedTime: publishedDateISO,
        modifiedTime: publishedDateISO,
        AuthorInfo: post.data.authorImage ? [post.data.authorImage] : null,
      },
    },
    keywords,
  };
}

export default function MainBlogSlug(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  if (!post) {
    return <NotFoundPage slug={slug} />;
  }

  const date = formattedDate(post.data.date);

  const { tag, title, authorName, authorImage, downloadLink, readingTime } =
    post.data;
  const image = post.data.image
    ? post.data.image
    : '/assets/images/banner/default_img.webp';

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

  return (
    <div className='mainContainer relative w-full px-[10px] pb-[30px] tablet:px-[40px] tablet:pb-[40px] desktop:pb-[60px]'>
      <div
        className='absolute left-0 top-0 h-[150px] w-full bg-cover bg-center bg-no-repeat opacity-[40%] tablet:h-[302px] laptop:h-[342px]'
        style={{
          backgroundImage: `url(${URL + image})`,
          zIndex: '-1',
        }}
      ></div>
      {/* <BackLink linkName='insights' /> */}
      <GoBackLink />
      <div className='mx-[auto] max-w-[896px] pb-[30px]'>
        <div className='relative flex w-full items-center justify-center'></div>
        <div className='mt-[200px]'>
          {readingTime && (
            <span className='mb-[10px] block font-proxima text-[16px] leading-[1.25] text-text-dark opacity-[50%]'>
              Reading time: {readingTime}
            </span>
          )}
          <h1
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
    </div>
  );
}