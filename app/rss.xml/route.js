import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';
import RSS from 'rss';

const expertises = getExpertiseMetadata('src/expertise');
const insights = getInsightsMetadata();
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
    title: 'The Bright Byte Expertise and Insights',
    description: 'Latest expertise and insights from The Bright Byte',
    site_url: `${BASE_URL}`,
    feed_url: `${BASE_URL}/rss`,
    copyright: `${new Date().getFullYear()} The Bright Byte Expertise`,
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
      url: `${BASE_URL}/rss/playbook/${item.dirName}/${item.slug}`,
      guid: `${BASE_URL}/rss/playbook/${item.dirName}/${item.slug}`,
      date: formattedDate,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
