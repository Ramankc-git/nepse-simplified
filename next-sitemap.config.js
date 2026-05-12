// NEPSE SIMPLIFIED Sitemap Configuration

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nepsesimplified.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
  },
};
