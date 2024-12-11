import { getExpertiseMetadata } from '@/src/utils/getExpertiseMetadata';
import { DateTime } from 'luxon';
import RSS from 'rss';

const allExpertise = getExpertiseMetadata('src/expertise');

export async function GET() {
  const feed = new RSS({
    title: 'Bright Byte Expertise',
    description: 'Latest expertise from Bright Byte',
    site_url: 'https://thebrightbyte.com',
    feed_url: `https://thebrightbyte.com/playbook/expertise/rss.xml`,
    copyright: `${new Date().getFullYear()} Bright Byte Expertise`,
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
      guid: `https://thebrightbyte.com/playbook/expertise/${expertise.slug}`,
      url: `https://thebrightbyte.com/playbook/expertise/${expertise.slug}`,
      date: formattedDate,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
