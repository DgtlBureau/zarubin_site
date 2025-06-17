import { BASE_URL } from '@/src/utils/alias';
import { getInsightsMetadata } from '@/src/utils/getInsightsMetadata';
import { DateTime } from 'luxon';
import RSS from 'rss';

const allInsights = getInsightsMetadata();

export async function GET() {
  const feed = new RSS({
    title: 'The BrightByte Insights',
    description: 'Latest insights from the BrightByte',
    site_url: `${BASE_URL}`,
    feed_url: `${BASE_URL}/playbook/insights/rss.xml`,
    copyright: `${new Date().getFullYear()} The BrightByte Insights`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allInsights.forEach((insight) => {
    const formattedDate = insight.date
      ? DateTime.fromFormat(insight.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: String(insight.title),
      description: String(insight.description),
      guid: `${BASE_URL}/playbook/insights/${insight.slug}`,
      url: `${BASE_URL}/playbook/insights/${insight.slug}`,
      date: formattedDate,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
