import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { getPostMetadata } from '@/src/utils/getPostMetadata';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';
import RSS from 'rss';

const expertises = getExpertiseMetadata('src/expertise');
const insights = getPostMetadata('src/posts');
const expertiseData = expertises.map((item) => {
  return {
    dirName: 'expertise',
    ...item,
  };
});
const insightsData = insights.map((item) => {
  return {
    dirName: 'insights',
    ...item,
  };
});
const allData = [...expertiseData, ...insightsData];

export async function GET() {
  const feed = new RSS({
    title: 'Bright Byte Expertise and Insights',
    description: 'Latest expertise and insights from Bright Byte',
    site_url: 'https://thebrightbyte.com/',
    feed_url: 'https://thebrightbyte.com/rss',
    copyright: `${new Date().getFullYear()} Bright Byte Expertise`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allData.forEach((item) => {
    const formattedDate = item.date
      ? DateTime.fromFormat(item.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: item.title,
      description: item.description,
      url: `https://thebrightbyte.com/playbook/${item.dirName}/${item.slug}`,
      guid: `https://thebrightbyte.com/playbook/${item.dirName}/${item.slug}`,
      date: formattedDate,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
