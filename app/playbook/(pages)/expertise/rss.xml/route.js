import { BASE_URL } from '@/src/utils/alias';
import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { DateTime } from 'luxon';
import RSS from 'rss';

const allExpertise = getExpertiseMetadata('src/expertise');

export async function GET() {
  const feed = new RSS({
    title: 'The BrightByte Expertise',
    description: 'Latest expertise from The BrightByte',
    site_url: `${BASE_URL}`,
    feed_url: `${BASE_URL}/playbook/expertise/rss.xml`,
    copyright: `${new Date().getFullYear()} The BrightByte Expertise`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allExpertise.forEach((expertise) => {
    const formattedDate = expertise.date
      ? DateTime.fromFormat(expertise.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: String(expertise.title),
      description: String(expertise.description),
      guid: `${BASE_URL}/playbook/expertise/${expertise.slug}`,
      url: `${BASE_URL}/playbook/expertise/${expertise.slug}`,
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
