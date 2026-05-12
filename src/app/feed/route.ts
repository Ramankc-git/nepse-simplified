import { newsletters } from '@/lib/data';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://nepsesimplified.com';

  const rssItems = newsletters
    .map((nl) => `
    <item>
      <title><![CDATA[NEPSE SIMPLIFIED ${nl.volume} — ${nl.dateRange}]]></title>
      <link>${siteUrl}/newsletters/${nl.slug}</link>
      <guid isPermaLink="true">${siteUrl}/newsletters/${nl.slug}</guid>
      <description><![CDATA[${nl.marketContext}]]></description>
      <pubDate>${new Date(nl.dateRange.split('—')[1]?.trim() || nl.dateRange).toUTCString()}</pubDate>
    </item>`)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NEPSE SIMPLIFIED — Weekly Newsletter</title>
    <link>${siteUrl}</link>
    <description>Your go-to source for Nepal Stock Exchange (NEPSE) market analysis, tutorials, and investment insights.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
