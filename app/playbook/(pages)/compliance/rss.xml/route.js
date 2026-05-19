import { BASE_URL } from '@/src/utils/alias';
import { MenuItems } from '@/src/utils/enums';
import { getComplianceMetadata } from '@/src/utils/getComplianceMetadata';
import { DateTime } from 'luxon';
import RSS from 'rss';

const allCompliance = getComplianceMetadata('src/compliance');

export async function GET() {
  const feed = new RSS({
    title: 'The BrightByte Compliance',
    description: 'Latest compliance from The BrightByte',
    site_url: `${BASE_URL}`,
    feed_url: `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/compliance/rss.xml`,
    copyright: `${new Date().getFullYear()} The BrightByte Compliance`,
    language: 'en-us',
    pubDate: new Date().toUTCString(),
  });

  allCompliance.forEach((compliance) => {
    const formattedDate = compliance.date
      ? DateTime.fromFormat(compliance.date, 'yyyy-MM-dd').toRFC2822()
      : null;
    feed.item({
      title: String(compliance.title),
      description: String(compliance.description),
      guid: `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/compliance/${compliance.slug}`,
      url: `${BASE_URL}/${MenuItems.PLAYBOOK.toLowerCase()}/compliance/${compliance.slug}`,
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
